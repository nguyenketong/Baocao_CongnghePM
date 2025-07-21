'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../../../styles/EditTeamItem.css';
import { mutate } from 'swr';
import { updateTeam } from '../../../services/teamService';
import { Team } from '@/app/models/team';
import { teamObserver } from '@/app/utils/observer';

const API_BASE_URL = 'http://localhost:3000';
const API_PROJECT_URL = `${API_BASE_URL}/projects`;
const API_EMPLOYEE_URL = `${API_BASE_URL}/employees`;
const API_TEAM_URL = `${API_BASE_URL}/teams`;

interface EditTeamItemProps {
  team: Team;
  onClose: () => void;
}

interface TeamFormData {
  teamName?: string;
  teamLead?: string;
  projectid?: string;
}

interface TeamUpdateData {
  teamName: string;
  teamLead: string;
  projectid: string;
  lastUpdatedBy: string;
  lastUpdatedAt: string;
}

interface Project {
  _id: string;
  projectName: string;
}

interface Employee {
  _id: string;
  employeeName: string;
  designation_id: {
    _id: string;
    designationName: string;
  };
}

const EditTeamItem: React.FC<EditTeamItemProps> = ({ team, onClose }) => {
  const { register, handleSubmit } = useForm<TeamFormData>({
    defaultValues: {
      teamName: team.teamName,
      teamLead: team.teamLead?._id,
      projectid: team.projectid?._id,
    }
  });

  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [projectRes, employeeRes] = await Promise.all([
          axios.get(API_PROJECT_URL),
          axios.get(API_EMPLOYEE_URL)
        ]);
        
        setProjects(projectRes.data);
        const technicalLeads = employeeRes.data.filter(
          (employee: Employee) => employee.designation_id?.designationName === 'Technical Lead'
        );
        
        console.log('Filtered Technical Leads:', technicalLeads);
        setEmployees(technicalLeads);
      } catch (error) {
        console.error('Error fetching data:', error);
        toast.error('Failed to load initial data');
      }
    };
    fetchData();
  }, []);

  const addTeamLeadToTeam = async (teamId: string, employeeId: string) => {
    try {
      await axios.post(`${API_TEAM_URL}/${teamId}/members`, {
        employeeId: employeeId
      });
    } catch (error) {
      console.error('Error adding team lead to team:', error);
      throw error;
    }
  };


  const onSubmit = async (data: TeamFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);
  
    try {
      const changes: Partial<TeamUpdateData> = {};
  
      if (data.teamName?.trim() !== team.teamName) {
        changes.teamName = data.teamName?.trim() || '';
      }
  
      if (data.teamLead !== team.teamLead?._id) {
        changes.teamLead = data.teamLead || '';
      }
  
      if (data.projectid !== team.projectid?._id) {
        changes.projectid = data.projectid || '';
      }
  
      if (Object.keys(changes).length > 0) {
        console.log(`[EditTeamItem] Gửi dữ liệu cập nhật:`, changes);
  
        const updateData: TeamUpdateData = {
          teamName: team.teamName,
          teamLead: team.teamLead?._id || '',
          projectid: team.projectid?._id || '',
          lastUpdatedBy: 'HMK1510',
          lastUpdatedAt: new Date().toISOString(), // Dùng thời gian hiện tại
          ...changes,
        };
  
        const updatedTeam = await updateTeam(team._id, updateData);
        console.log(`[EditTeamItem] Team đã cập nhật thành công:`, updatedTeam);
  
        // Nếu team lead thay đổi, thêm họ vào team
        if (changes.teamLead && changes.teamLead !== team.teamLead?._id) {
          try {
            await addTeamLeadToTeam(team._id, changes.teamLead);
            console.log(`[EditTeamItem] Team lead ${changes.teamLead} đã được thêm vào team`);
          } catch (error) {
            console.error(`[EditTeamItem] Lỗi khi thêm team lead vào team:`, error);
            toast.warning('Team updated but failed to add team lead to team members');
          }
        }
  
        if (updatedTeam) {
          toast.success('Team updated successfully');
  
          // 🔥 Gửi thông báo cập nhật qua Observer
          console.log(`[EditTeamItem] Gửi thông báo qua Observer:`, updatedTeam);
          teamObserver.notify(updatedTeam);
  
          onClose();
        }
      } else {
        toast.info('No changes detected');
        onClose();
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;
        if (Array.isArray(errorMessage)) {
          toast.error(errorMessage[0]);
        } else {
          toast.error(errorMessage || 'Error updating team');
        }
        console.error('[EditTeamItem] API Error:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('[EditTeamItem] Error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-team-container">
      <div className="flex justify-between items-center mb-4">
        <h2 className="form-title">Edit Team</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="create-team-form">
        <div className="form-grid">
          <div className="form-section">
            <h3 className="section-title">Team Information</h3>
            
            <div className="form-group">
              <label className="form-label">Team Name</label>
              <input 
                className="form-input"
                {...register('teamName')}
                placeholder="Enter team name"
              />
            </div>

            <div className="form-group">
              <label className="form-label">Team Lead</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Team Lead: {team.teamLead?.employeeName || 'Not assigned'}
              </div>
              <select 
                className="form-select"
                defaultValue={team.teamLead?._id || ""}
                {...register('teamLead')}
              >
                <option value="">Select Team Lead</option>
                {employees.map(employee => (
                  <option 
                    key={employee._id} 
                    value={employee._id}
                  >
                    {employee.employeeName}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Project</label>
              <div className="mb-2 text-sm text-gray-600">
                Current Project: {team.projectid?.projectName || 'Not assigned'}
              </div>
              <select 
                className="form-select"
                defaultValue={team.projectid?._id || ""}
                {...register('projectid')}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option 
                    key={project._id} 
                    value={project._id}
                  >
                    {project.projectName}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Updating...' : 'Update Team'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTeamItem;
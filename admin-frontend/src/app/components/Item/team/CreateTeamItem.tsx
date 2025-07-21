'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { addTeamMember } from '../../../services/teamService'; 
import '../../../styles/CreateTeamItem.css';
import { ApiTeamProxy } from '@/app/services/ApiTeamProxy';

const API_BASE_URL = 'http://localhost:3000';
const API_TEAM_URL = `${API_BASE_URL}/teams`;
const apiService = new ApiTeamProxy();

interface CreateTeamItemProps {
  onClose: () => void;
}

interface TeamData {
  teamName: string;
  teamLead: string;
  projectid: string;
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

const CreateTeamItem: React.FC<CreateTeamItemProps> = ({ onClose }) => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<TeamData>();
  const [projects, setProjects] = useState<Project[]>([]);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
  const fetchData = async () => {
    try {
      const [projectRes, employeeRes] = await Promise.all([
        apiService.fetchProjects(),
        apiService.fetchEmployees()
      ]);

      setProjects(projectRes.data);
      const technicalLeads = employeeRes.data.filter(
        (employee: Employee) => employee.designation_id?.designationName === 'Technical Lead'
      );
      setEmployees(technicalLeads);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load initial data');
    }
  };
  fetchData();
}, []);

  const onSubmit = async (data: TeamData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const teamData = {
        teamName: data.teamName.trim(),
        teamLead: data.teamLead,
        projectid: data.projectid
      };

      const response = await axios.post(API_TEAM_URL, teamData);

      if (response.status === 201 || response.status === 200) {
        // Lấy team ID từ đúng cấu trúc response
        const newTeamId = response.data.data._id;
        
        if (newTeamId) {
          try {
            await addTeamMember(newTeamId, data.teamLead);
            toast.success('Team created successfully');
            reset();
            mutate(API_TEAM_URL);
            onClose();
          } catch (memberError) {
            console.error('Error adding team lead as member:', memberError);
            toast.error('Team created but failed to add team lead as member');
          }
        } else {
          console.error('No team ID in response:', response.data);
          toast.error('Team created but could not add team lead - missing team ID');
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'Error creating team');
        console.error('API Error:', error.response?.data);
      } else {
        toast.error('An unexpected error occurred');
        console.error('Error:', error);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-team-container">
      <h2 className="form-title">Create New Team</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="create-team-form">
        <div className="form-grid">
          {/* Team Information Section */}
          <div className="form-section">
            <h3 className="section-title">Team Information</h3>
            
            <div className="form-group">
              <label className="form-label">Team Name *</label>
              <input 
                className="form-input"
                {...register('teamName', { 
                  required: 'Team name is required',
                  minLength: { 
                    value: 3, 
                    message: 'Team name must be at least 3 characters' 
                  }
                })} 
                placeholder="Enter team name"
              />
              {errors.teamName && (
                <span className="error-message">{errors.teamName.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Team Lead *</label>
              <select 
                className="form-select"
                {...register('teamLead', { 
                  required: 'Team lead is required' 
                })}
              >
                <option value="">Select Team Lead</option>
                {employees.map(employee => (
                  <option key={employee._id} value={employee._id}>
                    {employee.employeeName}
                  </option>
                ))}
              </select>
              {errors.teamLead && (
                <span className="error-message">{errors.teamLead.message}</span>
              )}
            </div>

            <div className="form-group">
              <label className="form-label">Project *</label>
              <select 
                className="form-select"
                {...register('projectid', { 
                  required: 'Project is required' 
                })}
              >
                <option value="">Select Project</option>
                {projects.map(project => (
                  <option key={project._id} value={project._id}>
                    {project.projectName}
                  </option>
                ))}
              </select>
              {errors.projectid && (
                <span className="error-message">{errors.projectid.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className={`submit-button ${isSubmitting ? 'submitting' : ''}`}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create Team'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeamItem;
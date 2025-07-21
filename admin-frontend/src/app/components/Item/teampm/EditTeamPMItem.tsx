'use client';
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import '../../../styles/EditTeamItem.css';
import { mutate } from 'swr';
import TeamFacade from '@/app/utils/TeamFacade';
import { Team } from '@/app/models/team';

interface EditTeamItemProps {
  team: Team;
  onClose: () => void;
  currentTime?: string;
  currentUser?: string;
}

interface TeamFormData {
  teamName?: string;
  teamLead?: string;
  projectid?: string;
}

const EditTeamPMItem: React.FC<EditTeamItemProps> = ({
  team,
  onClose,
  currentTime = "2025-03-02 12:18:12",
  currentUser = "HMK1510"
}) => {
  const { register, handleSubmit } = useForm<TeamFormData>({
    defaultValues: {
      teamName: team.teamName,
      teamLead: team.teamLead?._id,
      projectid: team.projectid?._id,
    }
  });

  const [projects, setProjects] = useState<{ _id: string; projectName: string; }[]>([]);
  const [employees, setEmployees] = useState<{ _id: string; employeeName: string; }[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const teamFacade = new TeamFacade(team._id);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentEmployee = TeamFacade.getCurrentEmployee();
        if (!currentEmployee || currentEmployee.designation_id?.designationName !== 'IT Project Manager') {
          toast.error('Access denied: Only IT Project Managers can access this page');
          onClose();
          return;
        }

        // Lấy danh sách Technical Leads
        const technicalLeads = await TeamFacade.fetchTechnicalLeads();
        setEmployees(technicalLeads);

        // Lấy projects của PM
        const pmProjects = await TeamFacade.fetchProjectsForPM(currentEmployee._id);
        setProjects(pmProjects);
      } catch (error) {
        console.error('Error loading data:', error);
        toast.error('Failed to load required data');
        onClose();
      }
    };

    fetchData();
  }, [onClose]);

  const onSubmit = async (data: TeamFormData) => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const changes: Partial<TeamFormData> = {};

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
        const updateData = {
          teamName: team.teamName,
          teamLead: team.teamLead?._id || '',
          projectid: team.projectid?._id || '',
          lastUpdatedBy: currentUser,
          lastUpdatedAt: currentTime,
          ...changes,
        };

        await TeamFacade.updateTeamData(team._id, updateData);
        mutate(`/teams`);
        onClose();
      } else {
        toast.info('No changes detected');
        onClose();
      }
    } catch (error) {
      console.error('Error updating team:', error);
      toast.error('An unexpected error occurred');
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

export default EditTeamPMItem;
import React, { useState } from 'react';
import EditTeamPMItem from './EditTeamPMItem';
import { deleteTeam } from '../../../services/teamService';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { Team } from '../../../models/team';
import { PencilSquareIcon, TrashIcon, PlusIcon, EyeIcon } from '@heroicons/react/24/outline';
import AddMember from '../team/AddMember';
import ViewTeamMembers from '../team/ViewTeamMembers';
import '../../../styles/TeamItem.css';

interface TeamItemProps {
  team: Team;
  hideDelete?: boolean;
  hideEdit?: boolean;
  hideAddMember?: boolean;
}

const TeamItemPM: React.FC<TeamItemProps> = ({ team, hideDelete = false, hideEdit = false, hideAddMember = false }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);
  const [isViewMembersModalOpen, setIsViewMembersModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this team?')) {
      return;
    }

    setIsDeleting(true);
    try {
      await deleteTeam(team._id);
      toast.success('Team deleted successfully');
      mutate('http://localhost:3000/teams');
    } catch (error) {
      toast.error('Failed to delete team');
      console.error('Error deleting team:', error);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleAddMember = () => {
    setIsAddMemberModalOpen(true);
  };

  const handleViewMembers = () => {
    setIsViewMembersModalOpen(true);
  };

  return (
    <div className="flex bg-white rounded-lg shadow-md p-5 relative hover:shadow-lg transition-shadow duration-200">
      <div className="flex flex-col w-full">
        <h3 className="text-lg font-semibold text-gray-800">
          {team.teamName}
        </h3>

        <div className="text-xs bg-slate-400 p-2 font-bold inline-block text-center rounded-sm w-fit px-2 py-1 border-2 border-slate-450">
          <span className="text-black">
            {team.projectid?.projectName || 'No Project Assigned'}
          </span>
        </div>

        <div className="text-sm">
          <div className="mt-3 pt-3 border-t border-gray-200">
            <span className="font-medium text-gray-700">Team Lead: </span>
            <span className="text-gray-600">
              {team.teamLead?.employeeName || 'No Team Lead Assigned'}
            </span>
          </div>
        </div>

        <div className="flex gap-2 mt-4">
          {!hideAddMember && (
              <button
              onClick={handleAddMember}
              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
              title="Add Member"
            >
              <PlusIcon className="h-5 w-5" />
            </button>
          )}
          
          
          {!hideEdit && (
            <button
              onClick={() => setIsEditModalOpen(true)}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
              title="Edit"
            >
              <PencilSquareIcon className="h-5 w-5" />
            </button>
          )}

          {!hideDelete && (
            <button
              onClick={handleDelete}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isDeleting}
              title={isDeleting ? 'Deleting...' : 'Delete'}
            >
              <TrashIcon className="h-5 w-5" />
            </button>
          )}

          <button
            onClick={handleViewMembers}
            className="p-2 bg-gray-500 text-white rounded-full hover:bg-gray-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            title="View Members"
          >
            <EyeIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditTeamPMItem
              team={team}
              onClose={() => setIsEditModalOpen(false)}
              currentTime="2025-03-02 15:34:41"
              currentUser="HMK1510"
            />
            <button
              className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
              onClick={() => setIsEditModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {isAddMemberModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <AddMember
              team={team}
              onClose={() => setIsAddMemberModalOpen(false)}
            />
          </div>
        </div>
      )}
      
      {isViewMembersModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <ViewTeamMembers
              team={team}
              onClose={() => setIsViewMembersModalOpen(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TeamItemPM;
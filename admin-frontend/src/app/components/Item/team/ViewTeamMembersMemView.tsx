import React, { useEffect, useState } from 'react';
import { Team } from '../../../models/team';
import { toast } from 'react-toastify';
import { TrashIcon } from '@heroicons/react/24/outline';
import { removeTeamMember } from '../../../services/teamService';

interface ViewTeamMembersProps {
  team: Team;
  onClose: () => void;
  hideDelete?: boolean;
}

interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile: string;
  phone: string;
}

const ViewTeamMembersMemView: React.FC<ViewTeamMembersProps> = ({ team, onClose, hideDelete = true }) => {
  const [members, setMembers] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const response = await fetch(`http://localhost:3000/teams/${team._id}/members`);
        if (!response.ok) throw new Error('Failed to fetch team members');
        const data = await response.json();
        setMembers(data.members);
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Failed to load team members');
        toast.error('Failed to load team members');
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, [team._id]);

  const handleRemoveMember = async (employeeId: string) => {
    if (!window.confirm('Are you sure you want to remove this member from the team?')) {
      return;
    }
  
    try {
      // Log thông tin trước khi gọi API
      console.log('Removing member:', {
        teamId: team._id,
        employeeId: employeeId
      });
  
      const response = await removeTeamMember(team._id, employeeId);
      
      // Log response để debug
      console.log('Remove member response:', response);
      
      if (response && response.success) {
        toast.success(response.message || 'Member removed successfully');
        // Cập nhật lại danh sách members ngay lập tức
        setMembers(prevMembers => prevMembers.filter(member => member._id !== employeeId));
      } else {
        throw new Error(response?.message || 'Failed to remove member');
      }
    } catch (error) {
      console.error('Error removing member:', error);
      
      // Hiển thị thông báo lỗi chi tiết
      const errorMessage = error instanceof Error ? error.message : 'Failed to remove member';
      toast.error(errorMessage, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      // Log error details để debug
      if (error instanceof Error) {
        console.log('Error details:', {
          message: error.message,
          stack: error.stack
        });
      }
    }
  };

  if (loading) {
    return (
      <div className="text-center py-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Loading team members...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-4">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Close
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-bold mb-4">Team Members</h2>

      {members.length === 0 ? (
        <p className="text-gray-600">No members in this team</p>
      ) : (
        <ul className="space-y-2">
          {members.map((member) => (
            <li key={member._id} className="flex items-center space-x-4 p-3 rounded-md border bg-gray-50">
              <img
                src={member.employeeProfile || '/default-avatar.png'}
                alt={member.employeeName}
                className="h-12 w-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <h3 className="font-medium">{member.employeeName}</h3>
                <p className="text-sm text-gray-500">{member.phone || 'No phone number'}</p>
              </div>
              {!hideDelete && (
                <button
                onClick={() => handleRemoveMember(member._id)}
                className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200"
                title="Remove Member"
              >
                <TrashIcon className="h-5 w-5" />
              </button>
              )}
              
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={onClose}
        className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition-colors duration-200"
      >
        Close
      </button>
    </div>
  );
};

export default ViewTeamMembersMemView;
import axios from 'axios';
import { Team, TeamUpdateData } from '../models/team';

const API_URL = 'http://localhost:3000';

// Interface for member management responses
interface TeamMemberResponse {
  success: boolean;
  message: string;
  data: {
    team: {
      _id: string;
      teamName: string;
      teamLead: string;
      projectid: string;
    };
    employee: {
      _id: string;
      employeeName: string;
      teams: string[];
    };
    addedInfo: {
      timestamp: string;
      addedBy: string;
    };
  };
}

interface TeamMembersResponse {
  team: {
    _id: string;
    teamName: string;
    teamLead: string;
    projectid: string;
  };
  members: Array<{
    _id: string;
    employeeName: string;
    employeeProfile?: string;
    phone?: string;
    teams: string[];
  }>;
  totalMembers: number;
}

// Get all teams
export const getTeams = async (): Promise<Team[]> => {
  try {
    const response = await axios.get<Team[]>(`${API_URL}/teams`);
    return response.data.map(team => ({
      ...team,
      teamLead: team.teamLead || null,
      projectid: team.projectid || null
    }));
  } catch (error) {
    console.error('Error fetching teams:', error);
    throw error;
  }
};

export const getTeamByEmployeeId = async (employeeId: string) => {
  try {
    const response = await fetch(`${API_URL}?employeeId=${employeeId}`);
    if (!response.ok) throw new Error("Không thể lấy dữ liệu nhóm");
    return await response.json();
  } catch (error) {
    console.error("❌ Lỗi khi lấy team:", error);
    throw error;
  }
};
// Get a single team by ID
export const getTeam = async (id: string): Promise<Team> => {
  try {
    const response = await axios.get(`${API_URL}/teams/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching team:', error);
    throw error;
  }
};

// Create a new team
export const createTeam = async (teamData: Partial<Team>): Promise<Team> => {
  try {
    const response = await axios.post(`${API_URL}/teams`, teamData);
    return response.data;
  } catch (error) {
    console.error('Error creating team:', error);
    throw error;
  }
};

// Update a team
export const updateTeam = async (id: string, updateData: TeamUpdateData): Promise<Team> => {
  try {
    console.log('Sending update data:', updateData);
    const response = await axios.patch<Team>(`${API_URL}/teams/${id}`, updateData);
    console.log('Response from server:', response.data);
    return {
      ...response.data,
      teamLead: response.data.teamLead || null,
      projectid: response.data.projectid || null
    };
  } catch (error) {
    console.error('Error updating team:', error);
    if (axios.isAxiosError(error)) {
      console.error('Server response:', error.response?.data);
    }
    throw error;
  }
};

// Delete a team
export const deleteTeam = async (id: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/teams/${id}`);
  } catch (error) {
    console.error('Error deleting team:', error);
    throw error;
  }
};

// Add member to team
export const addTeamMember = async (teamId: string, employeeId: string): Promise<TeamMemberResponse> => {
  try {
    const response = await axios.post<TeamMemberResponse>(
      `${API_URL}/teams/${teamId}/members`,
      { employeeId }
    );
    return response.data;
  } catch (error) {
    console.error('Error adding team member:', error);
    if (axios.isAxiosError(error)) {
      console.error('Server response:', error.response?.data);
    }
    throw error;
  }
};

// Get team members
export const getTeamMembers = async (teamId: string): Promise<TeamMembersResponse> => {
  try {
    const response = await axios.get<TeamMembersResponse>(
      `${API_URL}/teams/${teamId}/members`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching team members:', error);
    throw error;
  }
};

// Remove member from team
export const removeTeamMember = async (teamId: string, employeeId: string) => {
  try {
    const response = await axios.delete(`${API_URL}/teams/${teamId}/members/${employeeId}`);
    
    // Log response để debug
    console.log('Remove member response:', response.data);
    
    if (response.data && response.data.success) {
      return response.data;
    } else {
      throw new Error(response.data?.message || 'Failed to remove team member');
    }
  } catch (error) {
    console.error('Error removing team member:', error);
    
    if (axios.isAxiosError(error)) {
      const errorMessage = error.response?.data?.message 
        || error.response?.data?.error 
        || error.message 
        || 'Failed to remove team member';
      throw new Error(errorMessage);
    }
    
    throw error;
  }
};

// Get teams by project ID
export const getTeamsByProject = async (projectId: string): Promise<Team[]> => {
  try {
    const response = await axios.get(`${API_URL}/teams/project/${projectId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams by project:', error);
    throw error;
  }
};

// Get teams by team lead ID
export const getTeamsByTeamLead = async (teamLeadId: string): Promise<Team[]> => {
  try {
    const response = await axios.get(`${API_URL}/teams/teamlead/${teamLeadId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching teams by team lead:', error);
    throw error;
  }
};
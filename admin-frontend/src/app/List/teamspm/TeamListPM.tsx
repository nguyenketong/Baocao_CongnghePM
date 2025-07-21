'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import TeamItemPM from '../../components/Item/teampm/TeamItemPM';
import CreateTeamPMItem from '../../components/Item/teampm/CreateTeamPMItem';
import useSWR from 'swr';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import '../../styles/TeamList.css';
import { gsap } from "gsap";
import { Team } from '@/app/models/team';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000';
const API_TEAMS_URL = `${API_BASE_URL}/teams`;

const TeamListPM: React.FC = () => {
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentUserProjects, setCurrentUserProjects] = useState<string[]>([]);

  const getCurrentEmployee = () => {
    const employeeStr = localStorage.getItem('employee');
    if (!employeeStr) return null;
    try {
      const employee = JSON.parse(employeeStr);
      console.log('Current Employee:', employee); // Log employee data
      return employee;
    } catch (error) {
      console.error('Error parsing employee data:', error);
      return null;
    }
  };

  // Hàm gọi API để lấy danh sách dự án của Project Manager
  const fetchProjectsForPM = async (employeeId: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `${API_BASE_URL}/employees/pm/${employeeId}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        }
      );
      if (!response.ok) {
        throw new Error("Không thể lấy dự án của Project Manager");
      }
      const data = await response.json();
      console.log("Fetched Projects for PM:", data);
      return data;
    } catch (error) {
      console.error("Lỗi khi lấy dự án của Project Manager:", error);
      throw error;
    }
  };

  const fetcher = async (url: string) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.get<Team[]>(url, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      console.log('Fetched Teams:', response.data); // Log all teams
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

  const { data: teams, error, isLoading } = useSWR<Team[]>(API_TEAMS_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Lấy danh sách project của IT Project Manager
  useEffect(() => {
    const fetchUserProjects = async () => {
      const employee = getCurrentEmployee();
      console.log('Employee Designation:', employee?.designation_id?.designationName); // Log designation

      if (employee?.designation_id?.designationName === 'IT Project Manager') {
        try {
          const projectsData = await fetchProjectsForPM(employee._id);
          const projectIds = projectsData.map((project: any) => project._id);
          console.log('Project IDs:', projectIds); // Log project IDs
          setCurrentUserProjects(projectIds);
        } catch (error) {
          console.error('Error fetching PM projects:', error);
          toast.error('Không thể tải danh sách dự án');
        }
      }
    };

    fetchUserProjects();
  }, []);

  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Lọc teams dựa trên quyền và search term
  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    
    const employee = getCurrentEmployee();
    let filteredResults = teams;

    console.log('All Teams:', teams); // Log all teams
    console.log('Current User Projects:', currentUserProjects); // Log current user projects

    if (employee?.designation_id?.designationName === 'IT Project Manager') {
      filteredResults = teams.filter(team => {
        const isIncluded = team.projectid && currentUserProjects.includes(team.projectid._id);
        console.log('Team:', team.teamName, 'Project ID:', team.projectid?._id, 'Is Included:', isIncluded); // Log filtering process
        return isIncluded;
      });
    }

    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      filteredResults = filteredResults.filter((team) =>
        team.teamName.toLowerCase().includes(searchTermLower)
      );
    }

    console.log('Filtered Results:', filteredResults); // Log final filtered results
    return filteredResults;
  }, [teams, searchTerm, currentUserProjects]);

  useEffect(() => {
    gsap.to("#addBtn", { opacity: 1, y: -50, delay: 1, backgroundColor: '#2D336B' });
  }, []);

  // Kiểm tra quyền hiển thị nút thêm mới
  const showAddButton = useMemo(() => {
    const employee = getCurrentEmployee();
    return employee?.designation_id?.designationName === 'IT Project Manager';
  }, []);

  // Kiểm tra token và quyền truy cập
  useEffect(() => {
    const token = localStorage.getItem('token');
    const employee = getCurrentEmployee();

    if (!token || !employee) {
      window.location.href = '/login';
      return;
    }

    try {
      const tokenData = JSON.parse(atob(token.split('.')[1]));
      if (tokenData.exp * 1000 < Date.now()) {
        window.location.href = '/login';
      }
    } catch (error) {
      console.error('Error checking token:', error);
      window.location.href = '/login';
    }
  }, []);

  const handleOpenDialog = () => setShowCreateTeamDialog(true);
  const handleCloseDialog = () => setShowCreateTeamDialog(false);

  return (
    <>
      <div className="flex flex-col justify-end">
        <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
          <h2 className="page-title text-4xl font-bold mb-6" id="title">Danh sách nhóm</h2>

          <div className="search-container">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm nhóm..."
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {isLoading && (
          <div className="loading-state">
            Đang tải danh sách nhóm...
          </div>
        )}

        {error && (
          <div className="error-state">
            Lỗi khi tải danh sách nhóm!
          </div>
        )}

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="grid-wrapper gap-10">
            <div className="teams-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" id="team-card">
              {filteredTeams.length ? (
                filteredTeams.map((team) => (
                  <TeamItemPM
                    key={team._id}
                    team={team}
                  />
                ))
              ) : (
                <div className="empty-state">
                  {searchTerm ? 'Không tìm thấy nhóm nào.' : 'Không có nhóm nào.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* FAB Button - Chỉ hiển thị cho IT Project Manager */}
      {showAddButton && (
        <button
          className="fab-button opacity-0"
          onClick={handleOpenDialog}
          aria-label="Thêm nhóm mới"
          id="addBtn"
        >
          <PlusIcon className="w-6 h-6" />
        </button>
      )}

      {/* Modal */}
      {showCreateTeamDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateTeamPMItem 
              onClose={handleCloseDialog}
            />
            <button
              className="close-button mt-4 px-4 py-2 text-white rounded"
              onClick={handleCloseDialog}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default TeamListPM;
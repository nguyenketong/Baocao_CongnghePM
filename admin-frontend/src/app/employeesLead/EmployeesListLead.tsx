'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import EmployeeItemPM from '../components/employee/EmployeeItemPM';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import '../styles/EmployeeList.css';
import { toast } from 'react-toastify';

const API_BASE_URL = 'http://localhost:3000';

interface Team {
  _id: string;
  teamName: string;
  teamLead: {
    _id: string;
    employeeName: string;
  } | null;
  projectid: {
    _id: string;
    projectName: string;
  } | null;
  team_members: Array<Employee>;
}

interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile: string;
  phone: string;
  designation_id?: {
    _id: string;
    designationName: string;
  };
  account: {
    userName: string;
    email: string;
  };
  description?: string;
}

const EmployeesListLead: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const getCurrentEmployee = () => {
    const employeeStr = localStorage.getItem('employee');
    if (!employeeStr) return null;
    try {
      return JSON.parse(employeeStr);
    } catch (error) {
      return null;
    }
  };

  // Fetch teams where current user is team lead
  useEffect(() => {
    const fetchTeamsForLead = async () => {
      const employee = getCurrentEmployee();
      setLoading(true);

      if (employee?.designation_id?.designationName === 'Technical Lead') {
        try {
          const token = localStorage.getItem('token');
          const teamsResponse = await axios.get<Team[]>(`${API_BASE_URL}/teams`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          });

          // Filter teams where current user is team lead
          const leadTeams = teamsResponse.data.filter(team => 
            team.teamLead && team.teamLead._id === employee._id
          );

          // Fetch members for each team
          const teamsWithMembers = await Promise.all(
            leadTeams.map(async (team) => {
              try {
                const membersResponse = await axios.get(
                  `${API_BASE_URL}/teams/${team._id}/members`,
                  {
                    headers: {
                      'Authorization': `Bearer ${token}`
                    }
                  }
                );

                // Fetch detailed information for each member
                const membersWithDetails = await Promise.all(
                  membersResponse.data.members.map(async (member: any) => {
                    try {
                      const memberDetailResponse = await axios.get(
                        `${API_BASE_URL}/employees/${member._id}`,
                        {
                          headers: {
                            'Authorization': `Bearer ${token}`
                          }
                        }
                      );
                      return memberDetailResponse.data;
                    } catch (error) {
                      return member;
                    }
                  })
                );

                return {
                  ...team,
                  team_members: membersWithDetails
                };
              } catch (error) {
                return {
                  ...team,
                  team_members: []
                };
              }
            })
          );

          setTeams(teamsWithMembers);
        } catch (error) {
          setError('Không thể tải danh sách nhân viên');
          toast.error('Không thể tải danh sách nhân viên');
        } finally {
          setLoading(false);
        }
      } else {
        window.location.href = '/unauthorized';
      }
    };

    fetchTeamsForLead();
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

  const filteredEmployees = useMemo(() => {
    const currentEmployee = getCurrentEmployee();
    
    // Lấy tất cả nhân viên từ các team và loại bỏ team lead
    const allEmployees = teams.flatMap(team => 
      (team.team_members || []).filter(member => 
        member._id !== currentEmployee?._id // Loại bỏ nhân viên là team lead hiện tại
      )
    );
      
    // Loại bỏ nhân viên trùng lặp
    const uniqueEmployees = Array.from(
      new Map(allEmployees.map(emp => [emp._id, emp])).values()
    );
  
    // Lọc theo search term
    if (searchTerm) {
      const searchTermLower = searchTerm.toLowerCase();
      return uniqueEmployees.filter((emp) =>
        emp.employeeName.toLowerCase().includes(searchTermLower)
      );
    }
  
    return uniqueEmployees;
  }, [teams, searchTerm]);

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
      window.location.href = '/login';
    }
  }, []);

  return (
    <>
      <div className="flex flex-col justify-end">
        <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
          <h2 className="page-title text-4xl font-bold mb-6" id="title">
            Danh sách nhân viên trong các nhóm của {getCurrentEmployee()?.employeeName}
          </h2>

          <div className="search-container">
            <MagnifyingGlassIcon className="search-icon" />
            <input
              type="text"
              placeholder="Tìm kiếm nhân viên..."
              className="search-input"
              onChange={handleSearchChange}
            />
          </div>
        </div>

        {loading && (
          <div className="loading-state">
            Đang tải danh sách nhân viên...
          </div>
        )}

        {error && (
          <div className="error-state">
            {error}
          </div>
        )}

        <div className="bg-[#f0f0f0] p-8 rounded-xl">
          <div className="grid-wrapper gap-10">
            <div className="employees-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4" id="employee-card">
              {filteredEmployees.length ? (
                filteredEmployees.map((employee) => (
                  <EmployeeItemPM
                    key={employee._id}
                    employee={{
                      ...employee,
                      designation_id: employee.designation_id || undefined,
                      account: employee.account || { userName: '', email: '' }
                    }}
                  />
                ))
              ) : (
                <div className="empty-state">
                  {searchTerm ? 'Không tìm thấy nhân viên nào.' : 'Không có nhân viên nào trong các nhóm của bạn.'}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeesListLead;
'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import TeamItemMember from '../../components/Item/teammember/TeamItemMember';
import useSWR from 'swr';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import '../../styles/TeamList.css';
import { Team } from '@/app/models/team';

const API_BASE_URL = 'http://localhost:3000';
const API_TEAMS_URL = `${API_BASE_URL}/teams`;

interface TeamInStorage {
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
    __v?: number;
}

const TeamListMember: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [currentUserTeams, setCurrentUserTeams] = useState<Team[]>([]);

    const getCurrentEmployee = () => {
        const employeeStr = localStorage.getItem('employee');
        if (!employeeStr) return null;
        try {
            return JSON.parse(employeeStr);
        } catch (error) {
            return null;
        }
    };

    const fetcher = async (url: string) => {
        try {
            const token = localStorage.getItem('token');
            const employee = getCurrentEmployee();

            if (!employee?._id) {
                return [];
            }

            const response = await axios.get<Team[]>(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            // Lấy team_id từ thông tin employee trong localStorage
            const employeeTeamIds = employee.team_id?.map((team: any) => team._id) || [];
            
            // Lọc các team mà employee là thành viên
            const memberTeams = response.data.filter(team => 
                employeeTeamIds.includes(team._id)
            );

            setCurrentUserTeams(memberTeams);
            return memberTeams;
        } catch (error) {
            throw error;
        }
    };

    const { data: teams, error, isLoading } = useSWR<Team[]>(
        API_TEAMS_URL,
        fetcher,
        {
            revalidateOnMount: true,
            revalidateIfStale: true,
            revalidateOnFocus: true,
            revalidateOnReconnect: true,
            dedupingInterval: 0
        }
    );

    const debouncedSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
        }, 300),
        []
    );

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        debouncedSearch(e.target.value);
    };

    const filteredTeams = useMemo(() => {
        let filteredResults = [...currentUserTeams];

        if (searchTerm) {
            const searchTermLower = searchTerm.toLowerCase();
            filteredResults = filteredResults.filter((team) =>
                team.teamName.toLowerCase().includes(searchTermLower)
            );
        }

        return filteredResults;
    }, [currentUserTeams, searchTerm]);

    return (
        <>
            <div className="flex flex-col justify-end">
                <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
                    <h2 className="page-title text-4xl font-bold mb-6" id="title">
                        Danh sách nhóm của {getCurrentEmployee()?.employeeName}
                    </h2>

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
                                    <TeamItemMember
                                        key={team._id}
                                        team={team}
                                        hideDelete={true}
                                        hideEdit={true}
                                        hideAddMember={true}
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
        </>
    );
};

export default TeamListMember;
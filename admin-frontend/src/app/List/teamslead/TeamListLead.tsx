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


const TeamListLead: React.FC = () => {
    const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
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

            const allTeams = response.data;
            const leadTeams = allTeams.filter(team => 
                team.teamLead && team.teamLead._id === employee._id
            );

            setCurrentUserTeams(leadTeams);
            return leadTeams;
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

    useEffect(() => {
        const employee = getCurrentEmployee();
        if (employee?.designation_id?.designationName !== 'Technical Lead') {
            window.location.href = '/unauthorized';
        }
    }, []);

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

    const isPM = () => {
        const employee = getCurrentEmployee();
        return employee?.designation_id?.designationName === 'IT Project Manager';
    };

    const handleOpenDialog = () => setShowCreateTeamDialog(true);
    const handleCloseDialog = () => setShowCreateTeamDialog(false);

    return (
        <>
            <div className="flex flex-col justify-end">
                <div className="flex justify-between items-center w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
                    <h2 className="page-title text-4xl font-bold mb-6" id="title">
                        Danh sách nhóm của Technical Lead {getCurrentEmployee()?.employeeName}
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
                                    <TeamItemPM
                                        key={team._id}
                                        team={team}
                                        hideDelete={!isPM()}
                                        hideEdit={!isPM()}
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

            {showCreateTeamDialog && (
                <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
                        <CreateTeamPMItem
                            onClose={handleCloseDialog}
                            currentTime="2025-03-02 15:38:50"
                            currentUser="HMK1510"
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

export default TeamListLead;
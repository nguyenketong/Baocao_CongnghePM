'use client';
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import axios from 'axios';
import TeamItem from '../../components/Item/team/TeamItem';
import CreateTeamItem from '../../components/Item/team/CreateTeamItem';
import useSWR from 'swr';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import debounce from 'lodash/debounce';
import '../../styles/TeamList.css';
import { gsap } from "gsap";
import { Team } from '@/app/models/team';

const API_BASE_URL = 'http://localhost:3000';
const API_TEAMS_URL = `${API_BASE_URL}/teams`;

const TeamList: React.FC = () => {
  const [showCreateTeamDialog, setShowCreateTeamDialog] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetcher = async (url: string) => {
    const response = await axios.get<Team[]>(url);
    // Transform the data to match the Team interface
    return response.data.map(team => ({
      ...team,
      teamLead: team.teamLead || null,
      projectid: team.projectid || null
    }));
  };

  const { data: teams, error, isLoading } = useSWR<Team[]>(API_TEAMS_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  // Debounce search handler
  const debouncedSearch = useCallback(
    debounce((value: string) => {
      setSearchTerm(value);
    }, 300),
    []
  );

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSearch(e.target.value);
  };

  // Filter teams based on search term
  const filteredTeams = useMemo(() => {
    if (!teams) return [];
    if (!searchTerm) return teams;

    const searchTermLower = searchTerm.toLowerCase();
    return teams.filter((team) =>
      team.teamName.toLowerCase().includes(searchTermLower)
    );
  }, [teams, searchTerm]);

  useEffect(() => {
    gsap.to("#addBtn", { opacity: 1, y: -50, delay: 1, backgroundColor: '#2D336B' });
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
                  <TeamItem
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

      {/* FAB Button */}
      <button
        className="fab-button opacity-0"
        onClick={handleOpenDialog}
        aria-label="Thêm nhóm mới"
        id="addBtn"
      >
        <PlusIcon className="w-6 h-6" />
      </button>

      {/* Modal */}
      {showCreateTeamDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateTeamItem onClose={handleCloseDialog} />
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

export default TeamList;
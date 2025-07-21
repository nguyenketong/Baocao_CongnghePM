import { useState, useMemo } from 'react';

import useSWR from 'swr';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3000/progress';

interface Progress {
  _id: string;
  progressName: string;
  projectid: { projectName: string };
  progressCategory: { progressCategoryName: string };
  progressStart: string;
  progressEnd: string;
  notificationSent?: { notification_name: string };
  taskAssignPerson: {id:string; employeeName: string };
  taskRecipient: {id:string; employeeName: string };
  priority: string;
  description: string;
  status: string;
}
export const useProgressListCommand = (projectId?: string, progressId?: string) => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'progressName' | 'progressStart'>('progressName');

  let apiUrl = API_BASE_URL;
  
  if (projectId) {
    apiUrl = `${API_BASE_URL}/by-project?projectId=${projectId}`; // Thay đổi đúng endpoint
  } else if (progressId) {
    apiUrl = `${API_BASE_URL}/${progressId}`;
  }

  const fetcher = (url: string) => axios.get<Progress[]>(url).then((res) => res.data);
  const { data: progresses, error, isLoading } = useSWR(apiUrl, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const filteredProgresses = useMemo(() => {
    if (!progresses) return [];
    return progresses
      .filter((progress) =>
        progress.progressName.toLowerCase().includes(filterText.toLowerCase())
      )
      .sort((a, b) => {
        if (sortBy === 'progressName') {
          return a.progressName.localeCompare(b.progressName);
        } else if (sortBy === 'progressStart') {
          return new Date(a.progressStart).getTime() - new Date(b.progressStart).getTime();
        }
        return 0;
      });
  }, [progresses, filterText, sortBy]);

  const paginatedProgresses = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return filteredProgresses.slice(startIndex, endIndex);
  }, [filteredProgresses, page, pageSize]);

  const totalPages = Math.ceil(filteredProgresses.length / pageSize);

  return {
    projectId,
    progresses,
    error,
    isLoading,
    page,
    totalPages,
    paginatedProgresses,
    filterText,
    setFilterText,
    sortBy,
    setSortBy,
    setPage,
  };
};

import { useState, useMemo, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { ProjectObserver } from '@/app/List/projects/ProjectObserver';
import { ProjectFacade } from '@/app/List/projects/ProjectFacade';
import { DeleteProjectCommand } from '../projectCommand';


const API_BASE_URL = 'http://localhost:3000/projects';
const observer = new ProjectObserver();

export const useProjectListCommand = () => {
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'projectName' | 'projectStart'>('projectName');
  const [showCreateProjectDialog, setShowCreateProjectDialog] = useState(false);

  const fetcher = (url: string) => axios.get(url).then((res) => res.data);
  const { data: projects, error, isLoading, mutate } = useSWR(API_BASE_URL, fetcher);

  useEffect(() => {
    observer.subscribe(() => mutate());
    return () => observer.unsubscribe(() => mutate());
  }, [mutate]);

  const paginatedProjects = useMemo(() => {
    if (!projects) return [];
    return ProjectFacade.processProjects(projects, filterText, sortBy, page, pageSize);
  }, [projects, filterText, sortBy, page, pageSize]);

  const handleDelete = (id: string) => {
    new DeleteProjectCommand(id, () => observer.notify()).execute();
  };

  return {
    isLoading,
    error,
    paginatedProjects,
    totalPages: Math.ceil((projects?.length || 0) / pageSize),
    page,
    setPage,
    filterText,
    setFilterText,
    sortBy,
    setSortBy,
    handleDelete,
    showCreateProjectDialog,
    setShowCreateProjectDialog,
  };
};

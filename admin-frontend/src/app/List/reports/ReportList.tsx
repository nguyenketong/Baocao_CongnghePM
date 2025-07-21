'use client';
import React, { useState, useMemo, useEffect } from 'react';
import axios from 'axios';
import ReportItem from '../../components/Item/report/ReportItem';
import useSWR from 'swr';
import { ChevronLeftIcon, ChevronRightIcon, MagnifyingGlassIcon, PlusIcon } from '@heroicons/react/24/outline';
import CreateReportItem from '../../components/Item/report/CreateReportItem';
import { useSearchParams } from 'next/navigation';
import '../../styles/ReportList.css';
const API_BASE_URL = 'http://localhost:3000/reports';

interface Report {
  _id: string;
  reportName: string;
  submission_time: string;
  status: string;
  id_employee: string;
  id_task?: string; // Task ID
}

const ReportList: React.FC = () => {
  const [showCreateReportDialog, setShowCreateReportDialog] = useState(false);
  const [page, setPage] = useState(1);
  const [pageSize] = useState(6);
  const [filterText, setFilterText] = useState('');
  const [sortBy, setSortBy] = useState<'reportName' | 'submission_time'>('reportName');
  const [employeeId, setEmployeeId] = useState<string | null>(null);

  const searchParams = useSearchParams();
  const taskId = searchParams.get('taskId'); // Lấy taskId từ URL
  console.log('taskId from URL:', taskId);  // Kiểm tra giá trị taskId từ URL

  useEffect(() => {
    // Lấy employeeId từ localStorage
    const storedEmployeeId = localStorage.getItem('employeeId');
    if (storedEmployeeId) {
      setEmployeeId(storedEmployeeId);
    }
  }, []);

  const fetcher = (url: string) => axios.get<Report[]>(url).then((res) => res.data);
  const { data: reports, error, isLoading } = useSWR(API_BASE_URL, fetcher, {
    revalidateIfStale: false,
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
  });

  const filteredReports = useMemo(() => {
    if (!reports) return [];

    let result = reports;





    if (taskId) {
      console.log("Filtering by taskId:", taskId);  // Debugging
      result = result.filter((report) => {
        const reportTaskId = report.id_task ? String(report.id_task._id || report.id_task) : '';
        console.log("Comparing:", reportTaskId, "==", String(taskId));
        return reportTaskId === String(taskId);
      });
    }
    else if (employeeId && !taskId) {
      // Khi có employeeId nhưng không có taskId
      console.log("Filtering by employeeId only:", employeeId);  // Debugging
      result = result.filter((report) => {
        const reportEmployeeId = report.id_employee ? String(report.id_employee._id || report.id_employee) : '';
        console.log("Comparing:", reportEmployeeId, "==", String(employeeId));
        return reportEmployeeId === String(employeeId);
      });
    }


    // Lọc theo tên báo cáo
    result = result.filter((report) =>
      report.reportName.toLowerCase().includes(filterText.toLowerCase())
    );

    // Sắp xếp theo tiêu chí được chọn
    return result.sort((a, b) => {
      if (sortBy === 'reportName') {
        return a.reportName.localeCompare(b.reportName);
      } else if (sortBy === 'submission_time') {
        return new Date(a.submission_time).getTime() - new Date(b.submission_time).getTime();
      }
      return 0;
    });
  }, [reports, filterText, sortBy, taskId, employeeId]);


  console.log("Final filteredReports:", filteredReports);

  const paginatedReports = useMemo(() => {
    const startIndex = (page - 1) * pageSize;
    const endIndex = page * pageSize;
    return filteredReports.slice(startIndex, endIndex);
  }, [filteredReports, page, pageSize]);

  const handleDelete = (id: string) => {
    axios.delete(`${API_BASE_URL}/${id}`).then(() => {
      window.location.reload();
    });
  };

  const handleEdit = (id: string) => {
    console.log(`Editing report: ${id}`);
  };

  const totalPages = Math.ceil(filteredReports.length / pageSize);

  const handleOpenDialog = () => setShowCreateReportDialog(true);
  const handleCloseDialog = () => setShowCreateReportDialog(false);

  return (
    <div className="flex flex-col justify-end mr-4">
      <div className="flex justify-between items-center 
                      w-full h-full p-8 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
        <h1 className="page-title text-4xl font-bold mb-6">Report List</h1>

        <div className="search-container">
          <MagnifyingGlassIcon className="search-icon"/>
          <input
            type="text"
            value={filterText}
            onChange={(e) => setFilterText(e.target.value)}
            placeholder="Search for reports..."
            className="search-input"
          />
        </div>
      </div>
      <div className="w-full h-full p-6 bg-[#f0f0f0] rounded-xl mb-4 border-b-2 pb-0">
        <div className="flex items-center justify-between mb-4">
          <select
            className="p-2 border rounded-lg"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as 'reportName' | 'submission_time')}
          >
            <option value="reportName">Sorted by report name</option>
            <option value="submission_time">Sorted by submission time</option>
          </select>
          <div className="pagination-controls text-base flex items-center space-x-2 ml-auto">
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              <ChevronLeftIcon className="w-6 h-6" />
            </button>
            <span>
              {page} / {totalPages}
            </span>
            <button
              className="text-blue-500 hover:underline"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              <ChevronRightIcon className="w-6 h-6" />
            </button>
          </div>
        </div>


        {isLoading && <div className="loading-state">Loading list report...</div>}
        {error && <div className="error-state">Error loading report list!</div>}

        <div className="grid-wrapper">
          <div className="reports-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
            {paginatedReports.length ? (
              paginatedReports.map((report) => (
                <ReportItem
                  key={report._id}
                  report={report}
                  onDelete={handleDelete}
                  onEdit={handleEdit}
                />
              ))
            ) : (
              <div className="empty-state">There are no reports.</div>
            )}
          </div>
        </div>

        <button
          className="fab-button fixed bottom-6 right-6 w-14 h-14 m-2 mt-5 bg-[#2D336B] text-white rounded-full flex items-center justify-center shadow-lg hover:bg-gray-600 transition"
          onClick={handleOpenDialog}
          aria-label="Add a new report">
          <PlusIcon className="w-6 h-6" />
        </button>
      </div>

      {showCreateReportDialog && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateReportItem taskId={taskId ?? undefined} onClose={handleCloseDialog} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ReportList;

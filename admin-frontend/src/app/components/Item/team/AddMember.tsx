import React, { useState, useEffect, useMemo } from 'react';
import { Team } from '../../../models/team';
import { toast } from 'react-toastify';
import { mutate } from 'swr';
import { addTeamMember } from '../../../services/teamService';
import { teamObserver } from '@/app/utils/observer';
import TeamFacade from '@/app/utils/TeamFacade';

// SearchIcon component
const SearchIcon = () => (
  <svg 
    className="h-5 w-5 text-gray-400" 
    fill="none" 
    viewBox="0 0 24 24" 
    stroke="currentColor"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
    />
  </svg>
);

interface AddMemberProps {
  team: Team;
  onClose: () => void;
}

interface Employee {
  _id: string;
  employeeName: string;
  employeeProfile: string;
  joiningDate: string;
  phone: string;
  description: string;
  team_id: string[];
  department_id: string;
  designation_id: {
    _id: string;
    designationName: string;
  };
  account: string;
}


const ITEMS_PER_PAGE = 5;

const AddMember: React.FC<AddMemberProps> = ({ team, onClose }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Search and pagination states
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  //Initialize TeamFacade
  const teamFacade = useMemo(() => new TeamFacade(team._id), [team._id]);

  // Fetch available employees
  useEffect(() => {
    const fetchAvailableEmployees = async () => {
      setLoading(true);
      setError(null);
      try {
        const availableEmployees = await teamFacade.fetchAvailableEmployees();
        setEmployees(availableEmployees);
      } catch (error) {
        console.error('Lỗi khi tải danh sách nhân viên:', error);
        setError(error instanceof Error ? error.message : 'Không thể tải danh sách nhân viên');
        toast.error('Không thể tải danh sách nhân viên');
      } finally {
        setLoading(false);
      }
    };

    fetchAvailableEmployees();
  }, [teamFacade]);

  // Filter and paginate employees
  const filteredEmployees = useMemo(() => {
    return employees.filter(emp => 
      emp.employeeName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.phone?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [employees, searchQuery]);

  const totalPages = Math.ceil(filteredEmployees.length / ITEMS_PER_PAGE);
  const paginatedEmployees = useMemo(() => {
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    return filteredEmployees.slice(start, start + ITEMS_PER_PAGE);
  }, [filteredEmployees, currentPage]);

  // Handle employee selection
  const handleEmployeeSelect = (employee: Employee) => {
    setSelectedEmployee(employee === selectedEmployee ? null : employee);
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedEmployee) {
      toast.error('Vui lòng chọn nhân viên');
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await addTeamMember(team._id, selectedEmployee._id);

      if (result.success) {
        toast.success('Thêm thành viên vào team thành công');

        // 🔥 Cập nhật team thông qua Observer Pattern
        const updatedTeamRes = await fetch(`http://localhost:3000/teams/${team._id}`);
        if (updatedTeamRes.ok) {
          const updatedTeam = await updatedTeamRes.json();
          
          console.log(`[AddMember] Gửi thông báo cập nhật team sau khi thêm thành viên:`, updatedTeam);
          teamObserver.notify(updatedTeam);
        }

        onClose();
      } else {
        throw new Error(result.message || 'Không thể thêm thành viên vào team');
      }
    } catch (error) {
      console.error('Lỗi khi thêm thành viên:', error);
      toast.error(error instanceof Error ? error.message : 'Không thể thêm thành viên vào team. Vui lòng thử lại sau.');
    } finally {
      setIsSubmitting(false);
    }
  };


  if (loading) {
    return (
      <div className="w-full text-center py-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4">Đang tải danh sách nhân viên...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full text-center py-8">
        <p className="text-red-600 mb-4">{error}</p>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
        >
          Đóng
        </button>
      </div>
    );
  }

  return (
    <div className="w-full max-h-[80vh] overflow-y-auto">
      <div className="sticky top-0 bg-white z-10 pb-4">
        <h2 className="text-2xl font-bold mb-4">Thêm Thành Viên</h2>
        
        {/* Search box */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-3">
            <SearchIcon />
          </div>
          <input
            type="text"
            placeholder="Tìm kiếm theo tên hoặc số điện thoại..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
      </div>

      {filteredEmployees.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            {searchQuery 
              ? 'Không tìm thấy nhân viên phù hợp' 
              : 'Không còn nhân viên nào có thể thêm vào team này'}
          </p>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Đóng
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div className="space-y-2 mb-4">
            {paginatedEmployees.map((employee) => (
              <div
                key={employee._id}
                onClick={() => handleEmployeeSelect(employee)}
                className={`p-4 rounded-lg border cursor-pointer transition-colors duration-200 ${
                  selectedEmployee?._id === employee._id
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-300'
                }`}
              >
                <div className="flex items-center space-x-4">
                  <div className="flex-shrink-0">
                    <img
                      src={employee.employeeProfile || '/default-avatar.png'}
                      alt={employee.employeeName}
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{employee.employeeName}</h3>
                    <p className="text-sm text-gray-500">
                      {employee.phone || 'Chưa cập nhật SĐT'}
                    </p>
                    <p className="text-xs text-gray-400">
                      {employee.team_id?.length 
                        ? `Đang tham gia ${employee.team_id.length} team khác`
                        : 'Chưa tham gia team nào'}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center space-x-2 mb-4">
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Trước
              </button>
              <span className="px-3 py-1">
                Trang {currentPage} / {totalPages}
              </span>
              <button
                type="button"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded border disabled:opacity-50"
              >
                Sau
              </button>
            </div>
          )}

          <div className="sticky bottom-0 bg-white pt-4 pb-4 border-t">
            <div className="flex gap-3">
              <button
                type="submit"
                disabled={isSubmitting || !selectedEmployee}
                className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Đang thêm...' : 'Thêm thành viên'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 transition-colors duration-200"
              >
                Hủy
              </button>
            </div>
            <div className="text-xs text-gray-500 text-right mt-2">
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default AddMember;
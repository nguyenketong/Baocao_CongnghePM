import { useState } from "react";
import { EyeIcon, PencilSquareIcon, TrashIcon, EllipsisHorizontalIcon } from "@heroicons/react/24/outline";
import { toast } from "react-toastify";
import { mutate } from "swr";
import ReportDetailDialog from "./DetailReportItem";
import EditReportItem from "./EditReportItem"; // Import modal chỉnh sửa

interface Report {
  _id: string;
  reportName: string;
  submission_time: string;
  status: string;
  notereport?: string;
  filerepport?: string;
  id_employee?: string;
  id_task?: string;
  id_progress?: string;
}

interface ReportItemProps {
  report: Report;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const ReportItem: React.FC<ReportItemProps> = ({ report, onDelete }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // Toggle menu visibility

  const handleDelete = async () => {
    if (!window.confirm("Are you sure you want to delete this report?")) {
      return;
    }

    setIsDeleting(true);
    try {
      await onDelete(report._id);
      toast.success("The report has been successfully deleted");
      mutate("http://localhost:3000/reports");
    } catch (error) {
      toast.error("Error while deleting report");
      console.error("Error deleting report:", error);
    } finally {
      setIsDeleting(false);
    }
  };


  return (
    <>
      <div
        className="bg-white rounded-lg shadow-lg  relative
                  p-6 hover:shadow-xl 
                  hover:scale-105">
        {/* Menu Button (Three Dots) */}
        <div className="flex">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="ml-auto p-1 bg-gray-500 text-white rounded-full hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            // title="More options"
          >
            <EllipsisHorizontalIcon className="h-6 w-6" />
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute right-0 mt-4 w-40 bg-white rounded-lg shadow-lg z-50">
              <ul className="space-y-2 text-sm text-gray-700">
                {/* View Details Button */}
                <li>
                  <button
                    onClick={() => {
                      setIsDetailOpen(true);
                      setIsMenuOpen(false); // Close menu after selecting an action
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                    title="Look details"
                  >
                    <div className="flex items-center space-x-2">
                      <EyeIcon className="h-5 w-5" />
                      <span>View Details</span>
                    </div>
                  </button>
                </li>

                {/* Edit Button */}
                <li>
                  <button
                    onClick={() => {
                      setIsEditModalOpen(true);
                      setIsMenuOpen(false); // Close menu after selecting an action
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-md"
                    title="Edit"
                  >
                    <div className="flex items-center space-x-2">
                      <PencilSquareIcon className="h-5 w-5" />
                      <span>Edit</span>
                    </div>
                  </button>
                </li>

                {/* Delete Button */}
                <li>
                  <button
                    onClick={() => {
                      handleDelete();
                      setIsMenuOpen(false); // Close menu after selecting an action
                    }}
                    className="w-full text-left p-2 hover:bg-gray-100 rounded-md text-red-500"
                    disabled={isDeleting}
                    title={isDeleting ? "Deleting..." : "Delete"}
                  >
                    <div className="flex items-center space-x-2">
                      <TrashIcon className="h-5 w-5" />
                      <span>Delete</span>
                    </div>
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>

        {/* Display Basic Information */}
        <div className="flex flex-col p-4 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-3 text-[#2D336B]">{report.reportName}</h2>

          <hr className="border-gray-300 my-4" />

          <div className="bg-gray-100 text-lg p-3 mb-4 text-[#2D336B] flex text-ellipsis line-clamp-2">
            {report.notereport}
          </div>

          <hr className="border-gray-300 my-4" />

          <div className="mt-auto pt-2 flex justify-between text-sm text-gray-600">
            <p>📅 {new Date(report.submission_time).toLocaleDateString()}</p>
            <p className="inline-flex items-center px-4 py-2 text-sm font-semibold text-white rounded-full bg-blue-500">
              {report.status}
            </p>
          </div>
        </div>
        


      </div>
      {/* Detail Dialog */}
      {isDetailOpen && (
        <div className="modal-overlay fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <ReportDetailDialog reportId={report._id} onClose={() => setIsDetailOpen(false)} />
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {isEditModalOpen && (
        <div className="modal-overlay flex items-center justify-center fixed inset-0 bg-gray-900 bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg shadow-lg w-[400px]">
            <EditReportItem
              reportId={report._id}
              onClose={() => setIsEditModalOpen(false)}
            />
          </div>
        </div>
      )}
    </>

  );
};
export default ReportItem;

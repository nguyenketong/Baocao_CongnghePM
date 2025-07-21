import { useEffect, useState } from "react";

interface Report {
  _id: string;
  reportName: string;
  submission_time: string;
  status: string;
  notereport?: string;
  filerepport?: string;
  id_employee?: { _id: string; employeeName: string };
  id_task?: { _id: string; taskName: string };
  id_progress?: { _id: string; progressName: string };
}

interface ReportDetailDialogProps {
  reportId: string;
  onClose: () => void;
}

const ReportDetailDialog: React.FC<ReportDetailDialogProps> = ({ reportId, onClose }) => {
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!reportId) return;
    const fetchReport = async () => {
      try {
        const res = await fetch(`http://localhost:3000/reports/${reportId}`);
        const data = await res.json();
        setReport(data);
      } catch (error) {
        console.error("Error loading report:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [reportId]);

  if (loading) return <p className="text-center text-white">Loading...</p>;
  if (!report) return <p className="text-center text-white">No reports found</p>;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-[#F9FAFB] p-6 rounded-lg w-full max-w-lg shadow-lg border border-[#E2E8F0]">
        {/* Report Name */}
        <h2 className="flex justify-center text-2xl font-semibold text-[#2D336B] mb-4">{report.reportName}</h2>

        {/* Report Information */}
        <div className="space-y-4 border rounded-lg p-4 flex flex-col h-full bg-white shadow-md">

        <div className="grid grid-cols-2 gap-4 p-2">
          {/* Submission Time */}
          <div className="flex flex-col">
            <strong className="mr-2 mb-2 text-[#4A4A4A]">Submission time:</strong>
            <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm">{new Date(report.submission_time).toLocaleString()}</div>
          </div>

          {/* Status */}
          <div className="flex flex-col">
            <strong className="mr-2 mb-2 text-[#4A4A4A]">Status:</strong>
            <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm">{report.status}</div>
          </div>
        </div>
          {/* Note */}
          {report.notereport && (
            <div className="p-2 mt-4 mb-4 flex items-center justify-between">
              <strong className="mr-2 text-[#4A4A4A]">Note:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.notereport}</div>
            </div>
          )}

          {/* Report File */}
          {report.filerepport && (
            <div className="flex items-center justify-between">
              <strong className="mr-2 text-[#4A4A4A]">Report file:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm">
                <a href={report.filerepport} target="_blank" rel="noopener noreferrer" className="text-blue-600 underline">
                  View Report
                </a>
              </div>
            </div>
          )}

          

        <div className="grid grid-cols-2 gap-4 p-2">
          {/* Employee Name */}
          {report.id_employee && (
            <div className="flex flex-col">
              <strong className="mr-2 mb-2 text-[#4A4A4A]">Employee:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.id_employee.employeeName}</div>
            </div>
          )}

          {/* Task Name */}
          {report.id_task && (
            <div className="flex flex-col">
              <strong className="mr-2 mb-2 text-[#4A4A4A]">Task:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.id_task.taskName}</div>
            </div>
          )}

          {/* Progress Name */}
          {/*{report.id_progress && (
            <div className="flex flex-col">
              <strong className="mr-2 mb-2 text-[#4A4A4A]">Progress:</strong>
              <div className="bg-[#F3F4F6] rounded px-4 py-2 text-sm inline-flex">{report.id_progress.progressName}</div>
            </div>
          )}*/}

        </div>
        </div>
        {/* Close Button */}
        <div className="flex justify-center mt-4">
        <button
          onClick={onClose}
          className="mt-6 w-70 px-4 py-2 bg-[#2D336B] text-white rounded hover:bg-[#4A5568] transition-colors duration-200"
        >
          Close
        </button>
        </div>
      </div>
    </div>
  );
};

export default ReportDetailDialog;

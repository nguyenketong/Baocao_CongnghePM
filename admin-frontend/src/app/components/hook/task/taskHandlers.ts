import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateTask } from "@/app/services/taskService";
import { Task } from "@/app/models/task";

export const useTaskHandlers = (task: Task) => {
  const router = useRouter();
  const [showStatusTag, setShowStatusTag] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(task.status);
  const [showMenu, setShowMenu] = useState(false);

  const handleTaskClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowStatusTag((prev) => !prev); // Sử dụng setShowStatusTag để tránh lỗi
  };
  const handleStatusChange = async (newStatus: string) => {
    setSelectedStatus(newStatus);

    // Chuyển đổi newStatus thành FormData
    const formData = new FormData();
    formData.append("status", newStatus);

    try {
      await updateTask(task._id, formData);
      console.log(`✅ Task status updated to: ${newStatus}`);
    } catch (error) {
      console.error("❌ Lỗi khi cập nhật trạng thái task:", error);
    }
  };

  const handleReportClick = () => {
    router.push(`/List/reports?taskId=${task._id}`);
  };

  return {
    showStatusTag,
    setShowStatusTag,
    selectedStatus,
    setSelectedStatus,
    showMenu,
    setShowMenu,
    handleTaskClick,
    handleStatusChange,
    handleReportClick,
  };
};

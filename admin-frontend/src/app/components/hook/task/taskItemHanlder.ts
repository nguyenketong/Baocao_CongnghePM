import { useState } from "react";
import { useRouter } from "next/navigation";


export const useTaskActions = (taskId: string) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddReport = () => {
    router.push(`/List/reports?taskId=${taskId}`);
  };

 

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    handleAddReport,
  
    handleEdit,
  };
};

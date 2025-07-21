import { useState } from "react";
import { useRouter } from "next/navigation";


export const useProjectActions = (projectId: string) => {
  const router = useRouter();
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleAddProgress = () => {
    router.push(`/List/progress?projectId=${projectId}`);
  };

 

  const handleEdit = () => {
    setIsEditModalOpen(true);
  };

  return {
    isEditModalOpen,
    setIsEditModalOpen,
    handleAddProgress,
  
    handleEdit,
  };
};

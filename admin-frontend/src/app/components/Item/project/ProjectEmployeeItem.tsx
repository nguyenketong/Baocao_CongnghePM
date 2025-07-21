import React from "react";
import { ProjectDataEmployee } from "../../../models/project";
// import { useRouter } from "next/navigation";
import { ChatBubbleLeftIcon, ClockIcon, CurrencyDollarIcon, FlagIcon, UserGroupIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";



interface ProjectItemProps {
  project: ProjectDataEmployee; // Dự án sẽ được truyền vào từ parent component

}

const ProjectItem: React.FC<ProjectItemProps> = ({ project }) => {
  
  const router = useRouter();
  const handleClick = () => {
    router.push(`/List/progress?projectId=${project._id}`);
  };

  const calculateDaysLeft = () => {
    const endDate = new Date(project.projectEnd);
    const today = new Date('2025-02-23');
    const diffTime = endDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="rounded-lg p-5 border border-slate-200 shadow-md mb-3 bg-white" onClick={handleClick}>
      <div className="relative mb-6">
        {/* Left side with image and title */}
        <div className="flex items-center justify-center">
          <div className="relative flex justify-center items-center">
            <img
              src={project.projectImage}
              alt={project.projectName}
              className="w-16 h-16 object-cover border-2 border-gray-100 rounded-lg -mt-12"
              onError={(e) => (e.currentTarget.src = "/default_project.jpg")}
            />
            <div className="absolute -bottom-1 -right-1 bg-green-100 rounded-full p-1.5">
              <FlagIcon className="h-3.5 w-3.5 text-green-600" />
            </div>
          </div>
        </div>
        <div className="ml-4 mt-4 flex justify-center items-center">
  <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
    {project.projectName}
  </h3>
</div>

      </div>
  
      {/* Project Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex items-center text-gray-600">
          <CurrencyDollarIcon className="h-4 w-4 mr-1" />
          <span>Budget: {project.budget}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <ClockIcon className="h-4 w-4 mr-1" />
          <span>{new Date(project.projectStart).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <UserGroupIcon className="h-4 w-4 mr-1" />
          <span>{project.priority}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <ChatBubbleLeftIcon className="h-4 w-4 mr-1" />
          <span>End: {new Date(project.projectEnd).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-gray-800">Progress</h4>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs flex items-center">
            <ClockIcon className="h-3 w-3 mr-1" />
            {calculateDaysLeft()}d
          </span>
        </div>
  
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full bg-blue-500 rounded-full w-1/4"></div>
        </div>
      </div>
    </div>
  );

};

export default ProjectItem;

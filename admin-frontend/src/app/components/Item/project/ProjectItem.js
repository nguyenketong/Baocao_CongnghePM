"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var EditProjectItem_1 = require("./EditProjectItem");
var outline_1 = require("@heroicons/react/24/outline");
var outline_2 = require("@heroicons/react/24/outline");
var projectItemHandle_1 = require("../../hook/project/projectItemHandle");
var ProjectItem = function (_a) {
    var project = _a.project;
    var _b = (0, projectItemHandle_1.useProjectActions)(project._id), isEditModalOpen = _b.isEditModalOpen, setIsEditModalOpen = _b.setIsEditModalOpen, handleAddProgress = _b.handleAddProgress, handleEdit = _b.handleEdit;
    var getCategoryName = function () {
        if (project.projectCategory && 'projectCategoryName' in project.projectCategory) {
            return project.projectCategory.projectCategoryName;
        }
        return "Chưa có danh mục";
    };
    var calculateDaysLeft = function () {
        var endDate = new Date(project.projectEnd);
        var today = new Date('2025-02-23');
        var diffTime = endDate.getTime() - today.getTime();
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    return (<div className=" rounded-xl shadow-md p-4 ">
      <div className="flex justify-between items-start mb-4">
        {/* Left side with image and title */}
        <div className="flex items-center">
          <div className="relative">
            <img src={project.projectImage} alt={project.projectName} className="w-16 h-16 rounded-full object-cover border-2 border-gray-200" onError={function (e) { return (e.currentTarget.src = "/default_project.jpg"); }}/>
            <div className="absolute -bottom-1 -right-1 bg-green-100 rounded-full p-1.5">
              <outline_2.FlagIcon className="h-3.5 w-3.5 text-green-600"/>
            </div>
          </div>
          <div className="ml-4">
            <span className="text-xs text-gray-500 font-medium block">
              {getCategoryName()}
            </span>
            <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">
              {project.projectName}
            </h3>
          </div>
        </div>

        {/* Right side with action buttons */}
        <div className="flex gap-1">
          <button onClick={handleEdit} className="p-1.5 text-blue-500 hover:bg-blue-50 rounded-lg transition-colors duration-200">
            <outline_1.PencilSquareIcon className="h-4 w-4"/>
          </button>

        </div>
      </div>

      {/* Project Info Grid */}
      <div className="grid grid-cols-2 gap-2 mb-4 text-xs">
        <div className="flex items-center text-gray-600">
          <outline_2.CurrencyDollarIcon className="h-4 w-4 mr-1"/>
          <span>Budget: {project.budget}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <outline_2.ClockIcon className="h-4 w-4 mr-1"/>
          <span>{new Date(project.projectStart).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <outline_2.UserGroupIcon className="h-4 w-4 mr-1"/>
          <span>{project.priority}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <outline_2.ChatBubbleLeftIcon className="h-4 w-4 mr-1"/>
          <span>End: {new Date(project.projectEnd).toLocaleDateString()}</span>
        </div>
      </div>

      {/* Progress Section */}
      <div className="space-y-2 ">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-gray-800">Progress</h4>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs flex items-center">
            <outline_2.ClockIcon className="h-3 w-3 mr-1"/>
            {calculateDaysLeft()}d
          </span>
        </div>

        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full bg-blue-500 rounded-full w-1/4"></div>
        </div>

        {/* Add Progress Button */}
        <button onClick={handleAddProgress} className="w-full mt-2 px-3 py-1.5 bg-green-500 text-white text-xs rounded-lg hover:bg-green-600 transition duration-200">
          Thêm tiến độ
        </button>
      </div>

      {/* Edit Modal */}
      {isEditModalOpen && (<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg w-full max-w-lg">
            <EditProjectItem_1.default projectId={project._id} onClose={function () { return setIsEditModalOpen(false); }}/>
            
          </div>
        </div>)}
    </div>);
};
exports.default = ProjectItem;

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
// import { useRouter } from "next/navigation";
var outline_1 = require("@heroicons/react/24/outline");
var navigation_1 = require("next/navigation");
var ProjectItem = function (_a) {
    var project = _a.project;
    var router = (0, navigation_1.useRouter)();
    var handleClick = function () {
        router.push("/List/progress?projectId=".concat(project._id));
    };
    var calculateDaysLeft = function () {
        var endDate = new Date(project.projectEnd);
        var today = new Date('2025-02-23');
        var diffTime = endDate.getTime() - today.getTime();
        var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };
    return (<div className="rounded-lg p-5 border border-slate-200 shadow-md mb-3 bg-white" onClick={handleClick}>
      <div className="relative mb-6">
        {/* Left side with image and title */}
        <div className="flex items-center justify-center">
          <div className="relative flex justify-center items-center">
            <img src={project.projectImage} alt={project.projectName} className="w-16 h-16 object-cover border-2 border-gray-100 rounded-lg -mt-12" onError={function (e) { return (e.currentTarget.src = "/default_project.jpg"); }}/>
            <div className="absolute -bottom-1 -right-1 bg-green-100 rounded-full p-1.5">
              <outline_1.FlagIcon className="h-3.5 w-3.5 text-green-600"/>
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
          <outline_1.CurrencyDollarIcon className="h-4 w-4 mr-1"/>
          <span>Budget: {project.budget}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <outline_1.ClockIcon className="h-4 w-4 mr-1"/>
          <span>{new Date(project.projectStart).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <outline_1.UserGroupIcon className="h-4 w-4 mr-1"/>
          <span>{project.priority}</span>
        </div>
        <div className="flex items-center text-gray-600">
          <outline_1.ChatBubbleLeftIcon className="h-4 w-4 mr-1"/>
          <span>End: {new Date(project.projectEnd).toLocaleDateString()}</span>
        </div>
      </div>
      <div className="border-t border-gray-300 my-4"></div>

      {/* Progress Section */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h4 className="text-xs font-semibold text-gray-800">Progress</h4>
          <span className="px-2 py-0.5 bg-red-100 text-red-600 rounded-full text-xs flex items-center">
            <outline_1.ClockIcon className="h-3 w-3 mr-1"/>
            {calculateDaysLeft()}d
          </span>
        </div>
  
        {/* Progress Bar */}
        <div className="h-1.5 bg-gray-100 rounded-full">
          <div className="h-full bg-blue-500 rounded-full w-1/4"></div>
        </div>
      </div>
    </div>);
};
exports.default = ProjectItem;

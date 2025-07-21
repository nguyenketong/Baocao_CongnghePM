'use client';
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var ProjectItem_1 = require("../../components/Item/project/ProjectItem");
var outline_1 = require("@heroicons/react/24/outline");
var CreateProjectItem_1 = require("../../components/Item/project/CreateProjectItem");
require("../../styles/ProjectList.css");
var projectList_1 = require("@/app/command/project/projectList");
var ProjectList = function () {
    var _a = (0, projectList_1.useProjectListCommand)(), isLoading = _a.isLoading, error = _a.error, paginatedProjects = _a.paginatedProjects, totalPages = _a.totalPages, page = _a.page, setPage = _a.setPage, filterText = _a.filterText, setFilterText = _a.setFilterText, sortBy = _a.sortBy, setSortBy = _a.setSortBy, handleDelete = _a.handleDelete, showCreateProjectDialog = _a.showCreateProjectDialog, setShowCreateProjectDialog = _a.setShowCreateProjectDialog;
    return (<div className="container">
      <div className="header-container">
        <div className="title-section">
          <h2 className="page-title text-2xl font-bold">Danh sách dự án</h2>
        </div>
        
        <div className="controls-section">
          <div className="search-sort-group">
            <input type="text" value={filterText} onChange={function (e) { return setFilterText(e.target.value); }} placeholder="Tìm kiếm dự án..." className="search-input"/>
            <select value={sortBy} onChange={function (e) { return setSortBy(e.target.value); }} className="sort-select">
              <option value="projectName">Sắp xếp theo tên</option>
              <option value="projectStart">Sắp xếp theo ngày</option>
            </select>
          </div>

          <div className="pagination-controls">
            <button onClick={function () { return setPage(page - 1); }} disabled={page === 1}>Trước</button>
            <span>{page} / {totalPages}</span>
            <button onClick={function () { return setPage(page + 1); }} disabled={page === totalPages}>Tiếp theo</button>
          </div>
        </div>
      </div>

      {isLoading && <div className="loading-state">Đang tải danh sách dự án...</div>}
      {error && <div className="error-state">Lỗi khi tải danh sách dự án!</div>}

      <div className="projects-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {paginatedProjects.length ? (paginatedProjects.map(function (project) { return (<ProjectItem_1.default key={project._id} project={project} onDelete={handleDelete}/>); })) : (<div className="empty-state">Không có dự án nào.</div>)}
      </div>

      <button className="fab-button" onClick={function () { return setShowCreateProjectDialog(true); }} aria-label="Thêm dự án mới">
        <outline_1.PlusIcon className="w-6 h-6"/>
      </button>

      {showCreateProjectDialog && (<div className="modal-overlay fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="modal-content bg-white p-6 rounded-lg w-full max-w-lg">
            <CreateProjectItem_1.default onClose={function () { return setShowCreateProjectDialog(false); }}/>
            <button className="close-button mt-4 px-4 py-2 text-white rounded" onClick={function () { return setShowCreateProjectDialog(false); }}>
              Đóng
            </button>
          </div>
        </div>)}
    </div>);
};
exports.default = ProjectList;

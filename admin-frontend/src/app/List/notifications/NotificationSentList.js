"use client";
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = NotificationList;
var react_1 = require("react");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var notificationSentService_1 = require("../../services/notificationSentService"); // Thay tên service nếu cần
var NotificationSentItem_1 = require("../../components/Item/NotificationSentItem");
function NotificationList() {
    var _this = this;
    var _a = (0, react_1.useState)([]), notifications = _a[0], setNotifications = _a[1];
    var _b = (0, react_1.useState)(""), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(null), editId = _c[0], setEditId = _c[1];
    var _d = (0, react_1.useState)(""), editName = _d[0], setEditName = _d[1];
    (0, react_1.useEffect)(function () {
        fetchNotifications();
    }, []);
    var fetchNotifications = function () { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, notificationSentService_1.getNotificationSent)()];
                case 1:
                    data = _a.sent();
                    setNotifications(data);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleAdd = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!name.trim()) {
                        react_toastify_1.toast.error("Tên thông báo không được để trống!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, notificationSentService_1.create)(name)];
                case 1:
                    _a.sent();
                    react_toastify_1.toast.success("Thêm thông báo thành công!");
                    setName("");
                    fetchNotifications();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleDelete = function (id) { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, notificationSentService_1.deleteNotificationSent)(id)];
                case 1:
                    _a.sent();
                    react_toastify_1.toast.success("Xóa thông báo thành công!");
                    fetchNotifications();
                    return [2 /*return*/];
            }
        });
    }); };
    var handleEditClick = function (id) { return __awaiter(_this, void 0, void 0, function () {
        var notification;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, notificationSentService_1.getNotificationSentById)(id)];
                case 1:
                    notification = _a.sent();
                    setEditId(id);
                    setEditName(notification.notification_name);
                    return [2 /*return*/];
            }
        });
    }); };
    var handleUpdate = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    if (!editId || !editName.trim()) {
                        react_toastify_1.toast.error("Tên thông báo không được để trống!");
                        return [2 /*return*/];
                    }
                    return [4 /*yield*/, (0, notificationSentService_1.updateNotificationSent)(editId, editName)];
                case 1:
                    _a.sent();
                    react_toastify_1.toast.success("Cập nhật thông báo thành công!");
                    setEditId(null);
                    setEditName("");
                    fetchNotifications();
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="p-6">
      <react_toastify_1.ToastContainer position="top-right" autoClose={3000}/>
      <h1 className="text-2xl font-bold mb-4">Danh sách thông báo</h1>

      {/* Form thêm mới */}
      <div className="mb-4">
        <input type="text" value={name} onChange={function (e) { return setName(e.target.value); }} className="border p-2 rounded mr-2" placeholder="Nhập tên thông báo"/>
        <button onClick={handleAdd} className="bg-blue-500 text-white px-4 py-2 rounded">
          Thêm
        </button>
      </div>

      {/* Form chỉnh sửa */}
      {editId && (<div className="mb-4">
          <input type="text" value={editName} onChange={function (e) { return setEditName(e.target.value); }} className="border p-2 rounded mr-2"/>
          <button onClick={handleUpdate} className="bg-green-500 text-white px-4 py-2 rounded">
            Cập nhật
          </button>
          <button onClick={function () { return setEditId(null); }} className="bg-gray-500 text-white px-4 py-2 rounded ml-2">
            Hủy
          </button>
        </div>)}

      {/* Danh sách thông báo */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {notifications.map(function (notification) { return (<NotificationSentItem_1.default key={notification._id} notificationSent={notification} onDelete={handleDelete} onEdit={handleEditClick}/>); })}
      </div>
    </div>);
}

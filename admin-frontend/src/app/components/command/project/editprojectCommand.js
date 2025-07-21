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
exports.updateProject = exports.fetchProjectData = void 0;
// editProjectCommand.ts
var axios_1 = require("axios");
var API_PROJECT_URL = 'http://localhost:3000/projects';
var API_CATEGORY_URL = 'http://localhost:3000/projectcategories';
var API_NOTIFICATION_URL = 'http://localhost:3000/notifications';
var API_ASSIGNPERSON_URL = 'http://localhost:3000/employees';
var fetchProjectData = function (projectId) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, projectRes, categoriesRes, employeesRes, notificationsRes;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0: return [4 /*yield*/, Promise.all([
                    axios_1.default.get("".concat(API_PROJECT_URL, "/").concat(projectId)),
                    axios_1.default.get(API_CATEGORY_URL),
                    axios_1.default.get(API_ASSIGNPERSON_URL),
                    axios_1.default.get(API_NOTIFICATION_URL)
                ])];
            case 1:
                _a = _b.sent(), projectRes = _a[0], categoriesRes = _a[1], employeesRes = _a[2], notificationsRes = _a[3];
                return [2 /*return*/, {
                        project: projectRes.data,
                        categories: categoriesRes.data,
                        employees: employeesRes.data,
                        notifications: notificationsRes.data,
                    }];
        }
    });
}); };
exports.fetchProjectData = fetchProjectData;
var updateProject = function (projectId, data, file, existingImage) { return __awaiter(void 0, void 0, void 0, function () {
    var formData;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                formData = new FormData();
                formData.append('projectName', data.projectName.trim());
                formData.append('projectStart', data.projectStart);
                formData.append('projectEnd', data.projectEnd);
                formData.append('budget', data.budget.toString());
                formData.append('priority', data.priority.trim());
                formData.append('description', ((_a = data.description) === null || _a === void 0 ? void 0 : _a.trim()) || '');
                formData.append('projectCategory', data.projectCategory);
                formData.append('notificationSent', data.notificationSent);
                formData.append('assignedPerson', data.assignedPerson || '');
                if (file) {
                    formData.append('projectImage', file);
                }
                else if (existingImage) {
                    formData.append('projectImage', existingImage);
                }
                return [4 /*yield*/, axios_1.default.patch("".concat(API_PROJECT_URL, "/").concat(projectId), formData, {
                        headers: { 'Content-Type': 'multipart/form-data' },
                    })];
            case 1:
                _b.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateProject = updateProject;

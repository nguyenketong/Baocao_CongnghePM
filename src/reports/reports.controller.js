"use strict";
var __runInitializers = (this && this.__runInitializers) || function (thisArg, initializers, value) {
    var useValue = arguments.length > 2;
    for (var i = 0; i < initializers.length; i++) {
        value = useValue ? initializers[i].call(thisArg, value) : initializers[i].call(thisArg);
    }
    return useValue ? value : void 0;
};
var __esDecorate = (this && this.__esDecorate) || function (ctor, descriptorIn, decorators, contextIn, initializers, extraInitializers) {
    function accept(f) { if (f !== void 0 && typeof f !== "function") throw new TypeError("Function expected"); return f; }
    var kind = contextIn.kind, key = kind === "getter" ? "get" : kind === "setter" ? "set" : "value";
    var target = !descriptorIn && ctor ? contextIn["static"] ? ctor : ctor.prototype : null;
    var descriptor = descriptorIn || (target ? Object.getOwnPropertyDescriptor(target, contextIn.name) : {});
    var _, done = false;
    for (var i = decorators.length - 1; i >= 0; i--) {
        var context = {};
        for (var p in contextIn) context[p] = p === "access" ? {} : contextIn[p];
        for (var p in contextIn.access) context.access[p] = contextIn.access[p];
        context.addInitializer = function (f) { if (done) throw new TypeError("Cannot add initializers after decoration has completed"); extraInitializers.push(accept(f || null)); };
        var result = (0, decorators[i])(kind === "accessor" ? { get: descriptor.get, set: descriptor.set } : descriptor[key], context);
        if (kind === "accessor") {
            if (result === void 0) continue;
            if (result === null || typeof result !== "object") throw new TypeError("Object expected");
            if (_ = accept(result.get)) descriptor.get = _;
            if (_ = accept(result.set)) descriptor.set = _;
            if (_ = accept(result.init)) initializers.unshift(_);
        }
        else if (_ = accept(result)) {
            if (kind === "field") initializers.unshift(_);
            else descriptor[key] = _;
        }
    }
    if (target) Object.defineProperty(target, contextIn.name, descriptor);
    done = true;
};
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
var __setFunctionName = (this && this.__setFunctionName) || function (f, name, prefix) {
    if (typeof name === "symbol") name = name.description ? "[".concat(name.description, "]") : "";
    return Object.defineProperty(f, "name", { configurable: true, value: prefix ? "".concat(prefix, " ", name) : name });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReportController = void 0;
var common_1 = require("@nestjs/common");
var multer_1 = require("multer");
var uuid_1 = require("uuid");
var platform_express_1 = require("@nestjs/platform-express");
var path = require("path");
var mongoose_1 = require("mongoose");
var ReportController = function () {
    var _classDecorators = [(0, common_1.Controller)('reports')];
    var _classDescriptor;
    var _classExtraInitializers = [];
    var _classThis;
    var _instanceExtraInitializers = [];
    var _createReport_decorators;
    var _getReportByTaskId_decorators;
    var _getAllReports_decorators;
    var _getReportById_decorators;
    var _updateReport_decorators;
    var _deleteReport_decorators;
    var ReportController = _classThis = /** @class */ (function () {
        function ReportController_1(reportService) {
            this.reportService = (__runInitializers(this, _instanceExtraInitializers), reportService);
        }
        // ✅ Tạo mới Report với file docx
        ReportController_1.prototype.createReport = function (createReportDto, file) {
            return __awaiter(this, void 0, void 0, function () {
                var newReport;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            if (file) {
                                createReportDto.filerepport = "/uploads/reports/".concat(file.filename); // Gán đường dẫn file
                            }
                            return [4 /*yield*/, this.reportService.createReport(createReportDto)];
                        case 1:
                            newReport = _a.sent();
                            return [2 /*return*/, { success: true, data: newReport }];
                    }
                });
            });
        };
        ReportController_1.prototype.getReportByTaskId = function (taskId) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (!taskId || !mongoose_1.Types.ObjectId.isValid(taskId)) {
                        throw new common_1.NotFoundException('ProjectId không hợp lệ');
                    }
                    return [2 /*return*/, this.reportService.getReportByTaskId(new mongoose_1.Types.ObjectId(taskId))];
                });
            });
        };
        // ✅ Lấy danh sách tất cả Report
        ReportController_1.prototype.getAllReports = function () {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportService.getAllReports()];
                });
            });
        };
        // ✅ Lấy Report theo ID
        ReportController_1.prototype.getReportById = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportService.getReportById(id)];
                });
            });
        };
        // ✅ Cập nhật Report (cho phép cập nhật file docx)
        ReportController_1.prototype.updateReport = function (id, updateReportDto, file) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (file) {
                        updateReportDto.filerepport = "/uploads/reports/".concat(file.filename);
                    }
                    return [2 /*return*/, this.reportService.updateReport(id, updateReportDto)];
                });
            });
        };
        // ✅ Xóa Report
        ReportController_1.prototype.deleteReport = function (id) {
            return __awaiter(this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    return [2 /*return*/, this.reportService.deleteReport(id)];
                });
            });
        };
        return ReportController_1;
    }());
    __setFunctionName(_classThis, "ReportController");
    (function () {
        var _metadata = typeof Symbol === "function" && Symbol.metadata ? Object.create(null) : void 0;
        _createReport_decorators = [(0, common_1.Post)(), (0, common_1.UsePipes)(new common_1.ValidationPipe()), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('filerepport', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/reports', // Đường dẫn lưu file report
                    filename: function (req, file, cb) {
                        var fileExt = path.extname(file.originalname); // Lấy đuôi file
                        if (fileExt !== '.docx') {
                            return cb(new Error('Chỉ cho phép tải lên file .docx'), '');
                        }
                        var filename = "".concat((0, uuid_1.v4)()).concat(fileExt); // Đặt tên file là uuid
                        cb(null, filename);
                    }
                })
            }))];
        _getReportByTaskId_decorators = [(0, common_1.Get)('/by-task')];
        _getAllReports_decorators = [(0, common_1.Get)()];
        _getReportById_decorators = [(0, common_1.Get)(':id')];
        _updateReport_decorators = [(0, common_1.Patch)(':id'), (0, common_1.UsePipes)(new common_1.ValidationPipe()), (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('filerepport', {
                storage: (0, multer_1.diskStorage)({
                    destination: './uploads/reports', // Đường dẫn lưu file report
                    filename: function (req, file, cb) {
                        var fileExt = path.extname(file.originalname);
                        if (fileExt !== '.docx') {
                            return cb(new Error('Chỉ cho phép tải lên file .docx'), '');
                        }
                        var filename = "".concat((0, uuid_1.v4)()).concat(fileExt);
                        cb(null, filename);
                    }
                })
            }))];
        _deleteReport_decorators = [(0, common_1.Delete)(':id')];
        __esDecorate(_classThis, null, _createReport_decorators, { kind: "method", name: "createReport", static: false, private: false, access: { has: function (obj) { return "createReport" in obj; }, get: function (obj) { return obj.createReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getReportByTaskId_decorators, { kind: "method", name: "getReportByTaskId", static: false, private: false, access: { has: function (obj) { return "getReportByTaskId" in obj; }, get: function (obj) { return obj.getReportByTaskId; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getAllReports_decorators, { kind: "method", name: "getAllReports", static: false, private: false, access: { has: function (obj) { return "getAllReports" in obj; }, get: function (obj) { return obj.getAllReports; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _getReportById_decorators, { kind: "method", name: "getReportById", static: false, private: false, access: { has: function (obj) { return "getReportById" in obj; }, get: function (obj) { return obj.getReportById; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _updateReport_decorators, { kind: "method", name: "updateReport", static: false, private: false, access: { has: function (obj) { return "updateReport" in obj; }, get: function (obj) { return obj.updateReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(_classThis, null, _deleteReport_decorators, { kind: "method", name: "deleteReport", static: false, private: false, access: { has: function (obj) { return "deleteReport" in obj; }, get: function (obj) { return obj.deleteReport; } }, metadata: _metadata }, null, _instanceExtraInitializers);
        __esDecorate(null, _classDescriptor = { value: _classThis }, _classDecorators, { kind: "class", name: _classThis.name, metadata: _metadata }, null, _classExtraInitializers);
        ReportController = _classThis = _classDescriptor.value;
        if (_metadata) Object.defineProperty(_classThis, Symbol.metadata, { enumerable: true, configurable: true, writable: true, value: _metadata });
        __runInitializers(_classThis, _classExtraInitializers);
    })();
    return ReportController = _classThis;
}();
exports.ReportController = ReportController;

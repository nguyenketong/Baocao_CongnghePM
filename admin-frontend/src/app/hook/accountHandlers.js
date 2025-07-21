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
exports.handleUpdate = exports.handleEditClick = exports.handleDelete = exports.handleAdd = void 0;
// hooks/accountHandlers.ts
var react_toastify_1 = require("react-toastify");
var accountCommands_1 = require("../components/command/accountCommands");
var accountService_1 = require("../services/accountService");
var handleAdd = function (name, email, password, fetchAccounts) { return __awaiter(void 0, void 0, void 0, function () {
    var createCommand;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!name.trim() || !email.trim() || !password.trim()) {
                    react_toastify_1.toast.error("Tên tài khoản, email và mật khẩu không được để trống!");
                    return [2 /*return*/];
                }
                createCommand = new accountCommands_1.CreateAccountCommand(name, email, password);
                return [4 /*yield*/, createCommand.execute()];
            case 1:
                _a.sent();
                react_toastify_1.toast.success("Thêm tài khoản thành công!");
                fetchAccounts();
                return [2 /*return*/];
        }
    });
}); };
exports.handleAdd = handleAdd;
var handleDelete = function (id, fetchAccounts) { return __awaiter(void 0, void 0, void 0, function () {
    var deleteCommand;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                deleteCommand = new accountCommands_1.DeleteAccountCommand(id);
                return [4 /*yield*/, deleteCommand.execute()];
            case 1:
                _a.sent();
                react_toastify_1.toast.success("Xóa tài khoản thành công!");
                fetchAccounts();
                return [2 /*return*/];
        }
    });
}); };
exports.handleDelete = handleDelete;
var handleEditClick = function (id, setEditId, setEditName, setEditEmail, setEditPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var account;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, accountService_1.getAccountById)(id)];
            case 1:
                account = _a.sent();
                setEditId(id);
                setEditName(account.userName);
                setEditEmail(account.email);
                setEditPassword(account.password);
                return [2 /*return*/];
        }
    });
}); };
exports.handleEditClick = handleEditClick;
var handleUpdate = function (editId, editName, editEmail, editPassword, fetchAccounts, setEditId, setEditName, setEditEmail, setEditPassword) { return __awaiter(void 0, void 0, void 0, function () {
    var updateCommand;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!editId || !editName.trim() || !editEmail.trim() || !editPassword.trim()) {
                    react_toastify_1.toast.error("Tên tài khoản, email và mật khẩu không được để trống!");
                    return [2 /*return*/];
                }
                updateCommand = new accountCommands_1.UpdateAccountCommand(editId, editName, editEmail, editPassword);
                return [4 /*yield*/, updateCommand.execute()];
            case 1:
                _a.sent();
                react_toastify_1.toast.success("Cập nhật tài khoản thành công!");
                setEditId(null);
                setEditName("");
                setEditEmail("");
                setEditPassword("");
                fetchAccounts();
                return [2 /*return*/];
        }
    });
}); };
exports.handleUpdate = handleUpdate;

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
exports.default = AccountList;
var react_1 = require("react");
var react_toastify_1 = require("react-toastify");
require("react-toastify/dist/ReactToastify.css");
var accountService_1 = require("../../services/accountService");
var AccountItem_1 = require("../../components/Item/AccountItem");
var Button_1 = require("../../components/button/Button");
var fi_1 = require("react-icons/fi");
var accountHandlers_1 = require("../../hook/accountHandlers"); // Import các hàm xử lý
var AccountInput_1 = require("../../components/input/AccountInput"); // Import component AccountInput
function AccountList() {
    var _this = this;
    var _a = (0, react_1.useState)([]), accounts = _a[0], setAccounts = _a[1];
    var _b = (0, react_1.useState)(""), name = _b[0], setName = _b[1];
    var _c = (0, react_1.useState)(""), email = _c[0], setEmail = _c[1];
    var _d = (0, react_1.useState)(""), password = _d[0], setPassword = _d[1];
    var _e = (0, react_1.useState)(null), editId = _e[0], setEditId = _e[1];
    var _f = (0, react_1.useState)(""), editName = _f[0], setEditName = _f[1];
    var _g = (0, react_1.useState)(""), editEmail = _g[0], setEditEmail = _g[1];
    var _h = (0, react_1.useState)(""), editPassword = _h[0], setEditPassword = _h[1];
    (0, react_1.useEffect)(function () {
        fetchAccounts();
    }, []);
    var fetchAccounts = function () { return __awaiter(_this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, (0, accountService_1.getAccounts)()];
                case 1:
                    data = _a.sent();
                    setAccounts(data);
                    return [2 /*return*/];
            }
        });
    }); };
    return (<div className="p-6">
      <react_toastify_1.ToastContainer position="top-right" autoClose={3000}/>
      <h1 className="text-2xl font-bold mb-4">Danh sách tài khoản</h1>

      {/* Form thêm mới */}
      <div className="mb-4 flex items-center gap-2">
        <AccountInput_1.default value={name} onChange={function (e) { return setName(e.target.value); }} type="text" placeholder="Nhập tên tài khoản"/>
        <AccountInput_1.default value={email} onChange={function (e) { return setEmail(e.target.value); }} type="email" placeholder="Nhập email"/>
        <AccountInput_1.default value={password} onChange={function (e) { return setPassword(e.target.value); }} type="password" placeholder="Nhập mật khẩu"/>
        <Button_1.Button label="Thêm" onClick={function () { return (0, accountHandlers_1.handleAdd)(name, email, password, fetchAccounts); }} variant="primary" icon={<fi_1.FiPlus />}/>
      </div>

      {/* Form chỉnh sửa */}
      {editId && (<div className="mb-5 flex items-center gap-2">
          <AccountInput_1.default value={editName} onChange={function (e) { return setEditName(e.target.value); }} type="text" placeholder="Nhập tên tài khoản"/>
          <AccountInput_1.default value={editEmail} onChange={function (e) { return setEditEmail(e.target.value); }} type="email" placeholder="Nhập email"/>
          <AccountInput_1.default value={editPassword} onChange={function (e) { return setEditPassword(e.target.value); }} type="password" placeholder="Nhập mật khẩu"/>
          <Button_1.Button label="Cập nhật" onClick={function () { return (0, accountHandlers_1.handleUpdate)(editId, editName, editEmail, editPassword, fetchAccounts, setEditId, setEditName, setEditEmail, setEditPassword); }} variant="primary" icon={<fi_1.FiEdit />}/>
          <Button_1.Button label="Hủy" onClick={function () { return setEditId(null); }} variant="primary" icon={<fi_1.FiEdit />}/>
        </div>)}

      {/* Danh sách tài khoản */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {accounts.map(function (account) { return (<AccountItem_1.default key={account._id} account={account} onDelete={function (id) { return (0, accountHandlers_1.handleDelete)(id, fetchAccounts); }} // Cập nhật cách gọi handleDelete
         onEdit={function (id) { return (0, accountHandlers_1.handleEditClick)(id, setEditId, setEditName, setEditEmail, setEditPassword); }} // Cập nhật cách gọi handleEditClick
        />); })}
      </div>
    </div>);
}

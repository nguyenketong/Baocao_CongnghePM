"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeleteCommand = exports.EditCommand = void 0;
var EditCommand = /** @class */ (function () {
    function EditCommand(accountId, onEdit) {
        this.accountId = accountId;
        this.onEdit = onEdit;
    }
    EditCommand.prototype.execute = function () {
        this.onEdit(this.accountId);
    };
    return EditCommand;
}());
exports.EditCommand = EditCommand;
var DeleteCommand = /** @class */ (function () {
    function DeleteCommand(accountId, onDelete) {
        this.accountId = accountId;
        this.onDelete = onDelete;
    }
    DeleteCommand.prototype.execute = function () {
        var _this = this;
        setTimeout(function () { return _this.onDelete(_this.accountId); }, 500);
    };
    return DeleteCommand;
}());
exports.DeleteCommand = DeleteCommand;

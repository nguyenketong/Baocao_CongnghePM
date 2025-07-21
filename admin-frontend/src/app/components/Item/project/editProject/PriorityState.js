"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighPriority = exports.MediumPriority = exports.LowPriority = void 0;
/** 🔹 Các trạng thái cụ thể */
var LowPriority = /** @class */ (function () {
    function LowPriority() {
    }
    LowPriority.prototype.getLabel = function () {
        return 'Low Priority';
    };
    LowPriority.prototype.getClass = function () {
        return 'bg-green-500 text-white px-3 py-1 rounded-md';
    };
    return LowPriority;
}());
exports.LowPriority = LowPriority;
var MediumPriority = /** @class */ (function () {
    function MediumPriority() {
    }
    MediumPriority.prototype.getLabel = function () {
        return 'Medium Priority';
    };
    MediumPriority.prototype.getClass = function () {
        return 'bg-yellow-500 text-white px-3 py-1 rounded-md';
    };
    return MediumPriority;
}());
exports.MediumPriority = MediumPriority;
var HighPriority = /** @class */ (function () {
    function HighPriority() {
    }
    HighPriority.prototype.getLabel = function () {
        return 'High Priority';
    };
    HighPriority.prototype.getClass = function () {
        return 'bg-red-500 text-white px-3 py-1 rounded-md';
    };
    return HighPriority;
}());
exports.HighPriority = HighPriority;

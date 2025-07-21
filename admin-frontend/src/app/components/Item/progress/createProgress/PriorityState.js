"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PriorityContext = exports.LowPriority = exports.MediumPriority = exports.HighPriority = void 0;
var HighPriority = /** @class */ (function () {
    function HighPriority() {
    }
    HighPriority.prototype.getLabel = function () {
        return 'Cao 🔥';
    };
    return HighPriority;
}());
exports.HighPriority = HighPriority;
var MediumPriority = /** @class */ (function () {
    function MediumPriority() {
    }
    MediumPriority.prototype.getLabel = function () {
        return 'Trung bình ⚡';
    };
    return MediumPriority;
}());
exports.MediumPriority = MediumPriority;
var LowPriority = /** @class */ (function () {
    function LowPriority() {
    }
    LowPriority.prototype.getLabel = function () {
        return 'Thấp 🟢';
    };
    return LowPriority;
}());
exports.LowPriority = LowPriority;
var PriorityContext = /** @class */ (function () {
    function PriorityContext(initialState) {
        this.state = initialState;
    }
    PriorityContext.prototype.setState = function (state) {
        this.state = state;
    };
    PriorityContext.prototype.getLabel = function () {
        return this.state.getLabel();
    };
    return PriorityContext;
}());
exports.PriorityContext = PriorityContext;

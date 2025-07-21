"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.mapToSelectOptions = void 0;
// Factory để chuyển đổi dữ liệu từ API thành SelectOption[]
var mapToSelectOptions = function (data, labelKey) {
    return data.map(function (item) { return ({
        value: item._id,
        label: item[labelKey],
    }); });
};
exports.mapToSelectOptions = mapToSelectOptions;

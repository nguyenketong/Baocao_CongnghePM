"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var SubItemsMenu = function (_a) {
    var item = _a.item;
    var name = item.name, path = item.path;
    var router = (0, navigation_1.useRouter)();
    var pathname = (0, navigation_1.usePathname)();
    var onClick = function () {
        router.push(path); // Điều hướng đến mục con khi nhấn
    };
    var isActive = (0, react_1.useMemo)(function () { return path === pathname; }, [path, pathname]);
    return (<div className={"text-sm cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 \n      ".concat(isActive
            ? "text-white font-semibold bg-[#2D336B] "
            : "text-[#A9B5DF] hover:text-white hover:bg-[#3A6FF8] hover:shadow-lg", "\n    ")} onClick={onClick}>
      {name}
    </div>);
};
exports.default = SubItemsMenu;

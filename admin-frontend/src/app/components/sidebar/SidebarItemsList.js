"use client";
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var navigation_1 = require("next/navigation");
var SubItemsMenu_1 = require("./SubItemsMenu");
var SidebarItemsList = function (_a) {
    var item = _a.item, isSidebarOpen = _a.isSidebarOpen;
    var name = item.name, items = item.items, path = item.path, icon = item.icon;
    var _b = (0, react_1.useState)(false), expanded = _b[0], setExpanded = _b[1]; // Trạng thái mở/đóng menu con
    var router = (0, navigation_1.useRouter)();
    var pathname = (0, navigation_1.usePathname)();
    // Hàm để xử lý khi nhấn vào mục sidebar
    var onClick = function () {
        if (items && items.length > 0) {
            setExpanded(!expanded); // Mở hoặc đóng menu con khi nhấn
        }
        else {
            router.push(path); // Điều hướng đến path của mục nếu không có mục con
        }
    };
    var isActive = (0, react_1.useMemo)(function () {
        if (items && items.length > 0) {
            return items.some(function (item) { return item.path === pathname; }); // Kiểm tra xem có mục con nào đang được chọn
        }
        return path === pathname;
    }, [path, pathname, items]);
    return (<div>
      <div className={"flex items-center space-x-2 p-3 py-1 hover:bg-[#4684f7] hover:text-black hover:duration-700 rounded-lg cursor-pointer hover:text-sidebar-active justify-between ".concat(isActive ? "text-sidebar-active bg-sidebar-background" : "text-sidebar-iconColor")} onClick={onClick}>
        <span>{item.icon && <img src={icon} alt={name} width="24"/>}</span>
        <p className={"text-sm text-white w-full py-3 rounded-3xl font-semibold transition-all ".concat(!isSidebarOpen ? 'hidden' : '')}>
          {name}
        </p>
        {/* Nút mở/đóng menu con */}
        {items && items.length > 0 && (<span className={"transform transition-transform duration-200 ".concat(expanded ? "rotate-90" : "")}>
            ▶
          </span>)}
      </div>

      {/* Hiển thị các mục con nếu có và nếu menu con đang được mở */}
      {expanded && items && items.length > 0 && (<div className="flex flex-col ml-5 mt-2">
          {items.map(function (subItem) { return (<SubItemsMenu_1.default key={subItem.path} item={subItem}/>); })}
        </div>)}
    </div>);
};
exports.default = SidebarItemsList;

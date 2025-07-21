"use client"

import React, { useMemo } from 'react'
import { usePathname, useRouter } from 'next/navigation';

interface ISubItems {
  name: string;
  path: string;
}

const SubItemsMenu = ({ item }: { item: ISubItems }) => {
  const { name, path } = item;
  const router = useRouter();
  const pathname = usePathname();

  const onClick = () => {
    router.push(path);  // Điều hướng đến mục con khi nhấn
  };

  const isActive = useMemo(() => path === pathname, [path, pathname]);

  return (
    <div
      className={`text-sm cursor-pointer px-4 py-2 rounded-lg transition-all duration-300 
      ${isActive
          ? "text-white font-semibold bg-[#2D336B] "
          : "text-[#A9B5DF] hover:text-white hover:bg-[#3A6FF8] hover:shadow-lg"}
    `}
      onClick={onClick}
    >
      {name}
    </div>
  );
};

export default SubItemsMenu;

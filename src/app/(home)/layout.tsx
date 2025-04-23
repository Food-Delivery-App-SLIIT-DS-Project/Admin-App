import { NavBarComponent } from "@/components/NavBarComponent";
import { SideBarComponent } from "@/components/SideBarComponent";
import React from "react";

export default function layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex flex-row h-screen bg-gray-100 dark:bg-gray-900">
      <SideBarComponent />
      <div className="flex flex-col w-full p-4 overflow-hidden">
        <NavBarComponent />
        <div className="mt-2 flex flex-col w-full h-full p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
          {children}
        </div>
      </div>
    </div>
  );
}

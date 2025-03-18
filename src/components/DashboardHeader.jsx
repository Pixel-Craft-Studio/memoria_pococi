import React, { useState } from "react";
import ThemeSwitcher from "./ThemeSwitcher/ThemeSwitcher";
import useLocalStorage from "../hooks/useLocalStorage";
import { HiOutlineMenu, HiX } from "react-icons/hi";

const DashboardHeader = () => {
  const [isOpen, setIsOpen] = useLocalStorage("isSidebarOpen", true);

  return (
    <div className="fixed bg-gray-200 dark:bg-gray-800 pt-2 pb-2 dark:text-neutral-200  z-50 w-full ">
      <div className="flex  p-2 w-full justify-between">
        <button
          className="md:hidden top-5 absolute flex items-center gap-2  bg-gray-200 rounded-md  hover:bg-gray-300 transition"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? (
            <>
              <HiX className="text-xl " /> 
            </>
          ) : (
            <>
              <HiOutlineMenu className="text-xl " /> 
            </>
          )}
        </button>

        <h2 className="text-xl font-bold text-center z-50 ml-8 ">Dashboard</h2>
        <ThemeSwitcher />
      </div>
    </div>
  );
};

export default DashboardHeader;

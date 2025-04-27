"use client";
import { DarkThemeToggle, Navbar, NavbarToggle } from "flowbite-react";
import { IoIosArrowRoundBack } from "react-icons/io";

export function NavBarComponent() {
  const onBackButtonClick = () => {
    window.history.back();
  };
  return (
    <Navbar fluid rounded>
      <div className="flex items-center justify-between w-full h-4">
        <button onClick={onBackButtonClick} className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md  transition duration-300 ease-in-out">
          <IoIosArrowRoundBack className="text-3xl" />
        </button>
        <DarkThemeToggle className=" focus:ring-0" />
      </div>
    </Navbar>
  );
}

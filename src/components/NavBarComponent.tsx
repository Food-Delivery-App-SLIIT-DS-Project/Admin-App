"use client";

import { useRouter } from "next/navigation";
import { DarkThemeToggle, Navbar } from "flowbite-react";
import { IoIosArrowRoundBack } from "react-icons/io";

export function NavBarComponent() {
  const router = useRouter();

  const onBackButtonClick = () => {
    // Instead of history.back, manually push to previous page with reload
    if (document.referrer) {
      // Safest: Use document.referrer (real previous URL if exists)
      router.push(document.referrer);
    } else {
      router.push("/");
    }
  };

  return (
    <Navbar fluid rounded>
      <div className="flex items-center justify-between w-full h-4">
        <button
          onClick={onBackButtonClick}
          className="text-gray-500 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-md transition duration-300 ease-in-out"
        >
          <IoIosArrowRoundBack className="text-3xl" />
        </button>
        <DarkThemeToggle className="focus:ring-0" />
      </div>
    </Navbar>
  );
}

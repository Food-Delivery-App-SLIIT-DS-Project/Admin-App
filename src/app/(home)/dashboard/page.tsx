import { Card } from "flowbite-react";
import React from "react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShop } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";

function Page() {
  return (
    <div className="overflow-y-auto">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
        Dashboard
      </h1>
      <p className="mt-2 text-gray-600 dark:text-gray-400">
        Welcome to your dashboard!
      </p>

      {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between">
            <div className="flex">
              <FaRegUser className="text-5xl dark:text-white" />
            </div>
            <div className="flex flex-col items-end text-right">
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                283
              </h5>
              <span className="text-gray-600 dark:text-gray-400">
                Customers
              </span>
            </div>
          </div>
        </Card>
        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between">
            <div className="flex">
              <AiOutlineShop className="text-5xl dark:text-white" />
            </div>
            <div className="flex flex-col items-end text-right">
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                283
              </h5>
              <span className="text-gray-600 dark:text-gray-400">
                Restaurants
              </span>
            </div>
          </div>
        </Card>
        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between">
            <div className="flex">
              <IoCarOutline className="text-5xl dark:text-white" />
            </div>
            <div className="flex flex-col items-end text-right">
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                283
              </h5>
              <span className="text-gray-600 dark:text-gray-400">
                Delivery drivers
              </span>
            </div>
          </div>
        </Card>
        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between">
            <div className="flex">
              <HiOutlineCurrencyDollar className="text-5xl dark:text-white" />
            </div>
            <div className="flex flex-col items-end text-right">
              <h5 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                283
              </h5>
              <span className="text-gray-600 dark:text-gray-400">Revenue</span>
            </div>
          </div>
        </Card>
      </div>

      {/* Dashboard Cards Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between"></div>
        </Card>

        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between"></div>
        </Card>

        <Card className="flex-grow">
          <div className="flex flex-row items-center justify-between"></div>
        </Card>
      </div>
    </div>
  );
}

export default Page;

"use client";

import {
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import React, { use, useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import { AiOutlineShop } from "react-icons/ai";
import { IoCarOutline } from "react-icons/io5";
import { HiOutlineCurrencyDollar } from "react-icons/hi2";
import {
  getAllDeliveryDrivers,
  getAllRestaurants,
  getCustomers,
} from "@/api/api";
import { Restaurant } from "@/types/restaurant";
import { User } from "@/types/user";
import VerificationType from "@/components/VerificationType";

function Page() {
  interface Requests {
    requestedBy: string;
    verificationCategory: string;
  }

  const [allRequests, setAllRequests] = useState<Requests[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [restaurantCount, setRestaurantCount] = useState(0);
  const [deliveryDriverCount, setDeliveryDriverCount] = useState(0);

  useEffect(() => {
    const fetchRequests = async () => {
      // Fetch non-verified restaurants
      const restaurants = await getAllRestaurants();
      const restaurantRequests: Requests[] = (
        restaurants.nonVerified as Restaurant[]
      ).map((r) => ({
        requestedBy: r.restaurant_name ?? "Unknown Restaurant",
        verificationCategory: "Restaurant",
      }));

      // Fetch non-verified delivery drivers
      const delivery = await getAllDeliveryDrivers();
      const deliveryRequests: Requests[] = (delivery.nonVerified as User[]).map(
        (u) => ({
          requestedBy: u.fullName,
          verificationCategory: "Delivery Driver",
        })
      );

      // Combine both arrays
      setAllRequests([...restaurantRequests, ...deliveryRequests]);
    };

    fetchRequests();
  }, []);

  useEffect(() => {
    const fetchCounts = async () => {
      // Customers
      const customers = await getCustomers();
      setCustomerCount(customers.length);

      // Restaurants
      const restaurants = await getAllRestaurants();
      setRestaurantCount(
        restaurants.verified.length + restaurants.nonVerified.length
      );

      // Delivery Drivers
      const delivery = await getAllDeliveryDrivers();
      setDeliveryDriverCount(
        delivery.verified.length + delivery.nonVerified.length
      );
    };

    fetchCounts();
  }, []);

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
                {customerCount}
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
                {restaurantCount}
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
                {deliveryDriverCount}
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

      {/* Dashboard Cards Section
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
      </div> */}

      <Card className="flex-grow mt-5">
        <div className="text-xl dark:text-white font-bold mb-4">
          Incoming Verification Requests
        </div>
        <div className="overflow-x-auto">
          <Table striped>
            <TableHead>
              <TableRow>
                <TableHeadCell>Requested By</TableHeadCell>
                <TableHeadCell>Verification Category</TableHeadCell>
              </TableRow>
            </TableHead>
            <TableBody className="divide-y">
              {allRequests.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No requests found.
                  </TableCell>
                </TableRow>
              ) : (
                allRequests.map((req, idx) => (
                  <TableRow
                    key={idx}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {req.requestedBy}
                    </TableCell>
                    <TableCell>
                      <VerificationType type={req.verificationCategory} />
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>
    </div>
  );
}

export default Page;

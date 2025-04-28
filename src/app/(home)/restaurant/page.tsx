"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { IoIosSearch } from "react-icons/io";
import React, { useEffect, useState } from "react";
import { getAllRestaurants } from "@/api/api";
import { Restaurant } from "@/types/restaurant";

function Page() {
  const [verifiedRestaurants, setVerifiedRestaurants] = useState<Restaurant[]>([]);
  const [nonVerifiedRestaurants, setNonVerifiedRestaurants] = useState<Restaurant[]>(
    []
  );

  // Separate search state for Verified and Non-Verified restaurants
  const [verifiedSearchQuery, setVerifiedSearchQuery] = useState("");
  const [nonVerifiedSearchQuery, setNonVerifiedSearchQuery] = useState("");

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const { verified, nonVerified } = await getAllRestaurants();
        setVerifiedRestaurants(verified);
        setNonVerifiedRestaurants(nonVerified);
        console.log("Verified Restaurants:", verified);
        console.log("Non-Verified Restaurants:", nonVerified);
      } catch (error) {
        console.error("Error fetching restaurants:", error);
      }
    };
    fetchRestaurants();
  }, []);

  // Filter based on the respective search query
  const filterVerifiedRestaurants = (restaurants: Restaurant[]) => {
    return restaurants.filter((restaurant) => {
      const nameMatch = restaurant.restaurant_name &&
        restaurant.restaurant_name
          .toLowerCase()
          .includes(verifiedSearchQuery.toLowerCase());
      const phoneMatch = restaurant.phone
        .toLowerCase()
        .includes(verifiedSearchQuery.toLowerCase());
      return nameMatch || phoneMatch;
    });
  };

  const filterNonVerifiedRestaurants = (restaurants: Restaurant[]) => {
    return restaurants.filter((restaurant) => {
      const nameMatch = restaurant.restaurant_name &&
        restaurant.restaurant_name
        .toLowerCase()
        .includes(nonVerifiedSearchQuery.toLowerCase());
      const phoneMatch = restaurant.phone
        .toLowerCase()
        .includes(nonVerifiedSearchQuery.toLowerCase());
      return nameMatch || phoneMatch;
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 dark:text-white">
        Restaurant Registration Requests
      </h2>
      <div className="flex flex-wrap gap-4 w-full">
        {/* Non-Verified Restaurants Section */}
        <div className="flex-1 min-w-[300px]">
          <div className="text-xl mb-2 dark:text-white">
            Verification Requests
          </div>
          <div className="mb-4">
            <TextInput
              icon={IoIosSearch}
              id="input-gray"
              placeholder="Search by name or phone number"
              required
              color="gray"
              value={nonVerifiedSearchQuery} // Bind to the non-verified search state
              onChange={(e) => setNonVerifiedSearchQuery(e.target.value)} // Update non-verified search query
            />
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Restaurant Name</TableHeadCell>
                  <TableHeadCell>Phone Number</TableHeadCell>
                  <TableHeadCell>Verification</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">View</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {filterNonVerifiedRestaurants(nonVerifiedRestaurants).map(
                  (restaurant) => (
                    <TableRow
                      key={restaurant.restaurant_id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {restaurant.restaurant_name}
                      </TableCell>
                      <TableCell>{restaurant.phone}</TableCell>
                      <TableCell>
                        {restaurant.is_verified ? "Verified" : "Not Verified"}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`/restaurant/${restaurant.restaurant_id}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          VIEW
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Verified Restaurants Section */}
        <div className="flex-1 min-w-[300px]">
          <div className="text-xl mb-2 dark:text-white">
            Verified Restaurants
          </div>
          <div className="mb-4">
            <TextInput
              icon={IoIosSearch}
              id="input-gray"
              placeholder="Search by name or phone number"
              required
              color="gray"
              value={verifiedSearchQuery} // Bind to the verified search state
              onChange={(e) => setVerifiedSearchQuery(e.target.value)} // Update verified search query
            />
          </div>
          <div className="overflow-x-auto">
            <Table hoverable>
              <TableHead>
                <TableRow>
                  <TableHeadCell>Restaurant Name</TableHeadCell>
                  <TableHeadCell>Phone Number</TableHeadCell>
                  <TableHeadCell>Verification</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">View</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {filterVerifiedRestaurants(verifiedRestaurants).map(
                  (restaurant) => (
                    <TableRow
                      key={restaurant.restaurant_id}
                      className="bg-white dark:border-gray-700 dark:bg-gray-800"
                    >
                      <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                        {restaurant.restaurant_name}
                      </TableCell>
                      <TableCell>{restaurant.phone}</TableCell>
                      <TableCell>
                        {restaurant.is_verified ? "Verified" : "Not Verified"}
                      </TableCell>
                      <TableCell>
                        <a
                          href={`/restaurant/${restaurant.restaurant_id}`}
                          className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                        >
                          VIEW
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;

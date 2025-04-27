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
import { getAllDeliveryDrivers } from "@/api/api";

function Page() {
  const [verifiedDrivers, setVerifiedDrivers] = useState<any[]>([]);
  const [nonVerifiedDrivers, setNonVerifiedDrivers] = useState<any[]>([]);

  // Separate search state for Verified and Non-Verified drivers
  const [verifiedSearchQuery, setVerifiedSearchQuery] = useState("");
  const [nonVerifiedSearchQuery, setNonVerifiedSearchQuery] = useState("");

  useEffect(() => {
    const fetchDrivers = async () => {
      try {
        const { verified, nonVerified } = await getAllDeliveryDrivers();
        setVerifiedDrivers(verified);
        setNonVerifiedDrivers(nonVerified);
        console.log("Verified Drivers:", verified);
        console.log("Non-Verified Drivers:", nonVerified);
      } catch (error) {
        console.error("Error fetching delivery drivers:", error);
      }
    };
    fetchDrivers();
  }, []);

  // Filter based on the respective search query
  const filterVerifiedDrivers = (drivers: any[]) => {
    return drivers.filter((driver) => {
      const nameMatch = driver.fullName
        .toLowerCase()
        .includes(verifiedSearchQuery.toLowerCase());
      const phoneMatch = driver.phoneNumber
        .toLowerCase()
        .includes(verifiedSearchQuery.toLowerCase());
      return nameMatch || phoneMatch;
    });
  };

  const filterNonVerifiedDrivers = (drivers: any[]) => {
    return drivers.filter((driver) => {
      const nameMatch = driver.fullName
        .toLowerCase()
        .includes(nonVerifiedSearchQuery.toLowerCase());
      const phoneMatch = driver.phoneNumber
        .toLowerCase()
        .includes(nonVerifiedSearchQuery.toLowerCase());
      return nameMatch || phoneMatch;
    });
  };

  return (
    <div>
      <h2 className="text-3xl font-bold mb-5 dark:text-white">
        Delivery Driver Registration Requests
      </h2>
      <div className="flex flex-wrap gap-4 w-full">
        {/* Non-Verified Drivers Section */}
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
                  <TableHeadCell>Driver Name</TableHeadCell>
                  <TableHeadCell>Phone Number</TableHeadCell>
                  <TableHeadCell>Verification</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">View</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {filterNonVerifiedDrivers(nonVerifiedDrivers).map((driver) => (
                  <TableRow
                    key={driver.userId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {driver.fullName}
                    </TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell>
                      {driver.isVerified ? "Verified" : "Not Verified"}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`/delivery/${driver.userId}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        VIEW
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Verified Drivers Section */}
        <div className="flex-1 min-w-[300px]">
          <div className="text-xl mb-2 dark:text-white">Verified Drivers</div>
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
                  <TableHeadCell>Driver Name</TableHeadCell>
                  <TableHeadCell>Phone Number</TableHeadCell>
                  <TableHeadCell>Verification</TableHeadCell>
                  <TableHeadCell>
                    <span className="sr-only">View</span>
                  </TableHeadCell>
                </TableRow>
              </TableHead>
              <TableBody className="divide-y">
                {filterVerifiedDrivers(verifiedDrivers).map((driver) => (
                  <TableRow
                    key={driver.userId}
                    className="bg-white dark:border-gray-700 dark:bg-gray-800"
                  >
                    <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                      {driver.fullName}
                    </TableCell>
                    <TableCell>{driver.phoneNumber}</TableCell>
                    <TableCell>
                      {driver.isVerified ? "Verified" : "Not Verified"}
                    </TableCell>
                    <TableCell>
                      <a
                        href={`/delivery/${driver.userId}`}
                        className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                      >
                        VIEW
                      </a>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
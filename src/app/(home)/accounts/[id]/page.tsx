"use client";

import { getUserById } from "@/api/api";
import { User } from "@/types/user";
import { Button, Table, TableBody, TableCell, TableRow } from "flowbite-react";
import { useParams } from "next/navigation";
import React, { use, useEffect, useState } from "react";
import { MdOutlinePersonOutline } from "react-icons/md";

function page() {
  const [userDetails, setUser] = useState<User | null>(null); // State to hold user data
  const { id } = useParams(); // Get the user ID from the URL params

  useEffect(() => {
    const getUser = async () => {
      if (typeof id === "string") {
        const user = await getUserById(id);
        if (user) {
          setUser(user);
        }
      } else {
        console.error("Invalid user ID:", id);
      }
    };
    getUser();
  }, [id]); // Fetch user data when the component mounts or when the ID changes

  return (
    <div>
      <div>
        <MdOutlinePersonOutline className="dark:text-gray-300 text-gray-500 text-9xl" />
      </div>
      <div className="max-w-xl">
        <Table>
          <TableBody className="">
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className=" font-medium text-gray-900 dark:text-white">
                Full Name
              </TableCell>
              <TableCell>{userDetails?.fullName ?? ""}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className=" font-medium text-gray-900 dark:text-white">
                Email
              </TableCell>
              <TableCell>{userDetails?.email ?? ""}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className=" font-medium text-gray-900 dark:text-white">
                Contact Number
              </TableCell>
              <TableCell>{userDetails?.phoneNumber ?? ""}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className=" font-medium text-gray-900 dark:text-white">
                Role
              </TableCell>
              <TableCell>{userDetails?.role ?? ""}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className=" font-medium text-gray-900 dark:text-white">
                Verification Status
              </TableCell>
              <TableCell>
                {userDetails?.isVerified ? (
                  <Button color="green" outline disabled>
                    VERIFIED
                  </Button>
                ) : (
                  <Button color="red" outline disabled>
                    UNVERIFIED
                  </Button>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default page;

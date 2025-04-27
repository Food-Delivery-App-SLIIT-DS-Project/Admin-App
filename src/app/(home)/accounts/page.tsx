'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";
import { getAllUsers } from "@/api/api";
import { User } from "@/types/user";

function Page() {
  const [users, setUsers] = useState<User[]>([]); // State to hold all users
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]); // State for filtered users
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  // Fetch all users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData); // Set all users
        setFilteredUsers(userData); // Initialize filtered users
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  // Filter users based on search query
  useEffect(() => {
    const filtered = users.filter(
      (user) =>
        user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.phoneNumber.includes(searchQuery)
    );
    setFilteredUsers(filtered);
  }, [searchQuery, users]);

  return (
    <div>
      <div className="text-xl font-bold dark:text-white">All User Accounts</div>
      <div className="mb-4 mt-4">
        <TextInput
          icon={IoIosSearch}
          id="input-gray"
          placeholder="Search by name or phone number"
          required
          color="gray"
          value={searchQuery} // Bind to the search state
          onChange={(e) => setSearchQuery(e.target.value)} // Update search query
        />
      </div>
      <div className="mt-5 overflow-x-auto">
        <Table>
          <TableHead>
            <TableRow>
              <TableHeadCell>Name</TableHeadCell>
              <TableHeadCell>Contact</TableHeadCell>
              <TableHeadCell>Role</TableHeadCell>
              <TableHeadCell>Date Created</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">VIEW</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {filteredUsers.map((user) => (
              <TableRow
                key={user.userId}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                  {user.fullName}
                </TableCell>
                <TableCell>{user.phoneNumber}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  {new Date(user.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  <a
                    href={`/accounts/${user.userId}`}
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
  );
}

export default Page;
"use client";

import { getPaymentsOfUser, getUserById } from "@/api/api";
import TransactionState from "@/components/TransactionState";
import { Payment } from "@/types/payment";
import { User } from "@/types/user";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  TextInput,
} from "flowbite-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { IoIosSearch } from "react-icons/io";

function Page() {
  const [userDetails, setUser] = useState<User | null>(null); // State to hold user data
  const [payments, setTransactionHistory] = useState<Payment[] | null>([]); // State to hold transaction history data
  const { id } = useParams(); // Get the user ID from the URL params
  const [searchQuery, setSearchQuery] = useState<string>(""); // State for search query

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string") {
        try {
          const user = await getUserById(id);
          const transactionHistory = await getPaymentsOfUser(id);

          if (user) setUser(user);
          if (transactionHistory) setTransactionHistory(transactionHistory);
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Invalid user ID:", id);
      }
    };

    fetchData();
  }, [id]);

  // Filter payments based on the search query
  const filteredPayments = payments?.filter(
    (payment) =>
      payment.paymentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.transactionId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      payment.amount.toString().includes(searchQuery)
  );

  return (
    <div>
      <div className="text-xl font-bold dark:text-white">Customer Account</div>
      <div className="mb-4 mt-4 flex items-center">
        <span className="text-lg font-semibold dark:text-white">
          Customer Details
        </span>
      </div>
      <Card>
        <div className="flex flex-wrap w-full">
          <div className="flex">
            {/* Light mode image */}
            <img
              src="/User_icon_LightMode.svg"
              alt="User Icon"
              className="mx-10 dark:hidden"
              width={120}
              height={120}
            />

            {/* Dark mode image */}
            <img
              src="/User_icon_DarkMode.svg"
              alt="User Icon"
              className="mx-10 hidden dark:block"
              width={120}
              height={120}
            />
          </div>
          <div className="max-w-xl flex">
            <Table className="overflow-auto">
              <TableBody>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    Full Name
                  </TableCell>
                  <TableCell>{userDetails?.fullName ?? ""}</TableCell>
                </TableRow>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    Email
                  </TableCell>
                  <TableCell>{userDetails?.email ?? ""}</TableCell>
                </TableRow>
                <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    Contact Number
                  </TableCell>
                  <TableCell>{userDetails?.phoneNumber ?? ""}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </div>
      </Card>
      <div className="mb-4 mt-4 flex items-center">
        <span className="text-lg font-semibold dark:text-white">
          Transaction History
        </span>
      </div>
      <div className="mb-4 mt-4">
        <TextInput
          icon={IoIosSearch}
          id="input-gray"
          placeholder="Search by transaction ID, amount, or transaction ID"
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
              <TableHeadCell>Transaction ID</TableHeadCell>
              <TableHeadCell>Amount</TableHeadCell>
              <TableHeadCell>Status</TableHeadCell>
              <TableHeadCell>Date of Transaction</TableHeadCell>
              <TableHeadCell>
                <span className="sr-only">VIEW</span>
              </TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody className="divide-y">
            {filteredPayments && filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <TableRow
                  key={payment.paymentId}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                    <Badge
                      className=" max-w-3xs flex justify-center"
                      size="sm"
                      color="dark"
                    >
                      {payment.paymentId}
                    </Badge>
                  </TableCell>
                  <TableCell>${payment.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <TransactionState state={payment.status} />
                  </TableCell>
                  <TableCell>
                    {new Date(payment.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <a
                      href={`/customer/${userDetails?.userId}/${payment.paymentId}`}
                      className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                    >
                      VIEW
                    </a>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="text-center text-gray-500 dark:text-gray-400"
                >
                  No transactions found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Page;
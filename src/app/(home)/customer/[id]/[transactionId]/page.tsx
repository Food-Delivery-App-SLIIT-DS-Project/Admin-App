"use client";

import { getOrderDetailsById, getPaymentById } from "@/api/api";
import { RefundModal } from "@/components/RefundModal";
import TransactionState from "@/components/TransactionState";
import { Order, OrderItem } from "@/types/order";
import { Payment } from "@/types/payment";
import {
  Badge,
  Card,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
} from "flowbite-react";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

function Page() {
  const { id, transactionId } = useParams<{
    id: string;
    transactionId: string;
  }>();
  const [transactionDetails, setTransactionDetails] = useState<Payment | null>(
    null
  ); // State to hold transaction details
  const [orderDetails, setOrderDetails] = useState<Order | null>(null); // State to hold order details

  useEffect(() => {
    const fetchData = async () => {
      if (typeof id === "string" && typeof transactionId === "string") {
        try {
          const transaction = await getPaymentById(transactionId);
          if (transaction) {
            setTransactionDetails(transaction);
            const order = await getOrderDetailsById(transaction.orderId ?? "");
            if (order) {
              setOrderDetails(order);
            }
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      } else {
        console.error("Invalid user ID or transaction ID:", id, transactionId);
      }
    };

    fetchData();
  }, [id, transactionId]);

  return (
    <div className="flex flex-wrap max-w-full max-h-full gap-5 overflow-auto">
      <Card className="max-w-md flex-wrap max-h-[450px]">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Payment Details
        </h5>
        <Table className="overflow-auto">
          <TableBody>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Transaction ID
              </TableCell>
              <TableCell>
                <Badge color="dark" size="sm">
                  {transactionDetails?.paymentId ?? "N/A"}
                </Badge>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Amount
              </TableCell>
              <TableCell>
                ${transactionDetails?.amount.toFixed(2) ?? "N/A"}
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Status
              </TableCell>
              <TableCell>
                <TransactionState
                  state={transactionDetails?.status ?? "N/A"}
                ></TransactionState>
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Payment Method
              </TableCell>
              <TableCell>
                {transactionDetails?.paymentMethod ?? "N/A"}
              </TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Order ID
              </TableCell>
              <TableCell>
                <Badge color="dark" size="sm">
                  {transactionDetails?.orderId ?? "N/A"}
                </Badge>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <div className="flex mb-2 max-w-full items-end justify-end">
          <RefundModal
            userID={id}
            paymentId={transactionId}
          />
        </div>
      </Card>

      {/* Order Details */}
      <Card className="flex grow">
        <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          Order Details
        </h5>
        <Table className="overflow-auto">
          <TableBody>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Order ID
              </TableCell>
              <TableCell>{orderDetails?.orderId ?? "N/A"}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Customer ID
              </TableCell>
              <TableCell>{orderDetails?.customerId ?? "N/A"}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Restaurant ID
              </TableCell>
              <TableCell>{orderDetails?.restaurantId ?? "N/A"}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Delivery ID
              </TableCell>
              <TableCell>{orderDetails?.deliveryId ?? "N/A"}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Status
              </TableCell>
              <TableCell>{orderDetails?.status ?? "N/A"}</TableCell>
            </TableRow>
            <TableRow className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <TableCell className="font-medium text-gray-900 dark:text-white">
                Total Price
              </TableCell>
              <TableCell>
                ${orderDetails?.totalPrice.toFixed(2) ?? "N/A"}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>

        {/* Order Items */}
        <h5 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
          Order Items
        </h5>
        <Table className="overflow-auto">
          <TableHead>
            <TableRow>
              <TableHeadCell>Menu ID</TableHeadCell>
              <TableHeadCell>Quantity</TableHeadCell>
              <TableHeadCell>Price</TableHeadCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderDetails?.items.map((item: OrderItem, index: number) => (
              <TableRow
                key={index}
                className="bg-white dark:border-gray-700 dark:bg-gray-800"
              >
                <TableCell>{item.menuId}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>${item.price.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}

export default Page;

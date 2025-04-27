"use client";

import {
  Sidebar,
  SidebarCollapse,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";
import { BsFillFilePersonFill } from "react-icons/bs";
import { FaShop } from "react-icons/fa6";
import { FaMoneyCheckDollar } from "react-icons/fa6";
import { IoCar } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";


export function SideBarComponent() {
  const [analytics, setAnalytics] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [account, setAccount] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [transactions, setTransactions] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const getLocation = () => {
    const path = window.location.pathname.split("/").pop();
    if (path === "analytics") {
      setAnalytics(true);
    } else if (path === "dashboard") {
      setDashboard(true);
    } else if (path === "accounts") {
      setAccount(true);
    } else if (path === "restaurant") {
      setRestaurant(true);
    } else if (path === "transactions") {
      setTransactions(true);
    } else if (path === "delivery") {
      setDelivery(true);
    }
  };

  useEffect(() => {
    getLocation();
  }, []);

  return (
    <Sidebar aria-label="Default sidebar with logo branding">
      <SidebarItems>
        <SidebarItemGroup>
          <div className="flex items-center justify-center">
            {/* Light mode logo */}
            <img
              alt="Logo Light Mode"
              src="/Branding_LightMode_export.svg"
              width={100}
              height={100}
              className="block dark:hidden"
            />
            {/* Dark mode logo */}
            <img
              alt="Logo Dark Mode"
              src="/Branding_DarkMode_export.svg"
              width={100}
              height={100}
              className="hidden dark:block"
            />
          </div>
        </SidebarItemGroup>

        <SidebarItemGroup>
          <SidebarItem
            href="/dashboard"
            icon={BiSolidDashboard}
            active={dashboard}
          >
            Dashboard
          </SidebarItem>

         <SidebarCollapse label="Accounts" icon={BsFillFilePersonFill}>
          <SidebarItem
            href="/accounts"
            icon={GoPersonFill }
            active={account}
          >
            All accounts
          </SidebarItem>
          <SidebarItem
            href="/delivery"
            icon={IoCar }
            active={delivery}
          >
            Delivery Drivers
          </SidebarItem>

          
          <SidebarItem
            href="/restaurant"
            icon={FaShop}
            active={restaurant}
          >
            Restaurants
          </SidebarItem>
        </SidebarCollapse>
          
          <SidebarItem
            href="/transactions"
            icon={FaMoneyCheckDollar}
            active={transactions}
          >
            Transactions
          </SidebarItem>
          <SidebarItem
            href="/analytics"
            icon={HiChartPie}
            active={analytics}
          >
            Analytics
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}
"use client";

import {
  Sidebar,
  SidebarItem,
  SidebarItemGroup,
  SidebarItems,
} from "flowbite-react";

import { useEffect, useState } from "react";
import { HiChartPie } from "react-icons/hi";
import { BiSolidDashboard } from "react-icons/bi";
import { FaShop } from "react-icons/fa6";
import { IoCar } from "react-icons/io5";
import { GoPersonFill } from "react-icons/go";

export function SideBarComponent() {
  const [analytics, setAnalytics] = useState(false);
  const [dashboard, setDashboard] = useState(false);
  const [customer, setCustomer] = useState(false);
  const [restaurant, setRestaurant] = useState(false);
  const [delivery, setDelivery] = useState(false);

  const getLocation = () => {
    const path = window.location.pathname.split("/").pop();
    if (path === "analytics") {
      setAnalytics(true);
    } else if (path === "dashboard") {
      setDashboard(true);
    } else if (path === "customer") {
      setCustomer(true);
    } else if (path === "restaurant") {
      setRestaurant(true);
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

          <SidebarItem href="/customer" icon={GoPersonFill} active={customer}>
            Customer
          </SidebarItem>
          <SidebarItem href="/delivery" icon={IoCar} active={delivery}>
            Delivery Drivers
          </SidebarItem>

          <SidebarItem href="/restaurant" icon={FaShop} active={restaurant}>
            Restaurants
          </SidebarItem>

          <SidebarItem href="/analytics" icon={HiChartPie} active={analytics}>
            Analytics
          </SidebarItem>
        </SidebarItemGroup>
      </SidebarItems>
    </Sidebar>
  );
}

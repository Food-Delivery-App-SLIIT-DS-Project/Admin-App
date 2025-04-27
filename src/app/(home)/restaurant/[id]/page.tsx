"use client";

import React, { use, useEffect, useState } from "react";
import { Button, Card, FloatingLabel } from "flowbite-react";
import {
  usePathname,
  useRouter,
  useSearchParams,
  useParams,
} from "next/navigation";
import { getRestaurantById } from "@/api/api";
import { Restaurant } from "@/types/restaurant";

function page() {
  const router = useRouter();
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null); // State to hold restaurant data

  useEffect(() => {
    console.log("Restaurant ID:", id); // Log the restaurant ID for debugging
    const fetchRestaurantByID = async () => {
      if (typeof id === "string") {
        const data = await getRestaurantById(id);
        setRestaurant(data); // Set the restaurant data in state
      } else {
        alert("Invalid restaurant ID");
        router.push("/restaurant"); // Redirect to the restaurant page if ID is invalid
      }
    };
    fetchRestaurantByID();
  }, []);

  return (
    <div className="overflow-scroll">
      <div className="w-full dark:text-white text-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            {restaurant?.is_verified ? (
              <div>
                <Button color="green" outline disabled>
                  VERIFIED
                </Button>
              </div>
            ) : (
              <div>
                <Button color="red" outline disabled>
                  UNVERIFIED
                </Button>
              </div>
            )}
          </div>
          <i className="text-gray-400">
            RestaurantID: {restaurant?.restaurant_id}
          </i>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          <Card className="flex-1 mt-2 max-w-xl">
            Name
            <FloatingLabel
              className="max-w-md dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={restaurant?.restaurant_name ?? ""}
              color="success"
              disabled
            />
            Address
            <FloatingLabel
              className="max-w-md overflow-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={restaurant?.address ?? ""}
              color="success"
              disabled
            />
            Contact
            <FloatingLabel
              className="max-w-md dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={restaurant?.phone ?? ""}
              color="success"
              disabled
            />
            Opening Hours
            <FloatingLabel
              className="max-w-md dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={restaurant?.opening_hours ?? ""}
              color="success"
              disabled
            />
            Cusine Type
            <FloatingLabel
              className="max-w-md dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={restaurant?.cuisine_type ?? ""}
              color="success"
              disabled
            />
            Description
            <FloatingLabel
              className="max-w-md py-20 overflow-y-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={restaurant?.description ?? ""}
              color="success"
              disabled
            />
          </Card>
          <Card className="mt-2 max-w-xl">
            Attached Image
            <img
              width={500}
              height={100}
              src={restaurant?.image_reference}
              alt="Restaurant"
            />
          </Card>
        </div>
        <Card className="mt-5">
          <Button color="green">
            Verify Restaurant
          </Button>
          <Button color="red">
            Reject
          </Button>
        </Card>
      </div>
    </div>
  );
}

export default page;

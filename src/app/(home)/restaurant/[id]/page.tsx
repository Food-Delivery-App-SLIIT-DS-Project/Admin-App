"use client";

import React, { useEffect, useState } from "react";
import { Button, Card, FloatingLabel } from "flowbite-react";
import { useRouter, useParams } from "next/navigation";
import { getRestaurantById, getUserById } from "@/api/api";
import { Restaurant } from "@/types/restaurant";
import { VerifyRestaurantModel } from "@/components/VerifyRestaurantModal";
import { User } from "@/types/user";
import { RejectRestaurantModel } from "@/components/RejectRestaurantModel";

function page() {
  const router = useRouter();
  const { id } = useParams(); // Get the restaurant ID from the URL
  const [restaurant, setRestaurant] = useState<Restaurant | null>(null); // State to hold restaurant data
  const [user, setUser] = useState<User | null>(null); // State to hold user data

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === "string") {
          console.log("Restaurant ID:", id); // Log the restaurant ID for debugging

          // Fetch restaurant data
          const restaurantData = await getRestaurantById(id);
          setRestaurant(restaurantData);

          // Fetch user data if user_id is available
          if (restaurantData?.user_id) {
            const userData = await getUserById(restaurantData.user_id);
            console.log("User Data:", userData); // Log the user data for debugging
            setUser(userData);
          }
        } else {
          alert("Invalid restaurant ID");
          router.push("/restaurant"); // Redirect to the restaurant page if ID is invalid
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        alert("Failed to fetch restaurant or user data.");
      }
    };

    fetchData();
  }, [id]);

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
          {/* Restaurant Information Card */}
          <Card className="flex-1 mt-2 max-w-xl">
            <div className="text-2xl font-bold mb-2 dark:text-white">
              Restaurant Information
            </div>
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
            Cuisine Type
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

          {/* User Information Card */}
          <Card className="flex-1 mt-2 max-w-xl items-start justify-start">
            <div className="text-2xl font-bold mb-2 dark:text-white">
              User Information
            </div>
            Full name
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={user?.fullName ?? ""}
              disabled
            />
            Email
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={user?.email ?? ""}
              disabled
            />
            Contact Number
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={user?.phoneNumber ?? ""}
              disabled
            />
            <div className="py-55"></div>
          </Card>

          {/* Attached Image Card */}
          <Card className="flex-1 mt-2 max-w-xl items-start justify-start">
            <div className="text-2xl font-bold mb-2 dark:text-white">
              Attached Image
            </div>
            <img
              src={restaurant?.image_reference}
              alt="Restaurant"
              width={500}
              height={500}
            />
            <div className="py-10"></div>
          </Card>
        </div>
        <Card className="mt-5">
          {id && typeof id === "string" && (
            <VerifyRestaurantModel
              restaurantId={id}
              userEmail={user?.email ?? ""}
            />
          )}
          {id && typeof id === "string" && (
            <RejectRestaurantModel
              restaurantId={id}
              userEmail={user?.email ?? ""}
            />
          )}
        </Card>
      </div>
    </div>
  );
}

export default page;

'use client';

import React, { useEffect, useState } from 'react';
import { Button, Card, FloatingLabel } from 'flowbite-react';
import { useParams } from 'next/navigation';
import { getDriverVehicleByUserId, getUserById } from '@/api/api';
import { User } from '@/types/user';
import { Vehicle } from '@/types/vehicle';
import { VerifyDriverModal } from '@/components/VerifyDriverModal';
import { RejectDriverModel } from '@/components/RejectDriverModal';

function Page() {
  const { id } = useParams(); // Get the delivery person ID from the URL
  const [user, setUser] = useState<User | null>(null); // State to hold user data
  const [vehicle, setVehicle] = useState<Vehicle | null>(null); // State to hold vehicle data
  const [isVerified, setIsVerified] = useState<boolean | null>(null); // State to track verification status

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (typeof id === 'string') {
          console.log('Delivery Person ID:', id); // Log the delivery person ID for debugging

          // Fetch user data
          const userData = await getUserById(id);
          setUser(userData);
          setIsVerified(userData.isVerified);

          // Fetch vehicle data
          const vehicleData = await getDriverVehicleByUserId(id);
          setVehicle(vehicleData);

          console.log('User Data:', userData); // Log the user data for debugging
          console.log('Vehicle Data:', vehicleData); // Log the vehicle data for debugging
        } else {
          alert('Invalid delivery person ID');
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        alert('Failed to fetch delivery person or vehicle data.');
      }
    };

    fetchData();
  }, [id]);

  return (
    <div className="overflow-scroll">
      <div className="w-full dark:text-white text-md">
        <div className="flex justify-between items-center mb-4">
          <div>
            {isVerified ? (
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
          <i className="text-gray-400">Delivery Person ID: {user?.userId}</i>
        </div>
        <div className="flex flex-wrap gap-4 justify-center">
          {/* User Information Card */}
          <Card className="flex-1 mt-2 max-w-xl items-start justify-start">
            <div className="text-2xl font-bold mb-2 dark:text-white">
              User Information
            </div>
            Full name
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={user?.fullName ?? ''}
              disabled
            />
            Email
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={user?.email ?? ''}
              disabled
            />
            Contact Number
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={user?.phoneNumber ?? ''}
              disabled
            />
            <div className='py-25'>
            </div>
          </Card>

          {/* Vehicle Information Card */}
          <Card className="flex-1 mt-2 max-w-xl items-start justify-start">
            <div className="text-2xl font-bold mb-2 dark:text-white">
              Vehicle Information
            </div>
            Vehicle Type
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={vehicle?.vehicle_type ?? ''}
              disabled
            />
            Brand Name
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={vehicle?.brand_name ?? ''}
              disabled
            />
            Model Name
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={vehicle?.model_name ?? ''}
              disabled
            />
            Registration Number
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={vehicle?.registration_number ?? ''}
              disabled
            />
            Insurance Expiry
            <FloatingLabel
              className="max-w-md overflow-x-auto dark:bg-transparent bg-transparent text-md"
              variant="outlined"
              label={
                vehicle?.insurance_expiry
                  ? new Date(vehicle.insurance_expiry).toLocaleDateString()
                  : ''
              }
              disabled
            />
          </Card>
        </div>
        <Card className="mt-5">
          {id && typeof id === 'string' && (
            <div className="flex gap-4">
              <VerifyDriverModal userID={id} userEmail={user?.email ?? ''}/>
              <RejectDriverModel userID={id} userEmail={user?.email ?? ''}/>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}

export default Page;
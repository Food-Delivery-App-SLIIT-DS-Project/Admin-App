"use client";

import { sendConfirmationEmail, updateDriverVerification, verifyRestaurant } from "@/api/api";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spinner } from "flowbite-react";

interface VerifyDriverModelProps {
  userID: string;
  userEmail: string;
}

export function VerifyDriverModal({
  userID,
  userEmail
}: VerifyDriverModelProps) {

  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading status

  const handleVerifyRestaurant = async () => {
    // Add your verification logic here
    setLoading(true);
    const response = await updateDriverVerification(userID, true); // Update verification status to true
    if (response) {
      const emailResponse = await sendConfirmationEmail(userEmail);
      if (emailResponse.sent === true) {
        console.log("Driver verified and email sent !");
        setOpenModal(false); // Close the modal after verification
        window.location.reload();
      }
    }
    else {
      console.log("Error verifying driver:", response.data.message);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <>
      <Button color="green" onClick={() => setOpenModal(true)}>
        VERIFY
      </Button>
      <Modal
        show={openModal}
        size="md"
        onClose={() => setOpenModal(false)}
        popup
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            {loading ? (
              <div className="flex justify-center items-center h-24">
                <Spinner aria-label="Loading..." size="xl" color="success" />
              </div>
            ) : (
              <div>
                <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
                <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                  Are you sure you want to verify this driver ?
                </h3>
                <p className="mb-5 text-md font-normal text-red-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>
                <div className="flex justify-center gap-4">
                  <Button color="blue" onClick={() => handleVerifyRestaurant()}>
                    Confirm
                  </Button>
                  <Button color="gray" onClick={() => setOpenModal(false)}>
                    No, cancel
                  </Button>
                </div>
              </div>
            )}
          </div>
        </ModalBody>
      </Modal>
    </>
  );
}

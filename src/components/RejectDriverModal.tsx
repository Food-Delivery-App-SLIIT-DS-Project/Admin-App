"use client";

import { sendDriverRejectionEmail, updateDriverVerification } from "@/api/api";
import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import { Spinner } from "flowbite-react";

interface RejectDriverModelProps {
  userID: string;
  userEmail: string;
}

export function RejectDriverModel({
  userID,
  userEmail,
}: RejectDriverModelProps) {
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false); // State to manage loading status
  const [reason, setReason] = useState(""); // State to manage rejection reason

  const handleVerifyRestaurant = async () => {
    if (reason.trim() === "" || reason === undefined || reason === null) {
      alert("Please enter a reason for rejection.");
      return;
    }
    // Add your verification logic here
    setLoading(true);
    const response = await updateDriverVerification(userID, false); // Update verification status to false
    if (response) {
      const emailResponse = await sendDriverRejectionEmail(userEmail, reason);
      if (emailResponse.sent === true) {
        console.log("Restaurant verified and email sent !");
        setOpenModal(false); // Close the modal after verification
        window.location.reload();
      }
    } else {
      console.log("Error verifying restaurant:", response.data.message);
      setLoading(false); // Stop loading if there's an error
    }
  };

  return (
    <>
      <Button color="red" onClick={() => setOpenModal(true)}>
        REJECT DRIVER
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
                  Are you sure you want to reject this Driver verification?
                </h3>
                <p className="mb-5 text-md font-normal text-red-500 dark:text-gray-400">
                  This action cannot be undone.
                </p>

                <textarea
                  className="w-full mb-5 p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the reason for rejection"
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  required
                ></textarea>
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

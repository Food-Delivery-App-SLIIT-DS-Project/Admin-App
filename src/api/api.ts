import { Restaurant } from "@/types/restaurant";
import api from "./axios-instance"; // Adjust the import path as necessary
import { User } from "@/types/user";

async function getAllRestaurants() {
  try {
    const response = await api.get("/restaurant");

    const verified = response.data.data.filter(
      (restaurant: Restaurant) => restaurant.is_verified
    );
    const nonVerified = response.data.data.filter(
      (restaurant: Restaurant) => !restaurant.is_verified
    );

    return { verified, nonVerified };
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getRestaurantById(id: string) {
  try {
    const response = await api.get(`/restaurant/${id}`);

    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function verifyRestaurant(id: string) {
  try {
    const response = await api.patch(`/restaurant/${id}/verification`, {
      isVerified: true,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error verifying restaurant:", error);
    throw error;
  }
}

async function getUserById(id: string) {
  try {
    const response = await api.get(`/user/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

async function sendConfirmationEmail(email: string) {
  try {
    const response = await api.post("/email/confirm", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
}

async function sendRejectionEmail(email: string, reason: string) {
  try {
    const response = await api.post("/email/reject", { email, reason });
    return response.data;
  } catch (error) {
    console.error("Error sending rejection email:", error);
    throw error;
  }
}

async function unverifyRestaurant(id: string) {
  try {
    const response = await api.patch(`/restaurant/${id}/verification`, {
      isVerified: false,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error verifying restaurant:", error);
    throw error;
  }
}

async function getAllUsers() {
  try {
    const response = await api.get("/user");
    return response.data.users; //return users array
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getCustomers() {
  try {
    const response = await api.get("/user/customer");
    return response.data.users; //return users array
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

async function getAllDeliveryDrivers() {
  try {
    const response = await api.get("/user/delivery_personnel");

    const verified = response.data.users.filter((user: User) => user.isVerified);
    const nonVerified = response.data.users.filter(
      (user: User) => !user.isVerified
    );

    return { verified, nonVerified };
  } catch (error) {
    console.error("Error fetching delivery drivers:", error);
    throw error;
  }
}

async function getDriverVehicleByUserId(userId: string) {
  try {
    const response = await api.get(`/vehicles/driver/${userId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching driver vehicle data:", error);
    throw error;
  }
}

async function updateDriverVerification(
  userId: string,
  isVerified: boolean
) {
  try {
    const response = await api.patch(`/user/verify`, {
      userId:userId,
      isVerified:isVerified,
    });
    return response.data;
  } catch (error) {
    console.error("Error updating driver verification status:", error);
    throw error;
  }
}


async function getPaymentsOfUser(userId:string) {
    try {
      const response = await api.get(`/payment/user/${userId}`);
      return response.data.data;
    } catch (error) {
      console.error("Error fetching user payments:", error);
      throw error;
    }
}

async function getPaymentById(paymentId:string) {
  try {
    const response = await api.get(`/payment/${paymentId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching payment data:", error);
    throw error;
  }
}

async function getOrderDetailsById(orderId:string) {
  try {
    const response = await api.get(`/order/${orderId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching order details:", error);
    throw error;
  }
}

async function sendDriverConfirmationEmail(email: string) {
  try {
    const response = await api.post("/email/driver-confirm", { email });
    return response.data;
  } catch (error) {
    console.error("Error sending confirmation email:", error);
    throw error;
  }
}

async function sendDriverRejectionEmail(email: string, reason: string) {
  try {
    const response = await api.post("/email/driver-reject", { email, reason });
    return response.data;
  } catch (error) {
    console.error("Error sending rejection email:", error);
    throw error;
  }
}

async function sendRefundEmail(email: string, reason: string) {
  try {
    const response = await api.post("/email/refund-confirm", { email, reason });
    return response.data;
  } catch (error) {
    console.error("Error sending refund email:", error);
    throw error;
  }
}

async function paymentRefund(paymentId: string) {
  try {
    const response = await api.post(`/payment/refund/${paymentId}`);
    return response.data.data;
  } catch (error) {
    console.error("Error processing payment refund:", error);
    throw error;
  }
}


export {
  getAllRestaurants,
  getRestaurantById,
  verifyRestaurant,
  getUserById,
  sendConfirmationEmail,
  sendRejectionEmail,
  unverifyRestaurant,
  getAllUsers,
  getAllDeliveryDrivers,
  getDriverVehicleByUserId,
  updateDriverVerification,
  getCustomers,
  getPaymentsOfUser,
  getPaymentById,
  getOrderDetailsById,
  sendDriverConfirmationEmail,
  sendDriverRejectionEmail,
  sendRefundEmail,
  paymentRefund,
};

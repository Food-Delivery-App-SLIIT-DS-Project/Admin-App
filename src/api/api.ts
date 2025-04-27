import api from "./axios-instance"; // Adjust the import path as necessary

async function getAllRestaurants() {
  try {
    const response = await api.get("/restaurant");

    const verified = response.data.data.filter(
      (restaurant: any) => restaurant.is_verified
    );
    const nonVerified = response.data.data.filter(
      (restaurant: any) => !restaurant.is_verified
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
    const response = await api.patch(`/restaurant/verify/${id}`, {
      is_verified: true,
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

async function sendRejectionEmail(email: string , reason: string) {
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
    const response = await api.patch(`/restaurant/verify/${id}`, {
      is_verified: false,
    });
    return response.data.data;
  } catch (error) {
    console.error("Error verifying restaurant:", error);
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
};

import api from "./axios-instance"; // Adjust the import path as necessary

async function getAllRestaurants() {
  try {
    
    const response = await api.get("/restaurant");
    console.log("Response from API:", response.data); // Log the response to see its structure
    
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
    console.log("Response from API:", response.data); // Log the response to see its structure
    return response.data.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
}

export { getAllRestaurants,getRestaurantById };

export interface OrderItem {
  menuId: string;
  quantity: number;
  price: number;
}

export type OrderStatus =
  | "PENDING"
  | "ACCEPTED"
  | "REJECTED"
  | "PREPARING"
  | "WAITING_FOR_PICKUP"
  | "OUT_FOR_DELIVERY"
  | "DELIVERED"
  | "CANCELED";

export interface Order {
  orderId: string;
  customerId: string;
  restaurantId: string;
  deliveryId: string;
  status: OrderStatus;
  totalPrice: number;
  items: OrderItem[];
}

export type UserRole = 'admin' | 'delivery' | 'customer';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: UserRole;
  avatar?: string;
}

export interface Order {
  id: string;
  customerId: string;
  customerName: string;
  customerPhone: string;
  address: string;
  location: {
    latitude: number;
    longitude: number;
  };
  gasType: string;
  quantity: number;
  status: 'pending' | 'assigned' | 'in_progress' | 'delivered' | 'cancelled';
  deliveryPersonId?: string;
  deliveryPersonName?: string;
  createdAt: string;
  updatedAt: string;
  estimatedDeliveryTime?: string;
  totalAmount: number;
  paymentMethod: 'cash' | 'online';
  paymentStatus: 'pending' | 'completed';
}

export interface GasType {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  available: boolean;
}

export interface DeliveryPerson {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  avatar?: string;
  isAvailable: boolean;
  currentLocation?: {
    latitude: number;
    longitude: number;
  };
  totalDeliveries: number;
  rating: number;
}

export interface Customer {
  id: string;
  userId: string;
  name: string;
  phone: string;
  email: string;
  defaultAddress?: string;
  defaultLocation?: {
    latitude: number;
    longitude: number;
  };
  totalOrders: number;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
  loading: boolean;
  error: string | null;
}
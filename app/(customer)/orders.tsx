import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, FlatList, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import OrderCard from '../../components/OrderCard';
import { Order } from '../../types';

// Mock orders data
const mockOrders: Order[] = [
  {
    id: '1001',
    customerId: '1',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    address: '123 Main St, Bangalore, Karnataka',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    gasType: 'Domestic LPG Cylinder',
    quantity: 1,
    status: 'delivered',
    deliveryPersonId: '101',
    deliveryPersonName: 'Raj Kumar',
    createdAt: '2023-06-15T10:30:00Z',
    updatedAt: '2023-06-15T14:45:00Z',
    estimatedDeliveryTime: '2023-06-15T14:30:00Z',
    totalAmount: 900,
    paymentMethod: 'cash',
    paymentStatus: 'completed',
  },
  {
    id: '1002',
    customerId: '1',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    address: '456 Park Ave, Bangalore, Karnataka',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    gasType: 'Commercial LPG Cylinder',
    quantity: 2,
    status: 'in_progress',
    deliveryPersonId: '102',
    deliveryPersonName: 'Amit Singh',
    createdAt: '2023-06-20T09:15:00Z',
    updatedAt: '2023-06-20T10:30:00Z',
    estimatedDeliveryTime: '2023-06-20T12:00:00Z',
    totalAmount: 3600,
    paymentMethod: 'cash',
    paymentStatus: 'pending',
  },
  {
    id: '1003',
    customerId: '1',
    customerName: 'John Doe',
    customerPhone: '+1234567890',
    address: '789 Oak Rd, Bangalore, Karnataka',
    location: {
      latitude: 12.9716,
      longitude: 77.5946,
    },
    gasType: 'Small LPG Cylinder',
    quantity: 3,
    status: 'pending',
    createdAt: '2023-06-22T14:20:00Z',
    updatedAt: '2023-06-22T14:20:00Z',
    totalAmount: 1350,
    paymentMethod: 'cash',
    paymentStatus: 'pending',
  },
];

export default function CustomerOrdersScreen() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'all' | 'active' | 'completed'>('all');
  
  const filteredOrders = mockOrders.filter((order) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'active') return ['pending', 'assigned', 'in_progress'].includes(order.status);
    if (activeTab === 'completed') return order.status === 'delivered';
    return true;
  });

  const handleOrderPress = (order: Order) => {
    // In a real app, this would navigate to an order details screen
    console.log('Order pressed:', order.id);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="My Orders" />
      
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, activeTab === 'all' && styles.activeTab]}
          onPress={() => setActiveTab('all')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'all' && styles.activeTabText,
            ]}
          >
            All
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'active' && styles.activeTab]}
          onPress={() => setActiveTab('active')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'active' && styles.activeTabText,
            ]}
          >
            Active
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
          onPress={() => setActiveTab('completed')}
        >
          <Text
            style={[
              styles.tabText,
              activeTab === 'completed' && styles.activeTabText,
            ]}
          >
            Completed
          </Text>
        </TouchableOpacity>
      </View>
      
      {filteredOrders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No orders found</Text>
        </View>
      ) : (
        <FlatList
          data={filteredOrders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <OrderCard
              order={item}
              onPress={() => handleOrderPress(item)}
              showCustomerDetails={false}
            />
          )}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  tab: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#3498db',
  },
  tabText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  activeTabText: {
    color: '#3498db',
    fontFamily: 'Inter-SemiBold',
  },
  listContent: {
    padding: 16,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
});
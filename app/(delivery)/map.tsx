import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import Header from '../../components/Header';
import MapViewComponent from '../../components/MapView';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { MapPin, Navigation, Phone, CircleCheck as CheckCircle } from 'lucide-react-native';
import * as Location from 'expo-location';
import { Order } from '../../types';

// Mock active order data
const activeOrder: Order = {
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
};

export default function DeliveryMapScreen() {
  const router = useRouter();
  const [order] = useState<Order | null>(activeOrder);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

  useEffect(() => {
    requestLocationPermission();
  }, []);

  const requestLocationPermission = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
        setLocationPermissionDenied(true);
        return;
      }
      
      const location = await Location.getCurrentPositionAsync({});
      setUserLocation(location);
    } catch (error) {
      console.error('Error getting location:', error);
      setLocationPermissionDenied(true);
    }
  };

  const openNavigation = () => {
    if (!order || !order.location) return;
    
    const { latitude, longitude } = order.location;
    const label = encodeURIComponent(order.address);
    
    let url;
    if (Platform.OS === 'ios') {
      url = `maps:0,0?q=${label}@${latitude},${longitude}`;
    } else {
      url = `geo:0,0?q=${latitude},${longitude}(${label})`;
    }
    
    // In a real app, use Linking.openURL(url)
    console.log('Opening navigation with URL:', url);
  };

  const callCustomer = () => {
    if (!order || !order.customerPhone) return;
    
    // In a real app, use Linking.openURL(`tel:${order.customerPhone}`)
    console.log('Calling customer:', order.customerPhone);
  };

  const markAsDelivered = () => {
    // In a real app, this would make an API call to update the order status
    console.log('Marking order as delivered:', order?.id);
  };

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Delivery Map" showBackButton />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Active Deliveries</Text>
          <Text style={styles.emptyText}>
            You don't have any active deliveries to navigate to.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Delivery Map" showBackButton />
      
      <View style={styles.mapContainer}>
        <MapViewComponent
          customerLocation={order.location}
          deliveryLocation={
            userLocation
              ? {
                  latitude: userLocation.coords.latitude,
                  longitude: userLocation.coords.longitude,
                }
              : undefined
          }
          height="60%"
          showsUserLocation
          followsUserLocation
        />
      </View>
      
      {locationPermissionDenied && (
        <View style={styles.permissionError}>
          <Text style={styles.permissionErrorText}>
            Location permission denied. Please enable location services to use the map.
          </Text>
        </View>
      )}
      
      <View style={styles.detailsContainer}>
        <Card style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order #{order.id}</Text>
          
          <View style={styles.customerInfo}>
            <Text style={styles.customerName}>{order.customerName}</Text>
            <TouchableOpacity style={styles.callButton} onPress={callCustomer}>
              <Phone size={16} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.addressContainer}>
            <MapPin size={18} color="#3498db" />
            <Text style={styles.addressText}>{order.address}</Text>
          </View>
          
          <View style={styles.orderDetails}>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Gas Type:</Text>
              <Text style={styles.detailValue}>{order.gasType}</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Quantity:</Text>
              <Text style={styles.detailValue}>{order.quantity}</Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Payment:</Text>
              <Text style={styles.detailValue}>
                {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}
              </Text>
            </View>
            <View style={styles.orderDetail}>
              <Text style={styles.detailLabel}>Amount:</Text>
              <Text style={styles.detailValue}>₹{order.totalAmount.toFixed(2)}</Text>
            </View>
          </View>
          
          <View style={styles.actionButtons}>
            <Button
              title="Navigate"
              variant="primary"
              style={styles.actionButton}
              onPress={openNavigation}
              leftIcon={<Navigation size={18} color="#fff" />}
            />
            <Button
              title="Mark Delivered"
              variant="secondary"
              style={styles.actionButton}
              onPress={markAsDelivered}
              leftIcon={<CheckCircle size={18} color="#2c3e50" />}
            />
          </View>
        </Card>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  mapContainer: {
    flex: 1,
  },
  detailsContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
  },
  orderCard: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  orderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  customerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  customerName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  callButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 16,
    backgroundColor: '#f8f9fa',
    padding: 12,
    borderRadius: 8,
  },
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
    flex: 1,
  },
  orderDetails: {
    marginBottom: 16,
  },
  orderDetail: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    flex: 1,
    marginHorizontal: 4,
  },
  permissionError: {
    position: 'absolute',
    top: 100,
    left: 16,
    right: 16,
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
  },
  permissionErrorText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#e53935',
    textAlign: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  emptyTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 8,
  },
  emptyText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
});
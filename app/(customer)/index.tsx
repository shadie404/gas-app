import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Image, TouchableOpacity, Alert, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import MapViewComponent from '../../components/MapView';
import { MapPin, Package, Truck, Clock } from 'lucide-react-native';
import * as Location from 'expo-location';
import { GasType } from '../../types';

// Mock gas types data
const gasTypes: GasType[] = [
  {
    id: '1',
    name: 'Domestic LPG Cylinder',
    description: '14.2 kg cylinder for household use',
    price: 900,
    image: 'https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    available: true,
  },
  {
    id: '2',
    name: 'Commercial LPG Cylinder',
    description: '19 kg cylinder for commercial use',
    price: 1800,
    image: 'https://images.unsplash.com/photo-1585085474371-0238a9e6b29c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    available: true,
  },
  {
    id: '3',
    name: 'Small LPG Cylinder',
    description: '5 kg cylinder for portable use',
    price: 450,
    image: 'https://images.unsplash.com/photo-1611488006001-eb993d4d2ec4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80',
    available: true,
  },
];

export default function CustomerHomeScreen() {
  const { user } = useAuth();
  const router = useRouter();
  const [selectedGasType, setSelectedGasType] = useState<GasType | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [userLocation, setUserLocation] = useState<Location.LocationObject | null>(null);
  const [locationPermissionDenied, setLocationPermissionDenied] = useState(false);

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
      Alert.alert('Error', 'Failed to get your location. Please try again.');
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const placeOrder = () => {
    if (!selectedGasType) {
      Alert.alert('Error', 'Please select a gas type');
      return;
    }

    if (!userLocation && Platform.OS !== 'web') {
      requestLocationPermission();
      return;
    }

    // In a real app, this would make an API call to create an order
    Alert.alert(
      'Order Placed',
      `Your order for ${quantity} ${selectedGasType.name} has been placed successfully!`,
      [
        {
          text: 'View Orders',
          onPress: () => router.push('/(customer)/orders'),
        },
        {
          text: 'OK',
          style: 'cancel',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="LPG Gas Delivery"
        rightComponent={
          <TouchableOpacity onPress={() => router.push('/(customer)/profile')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
            </View>
          </TouchableOpacity>
        }
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Hello, {user?.name?.split(' ')[0] || 'User'}
          </Text>
          <Text style={styles.subtitleText}>
            What would you like to order today?
          </Text>
        </View>
        
        <View style={styles.locationSection}>
          <View style={styles.locationHeader}>
            <MapPin size={20} color="#3498db" />
            <Text style={styles.locationTitle}>Your Location</Text>
          </View>
          
          <TouchableOpacity
            style={styles.locationButton}
            onPress={requestLocationPermission}
          >
            <Text style={styles.locationText}>
              {userLocation
                ? 'Location captured successfully'
                : 'Tap to capture your location'}
            </Text>
          </TouchableOpacity>
          
          {userLocation && (
            <MapViewComponent
              customerLocation={{
                latitude: userLocation.coords.latitude,
                longitude: userLocation.coords.longitude,
              }}
              height={150}
            />
          )}
          
          {locationPermissionDenied && (
            <Text style={styles.locationError}>
              Location permission denied. Please enable location services to continue.
            </Text>
          )}
        </View>
        
        <View style={styles.gasTypesSection}>
          <Text style={styles.sectionTitle}>Available Gas Types</Text>
          
          {gasTypes.map((gasType) => (
            <TouchableOpacity
              key={gasType.id}
              onPress={() => setSelectedGasType(gasType)}
              activeOpacity={0.8}
            >
              <Card
                style={[
                  styles.gasTypeCard,
                  selectedGasType?.id === gasType.id && styles.selectedGasTypeCard,
                ]}
              >
                <View style={styles.gasTypeContent}>
                  <Image
                    source={{ uri: gasType.image }}
                    style={styles.gasTypeImage}
                  />
                  <View style={styles.gasTypeInfo}>
                    <Text style={styles.gasTypeName}>{gasType.name}</Text>
                    <Text style={styles.gasTypeDescription}>
                      {gasType.description}
                    </Text>
                    <Text style={styles.gasTypePrice}>₹{gasType.price.toFixed(2)}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
        
        {selectedGasType && (
          <View style={styles.orderSection}>
            <Text style={styles.sectionTitle}>Order Details</Text>
            
            <Card>
              <View style={styles.quantitySelector}>
                <Text style={styles.quantityLabel}>Quantity:</Text>
                <View style={styles.quantityControls}>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={decreaseQuantity}
                  >
                    <Text style={styles.quantityButtonText}>-</Text>
                  </TouchableOpacity>
                  <Text style={styles.quantityValue}>{quantity}</Text>
                  <TouchableOpacity
                    style={styles.quantityButton}
                    onPress={increaseQuantity}
                  >
                    <Text style={styles.quantityButtonText}>+</Text>
                  </TouchableOpacity>
                </View>
              </View>
              
              <View style={styles.orderSummary}>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Gas Type:</Text>
                  <Text style={styles.summaryValue}>{selectedGasType.name}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Price per unit:</Text>
                  <Text style={styles.summaryValue}>₹{selectedGasType.price.toFixed(2)}</Text>
                </View>
                <View style={styles.summaryRow}>
                  <Text style={styles.summaryLabel}>Quantity:</Text>
                  <Text style={styles.summaryValue}>{quantity}</Text>
                </View>
                <View style={styles.divider} />
                <View style={styles.summaryRow}>
                  <Text style={styles.totalLabel}>Total Amount:</Text>
                  <Text style={styles.totalValue}>
                    ₹{(selectedGasType.price * quantity).toFixed(2)}
                  </Text>
                </View>
              </View>
              
              <Button
                title="Place Order"
                onPress={placeOrder}
                style={styles.orderButton}
              />
            </Card>
          </View>
        )}
        
        <View style={styles.featuresSection}>
          <Text style={styles.sectionTitle}>Our Services</Text>
          
          <View style={styles.featuresGrid}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Truck size={24} color="#3498db" />
              </View>
              <Text style={styles.featureTitle}>Fast Delivery</Text>
              <Text style={styles.featureDescription}>
                Get your gas delivered within hours
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <MapPin size={24} color="#3498db" />
              </View>
              <Text style={styles.featureTitle}>Live Tracking</Text>
              <Text style={styles.featureDescription}>
                Track your order in real-time
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Package size={24} color="#3498db" />
              </View>
              <Text style={styles.featureTitle}>Quality Products</Text>
              <Text style={styles.featureDescription}>
                Certified and safe gas cylinders
              </Text>
            </View>
            
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Clock size={24} color="#3498db" />
              </View>
              <Text style={styles.featureTitle}>24/7 Support</Text>
              <Text style={styles.featureDescription}>
                Customer support available 24/7
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 32,
  },
  welcomeSection: {
    marginBottom: 24,
  },
  welcomeText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
  },
  subtitleText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginTop: 4,
  },
  locationSection: {
    marginBottom: 24,
  },
  locationHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginLeft: 8,
  },
  locationButton: {
    backgroundColor: '#f0f0f0',
    padding: 12,
    borderRadius: 8,
    marginBottom: 12,
  },
  locationText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  locationError: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#e74c3c',
    marginTop: 8,
  },
  gasTypesSection: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 16,
  },
  gasTypeCard: {
    marginBottom: 12,
    padding: 12,
  },
  selectedGasTypeCard: {
    borderWidth: 2,
    borderColor: '#3498db',
  },
  gasTypeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  gasTypeImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
  },
  gasTypeInfo: {
    flex: 1,
    marginLeft: 16,
  },
  gasTypeName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  gasTypeDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  gasTypePrice: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2ecc71',
  },
  orderSection: {
    marginBottom: 24,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  quantityLabel: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
  },
  quantityControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  quantityButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonText: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#333',
  },
  quantityValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
    minWidth: 24,
    textAlign: 'center',
  },
  orderSummary: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  summaryValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 8,
  },
  totalLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  totalValue: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    color: '#2ecc71',
  },
  orderButton: {
    marginTop: 8,
  },
  featuresSection: {
    marginBottom: 16,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  featureItem: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#ebf5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#666',
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#fff',
  },
});
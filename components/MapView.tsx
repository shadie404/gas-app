import React from 'react';
import { View, StyleSheet, Dimensions, Platform } from 'react-native';
import { MapPin } from 'lucide-react-native';

let MapView, Marker, PROVIDER_GOOGLE;
if (Platform.OS !== 'web') {
  ({ MapView, Marker, PROVIDER_GOOGLE } = require('react-native-maps'));
}

interface Location {
  latitude: number;
  longitude: number;
}

interface MapViewComponentProps {
  customerLocation?: Location;
  deliveryLocation?: Location;
  height?: number | string;
  showsUserLocation?: boolean;
  followsUserLocation?: boolean;
  zoomEnabled?: boolean;
  scrollEnabled?: boolean;
}

const MapViewComponent: React.FC<MapViewComponentProps> = ({
  customerLocation,
  deliveryLocation,
  height = 200,
  showsUserLocation = true,
  followsUserLocation = false,
  zoomEnabled = true,
  scrollEnabled = true,
}) => {
  // Default to Bangalore, India if no locations provided
  const initialRegion = {
    latitude: customerLocation?.latitude || 12.9716,
    longitude: customerLocation?.longitude || 77.5946,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  // On web, we'll show a placeholder instead of the actual map
  if (Platform.OS === 'web') {
    return (
      <View style={[styles.container, { height }]}>
        <View style={styles.webPlaceholder}>
          <MapPin size={32} color="#3498db" />
          <View style={styles.webPlaceholderText}>
            Map View (Available on mobile devices)
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={[styles.container, { height }]}>
      <MapView
        style={styles.map}
        provider={PROVIDER_GOOGLE}
        initialRegion={initialRegion}
        showsUserLocation={showsUserLocation}
        followsUserLocation={followsUserLocation}
        zoomEnabled={zoomEnabled}
        scrollEnabled={scrollEnabled}
      >
        {customerLocation && (
          <Marker
            coordinate={{
              latitude: customerLocation.latitude,
              longitude: customerLocation.longitude,
            }}
            title="Customer Location"
            pinColor="#e74c3c"
          />
        )}
        
        {deliveryLocation && (
          <Marker
            coordinate={{
              latitude: deliveryLocation.latitude,
              longitude: deliveryLocation.longitude,
            }}
            title="Delivery Person"
            pinColor="#3498db"
          />
        )}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    overflow: 'hidden',
    borderRadius: 12,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  webPlaceholder: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    borderStyle: 'dashed',
  },
  webPlaceholderText: {
    marginTop: 8,
    fontSize: 14,
    color: '#666',
  },
});

export default MapViewComponent;
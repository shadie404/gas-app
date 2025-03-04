import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, SafeAreaView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Button from '../components/Button';

export default function WelcomeScreen() {
  const { isAuthenticated, user, loading } = useAuth();

  useEffect(() => {
    if (isAuthenticated && user) {
      // Redirect based on user role
      if (user.role === 'admin') {
        router.replace('/(admin)');
      } else if (user.role === 'delivery') {
        router.replace('/(delivery)');
      } else {
        router.replace('/(customer)');
      }
    }
  }, [isAuthenticated, user]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.logoContainer}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1603664454146-50b9bb1e7afa?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=500&q=80' }}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>
        
        <Text style={styles.title}>LPG Gas Delivery</Text>
        <Text style={styles.subtitle}>
          Fast, reliable gas delivery at your doorstep
        </Text>
        
        <View style={styles.features}>
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Quick Delivery</Text>
            <Text style={styles.featureDescription}>
              Get your gas cylinders delivered within hours
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Real-time Tracking</Text>
            <Text style={styles.featureDescription}>
              Track your order in real-time with live updates
            </Text>
          </View>
          
          <View style={styles.featureItem}>
            <Text style={styles.featureTitle}>Secure Payments</Text>
            <Text style={styles.featureDescription}>
              Multiple payment options with secure transactions
            </Text>
          </View>
        </View>
        
        <View style={styles.buttonContainer}>
          <Button
            title="Login"
            onPress={() => router.push('/login')}
            style={styles.button}
          />
          
          <Button
            title="Register"
            variant="outline"
            onPress={() => router.push('/register')}
            style={styles.button}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 32,
  },
  features: {
    marginBottom: 32,
  },
  featureItem: {
    marginBottom: 16,
  },
  featureTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  buttonContainer: {
    marginTop: 16,
  },
  button: {
    marginBottom: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
  },
});
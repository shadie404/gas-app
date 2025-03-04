import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';
import Button from '../components/Button';
import Header from '../components/Header';
import { Mail, Lock } from 'lucide-react-native';

export default function LoginScreen() {
  const { login, error, loading, clearError } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const validateForm = () => {
    let isValid = true;
    clearError();
    
    // Validate email
    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid');
      isValid = false;
    } else {
      setEmailError('');
    }
    
    // Validate password
    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters');
      isValid = false;
    } else {
      setPasswordError('');
    }
    
    return isValid;
  };

  const handleLogin = async () => {
    if (validateForm()) {
      await login(email, password);
    }
  };

  // Demo login functions
  const loginAsAdmin = () => {
    setEmail('admin@example.com');
    setPassword('password');
  };

  const loginAsDelivery = () => {
    setEmail('delivery@example.com');
    setPassword('password');
  };

  const loginAsCustomer = () => {
    setEmail('customer@example.com');
    setPassword('password');
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Login" showBackButton />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>Welcome Back</Text>
            <Text style={styles.subtitle}>Sign in to continue</Text>
            
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}
            
            <Input
              label="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
              error={emailError}
              leftIcon={<Mail size={20} color="#666" />}
            />
            
            <Input
              label="Password"
              placeholder="Enter your password"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              error={passwordError}
              leftIcon={<Lock size={20} color="#666" />}
            />
            
            <Button
              title="Login"
              onPress={handleLogin}
              loading={loading}
              style={styles.loginButton}
            />
            
            <View style={styles.registerContainer}>
              <Text style={styles.registerText}>Don't have an account?</Text>
              <TouchableOpacity onPress={() => router.push('/register')}>
                <Text style={styles.registerLink}>Register</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.demoContainer}>
              <Text style={styles.demoTitle}>Demo Logins</Text>
              <View style={styles.demoButtons}>
                <TouchableOpacity style={styles.demoButton} onPress={loginAsAdmin}>
                  <Text style={styles.demoButtonText}>Admin</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.demoButton} onPress={loginAsDelivery}>
                  <Text style={styles.demoButtonText}>Delivery</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.demoButton} onPress={loginAsCustomer}>
                  <Text style={styles.demoButtonText}>Customer</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  content: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#333',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 32,
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  errorText: {
    fontFamily: 'Inter-Regular',
    color: '#e53935',
    fontSize: 14,
  },
  loginButton: {
    marginTop: 16,
  },
  registerContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 24,
  },
  registerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  registerLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#3498db',
    marginLeft: 4,
  },
  demoContainer: {
    marginTop: 48,
    alignItems: 'center',
  },
  demoTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#666',
    marginBottom: 12,
  },
  demoButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  demoButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  demoButtonText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
  },
});
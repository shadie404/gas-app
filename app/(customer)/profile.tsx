import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import Button from '../../components/Button';
import { User, Settings, CreditCard, MapPin, Bell, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';

export default function CustomerProfileScreen() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          onPress: logout,
          style: 'destructive',
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Profile" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'U'}</Text>
            </View>
          </View>
          
          <Text style={styles.userName}>{user?.name || 'User'}</Text>
          <Text style={styles.userEmail}>{user?.email || 'user@example.com'}</Text>
          <Text style={styles.userPhone}>{user?.phone || '+1234567890'}</Text>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Account Settings</Text>
          
          <Card>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <User size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Edit Profile</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Settings size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Account Settings</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <CreditCard size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Payment Methods</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <MapPin size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Saved Addresses</Text>
            </TouchableOpacity>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Preferences</Text>
          
          <Card>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Bell size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Notifications</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <Settings size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>App Settings</Text>
            </TouchableOpacity>
          </Card>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Support</Text>
          
          <Card>
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <HelpCircle size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>Help & Support</Text>
            </TouchableOpacity>
            
            <View style={styles.divider} />
            
            <TouchableOpacity style={styles.menuItem}>
              <View style={styles.menuIconContainer}>
                <HelpCircle size={20} color="#3498db" />
              </View>
              <Text style={styles.menuItemText}>FAQs</Text>
            </TouchableOpacity>
          </Card>
        </View>
        
        <Button
          title="Logout"
          variant="danger"
          onPress={handleLogout}
          style={styles.logoutButton}
          leftIcon={<LogOut size={20} color="#fff" />}
        />
        
        <Text style={styles.versionText}>Version 1.0.0</Text>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontFamily: 'Poppins-Bold',
    fontSize: 40,
    color: '#fff',
  },
  userName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    color: '#333',
    marginBottom: 4,
  },
  userEmail: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
    marginBottom: 4,
  },
  userPhone: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#666',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  menuIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#ebf5ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuItemText: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    color: '#333',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  logoutButton: {
    marginTop: 8,
    marginBottom: 24,
  },
  versionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#999',
    textAlign: 'center',
  },
});
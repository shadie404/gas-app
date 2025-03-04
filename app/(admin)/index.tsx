import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../../context/AuthContext';
import Header from '../../components/Header';
import Card from '../../components/Card';
import { ShoppingCart, Users, Truck, DollarSign, TrendingUp, Calendar } from 'lucide-react-native';

export default function AdminDashboardScreen() {
  const { user } = useAuth();
  const router = useRouter();

  // Mock statistics data
  const stats = {
    totalOrders: 156,
    pendingOrders: 12,
    totalCustomers: 89,
    totalDeliveryPersons: 8,
    totalRevenue: 142500,
    ordersToday: 18,
  };

  // Mock recent orders
  const recentOrders = [
    {
      id: '1005',
      customer: 'Rahul Sharma',
      date: '2023-06-22',
      amount: 900,
      status: 'pending',
    },
    {
      id: '1004',
      customer: 'Priya Patel',
      date: '2023-06-22',
      amount: 1800,
      status: 'assigned',
    },
    {
      id: '1003',
      customer: 'Amit Kumar',
      date: '2023-06-21',
      amount: 1350,
      status: 'delivered',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <Header
        title="Admin Dashboard"
        rightComponent={
          <TouchableOpacity onPress={() => router.push('/(admin)/settings')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user?.name?.charAt(0) || 'A'}</Text>
            </View>
          </TouchableOpacity>
        }
      />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.welcomeSection}>
          <Text style={styles.welcomeText}>
            Welcome back, {user?.name?.split(' ')[0] || 'Admin'}
          </Text>
          <Text style={styles.dateText}>
            {new Date().toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>
        </View>
        
        <View style={styles.statsGrid}>
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => router.push('/(admin)/orders')}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#ebf5ff' }]}>
              <ShoppingCart size={24} color="#3498db" />
            </View>
            <Text style={styles.statValue}>{stats.totalOrders}</Text>
            <Text style={styles.statLabel}>Total Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => router.push('/(admin)/orders')}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#fff4de' }]}>
              <Calendar size={24} color="#f39c12" />
            </View>
            <Text style={styles.statValue}>{stats.pendingOrders}</Text>
            <Text style={styles.statLabel}>Pending Orders</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => router.push('/(admin)/users')}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#e8f5e9' }]}>
              <Users size={24} color="#2ecc71" />
            </View>
            <Text style={styles.statValue}>{stats.totalCustomers}</Text>
            <Text style={styles.statLabel}>Customers</Text>
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.statCard}
            onPress={() => router.push('/(admin)/users')}
          >
            <View style={[styles.statIconContainer, { backgroundColor: '#f3e5f5' }]}>
              <Truck size={24} color="#9b59b6" />
            </View>
            <Text style={styles.statValue}>{stats.totalDeliveryPersons}</Text>
            <Text style={styles.statLabel}>Delivery Staff</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.revenueSection}>
          <Card>
            <View style={styles.revenueHeader}>
              <View style={styles.revenueIconContainer}>
                <DollarSign size={24} color="#2ecc71" />
              </View>
              <View>
                <Text style={styles.revenueTitle}>Total Revenue</Text>
                <Text style={styles.revenueValue}>₹{stats.totalRevenue.toLocaleString()}</Text>
              </View>
            </View>
            
            <View style={styles.divider} />
            
            <View style={styles.revenueStats}>
              <View style={styles.revenueStat}>
                <View style={styles.revenueStatHeader}>
                  <TrendingUp size={16} color="#2ecc71" />
                  <Text style={styles.revenueStatTitle}>Today's Orders</Text>
                </View>
                <Text style={styles.revenueStatValue}>{stats.ordersToday}</Text>
              </View>
              
              <View style={styles.revenueStat}>
                <View style={styles.revenueStatHeader}>
                  <DollarSign size={16} color="#2ecc71" />
                  <Text style={styles.revenueStatTitle}>Today's Revenue</Text>
                </View>
                <Text style={styles.revenueStatValue}>₹{(stats.ordersToday * 900).toLocaleString()}</Text>
              </View>
            </View>
          </Card>
        </View>
        
        <View style={styles.recentOrdersSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent Orders</Text>
            <TouchableOpacity onPress={() => router.push('/(admin)/orders')}>
              <Text style={styles.sectionLink}>View All</Text>
            </TouchableOpacity>
          </View>
          
          {recentOrders.map((order) => (
            <TouchableOpacity
              key={order.id}
              onPress={() => console.log('Order pressed:', order.id)}
            >
              <Card style={styles.orderCard}>
                <View style={styles.orderHeader}>
                  <Text style={styles.orderId}>Order #{order.id}</Text>
                  <View
                    style={[
                      styles.statusBadge,
                      {
                        backgroundColor:
                          order.status === 'pending'
                            ? '#fff4de'
                            : order.status === 'assigned'
                            ? '#ebf5ff'
                            : '#e8f5e9',
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.statusText,
                        {
                          color:
                            order.status === 'pending'
                              ? '#f39c12'
                              : order.status === 'assigned'
                              ? '#3498db'
                              : '#2ecc71',
                        },
                      ]}
                    >
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </Text>
                  </View>
                </View>
                
                <View style={styles.orderDetails}>
                  <View style={styles.orderDetail}>
                    <Text style={styles.orderDetailLabel}>Customer:</Text>
                    <Text style={styles.orderDetailValue}>{order.customer}</Text>
                  </View>
                  
                  <View style={styles.orderDetail}>
                    <Text style={styles.orderDetailLabel}>Date:</Text>
                    <Text style={styles.orderDetailValue}>{order.date}</Text>
                  </View>
                  
                  <View style={styles.orderDetail}>
                    <Text style={styles.orderDetailLabel}>Amount:</Text>
                    <Text style={styles.orderDetailValue}>₹{order.amount.toFixed(2)}</Text>
                  </View>
                </View>
              </Card>
            </TouchableOpacity>
          ))}
        </View>
        
        <View style={styles.quickActionsSection}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(admin)/orders')}
            >
              <ShoppingCart size={24} color="#3498db" />
              <Text style={styles.quickActionText}>Manage Orders</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(admin)/users')}
            >
              <Users size={24} color="#3498db" />
              <Text style={styles.quickActionText}>Manage Users</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => console.log('Reports')}
            >
              <TrendingUp size={24} color="#3498db" />
              <Text style={styles.quickActionText}>View Reports</Text>
            </TouchableOpacity>
            
            <TouchableOpacity
              style={styles.quickActionCard}
              onPress={() => router.push('/(admin)/settings')}
            >
              <Settings size={24} color="#3498db" />
              <Text style={styles.quickActionText}>Settings</Text>
            </TouchableOpacity>
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
  dateText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  statCard: {
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
  statIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#333',
    marginBottom: 4,
  },
  statLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  revenueSection: {
    marginBottom: 24,
  },
  revenueHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  revenueIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#e8f5e9',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  revenueTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#666',
  },
  revenueValue: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#2ecc71',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginBottom: 16,
  },
  revenueStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  revenueStat: {
    flex: 1,
  },
  revenueStatHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  revenueStatTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
  },
  revenueStatValue: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  recentOrdersSection: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
  },
  sectionLink: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    color: '#3498db',
  },
  orderCard: {
    marginBottom: 12,
  },
  orderHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  orderId: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusText: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
  },
  orderDetails: {
    marginTop: 8,
  },
  orderDetail: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  orderDetailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    width: 80,
  },
  orderDetailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    flex: 1,
  },
  quickActionsSection: {
    marginBottom: 16,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  quickActionText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
    marginTop: 8,
    textAlign: 'center',
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
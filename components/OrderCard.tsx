import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MapPin, Package, Clock, Truck, CircleCheck as CheckCircle } from 'lucide-react-native';
import { Order } from '../types';

interface OrderCardProps {
  order: Order;
  onPress?: () => void;
  showCustomerDetails?: boolean;
  showDeliveryDetails?: boolean;
}

const OrderCard: React.FC<OrderCardProps> = ({
  order,
  onPress,
  showCustomerDetails = true,
  showDeliveryDetails = true,
}) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return '#f39c12';
      case 'assigned':
        return '#3498db';
      case 'in_progress':
        return '#9b59b6';
      case 'delivered':
        return '#2ecc71';
      case 'cancelled':
        return '#e74c3c';
      default:
        return '#7f8c8d';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'assigned':
        return 'Assigned';
      case 'in_progress':
        return 'In Progress';
      case 'delivered':
        return 'Delivered';
      case 'cancelled':
        return 'Cancelled';
      default:
        return 'Unknown';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock size={16} color={getStatusColor(status)} />;
      case 'assigned':
        return <Truck size={16} color={getStatusColor(status)} />;
      case 'in_progress':
        return <Truck size={16} color={getStatusColor(status)} />;
      case 'delivered':
        return <CheckCircle size={16} color={getStatusColor(status)} />;
      case 'cancelled':
        return <Clock size={16} color={getStatusColor(status)} />;
      default:
        return <Clock size={16} color={getStatusColor(status)} />;
    }
  };

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.7 : 1}
    >
      <View style={styles.header}>
        <Text style={styles.orderId}>Order #{order.id}</Text>
        <View style={styles.statusContainer}>
          {getStatusIcon(order.status)}
          <Text
            style={[
              styles.statusText,
              { color: getStatusColor(order.status) },
            ]}
          >
            {getStatusText(order.status)}
          </Text>
        </View>
      </View>

      <View style={styles.content}>
        <View style={styles.row}>
          <Package size={18} color="#555" />
          <Text style={styles.infoText}>
            {order.quantity} x {order.gasType}
          </Text>
        </View>

        <View style={styles.row}>
          <MapPin size={18} color="#555" />
          <Text style={styles.infoText} numberOfLines={2}>
            {order.address}
          </Text>
        </View>

        {showCustomerDetails && (
          <View style={styles.row}>
            <Text style={styles.label}>Customer:</Text>
            <Text style={styles.value}>
              {order.customerName} ({order.customerPhone})
            </Text>
          </View>
        )}

        {showDeliveryDetails && order.deliveryPersonName && (
          <View style={styles.row}>
            <Text style={styles.label}>Delivery:</Text>
            <Text style={styles.value}>{order.deliveryPersonName}</Text>
          </View>
        )}

        {order.estimatedDeliveryTime && (
          <View style={styles.row}>
            <Clock size={18} color="#555" />
            <Text style={styles.infoText}>
              Est. Delivery: {order.estimatedDeliveryTime}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <Text style={styles.date}>
          {new Date(order.createdAt).toLocaleDateString()}
        </Text>
        <Text style={styles.price}>₹{order.totalAmount.toFixed(2)}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderId: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 4,
  },
  content: {
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: '#555',
    marginLeft: 8,
    flex: 1,
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginRight: 4,
  },
  value: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  date: {
    fontSize: 12,
    color: '#888',
  },
  price: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2ecc71',
  },
});

export default OrderCard;
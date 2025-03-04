{"code":"rate-react-native';
'tlruyd"s"',ytp l"n>any  orde f =s    
a:
     
e<il Die   en {  \ __ DoiUp   .e i  __\  U g r} y  Ved Mk3epa< erlx:fCn  ti'S4 ,}e jupaeSr    fr tppmr:1h n
mfihbR ace'e."s"{ 9air{
L  r:H  "iteumfs"e}   ex 0
t" IeSri from 'lucide-react-native';
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

// Mock delivery person location
const deliveryPersonLocation = {
  latitude: 12.9616,
  longitude: 77.5846,
};

export default function TrackOrderScreen() {
  const [order] = useState<Order | null>(activeOrder);

  if (!order) {
    return (
      <SafeAreaView style={styles.container}>
        <Header title="Track Order" />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyTitle}>No Active Orders</Text>
          <Text style={styles.emptyText}>
            You don't have any active orders to track at the moment.
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusStep = (status: string) => {
    switch (status) {
      case 'pending':
        return 0;
      case 'assigned':
        return 1;
      case 'in_progress':
        return 2;
      case 'delivered':
        return 3;
      default:
        return 0;
    }
  };

  const statusStep = getStatusStep(order.status);

  return (
    <SafeAreaView style={styles.container}>
      <Header title="Track Order" />
      
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Card style={styles.orderCard}>
          <Text style={styles.orderTitle}>Order #{order.id}</Text>
          <Text style={styles.orderDate}>
            {new Date(order.createdAt).toLocaleDateString()} at{' '}
            {new Date(order.createdAt).toLocaleTimeString()}
          </Text>
          
          <View style={styles.orderDetails}>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Gas Type:</Text>
              <Text style={styles.detailValue}>{order.gasType}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Quantity:</Text>
              <Text style={styles.detailValue}>{order.quantity}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Total Amount:</Text>
              <Text style={styles.detailValue}>₹{order.totalAmount.toFixed(2)}</Text>
            </View>
            <View style={styles.detailRow}>
              <Text style={styles.detailLabel}>Payment Method:</Text>
              <Text style={styles.detailValue}>
                {order.paymentMethod === 'cash' ? 'Cash on Delivery' : 'Online Payment'}
              </Text>
            </View>
          </View>
        </Card>
        
        <View style={styles.mapContainer}>
          <Text style={styles.sectionTitle}>Live Tracking</Text>
          <MapViewComponent
            customerLocation={order.location}
            deliveryLocation={deliveryPersonLocation}
            height={250}
          />
        </View>
        
        <Card style={styles.deliveryCard}>
          <Text style={styles.sectionTitle}>Delivery Status</Text>
          
          <View style={styles.statusTimeline}>
            <View style={styles.timelineContainer}>
              <View
                style={[
                  styles.timelineBar,
                  statusStep >= 1 && styles.timelineBarActive,
                ]}
              />
              <View
                style={[
                  styles.timelineBar,
                  statusStep >= 2 && styles.timelineBarActive,
                ]}
              />
              <View
                style={[
                  styles.timelineBar,
                  statusStep >= 3 && styles.timelineBarActive,
                ]}
              />
            </View>
            
            <View style={styles.timelineSteps}>
              <View style={styles.timelineStep}>
                <View
                  style={[
                    styles.stepCircle,
                    statusStep >= 0 && styles.stepCircleActive,
                  ]}
                >
                  <Clock
                    size={16}
                    color={statusStep >= 0 ? '#fff' : '#ccc'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepText,
                    statusStep >= 0 && styles.stepTextActive,
                  ]}
                >
                  Order Placed
                </Text>
              </View>
              
              <View style={styles.timelineStep}>
                <View
                  style={[
                    styles.stepCircle,
                    statusStep >= 1 && styles.stepCircleActive,
                  ]}
                >
                  <Truck
                    size={16}
                    color={statusStep >= 1 ? '#fff' : '#ccc'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepText,
                    statusStep >= 1 && styles.stepTextActive,
                  ]}
                >
                  Assigned
                </Text>
              </View>
              
              <View style={styles.timelineStep}>
                <View
                  style={[
                    styles.stepCircle,
                    statusStep >= 2 && styles.stepCircleActive,
                  ]}
                >
                  <MapPin
                    size={16}
                    color={statusStep >= 2 ? '#fff' : '#ccc'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepText,
                    statusStep >= 2 && styles.stepTextActive,
                  ]}
                >
                  On the Way
                </Text>
              </View>
              
              <View style={styles.timelineStep}>
                <View
                  style={[
                    styles.stepCircle,
                    statusStep >= 3 && styles.stepCircleActive,
                  ]}
                >
                  <CheckCircle
                    size={16}
                    color={statusStep >= 3 ? '#fff' : '#ccc'}
                  />
                </View>
                 <View style={styles.timelineStep}>
                <View
                  style={[
                    styles.stepCircle,
                    statusStep >= 3 && styles.stepCircleActive,
                  ]}
                >
                  <CheckCircle
                    size={16}
                    color={statusStep >= 3 ? '#fff' : '#ccc'}
                  />
                </View>
                <Text
                  style={[
                    styles.stepText,
                    statusStep >= 3 && styles.stepTextActive,
                  ]}
                >
                  Delivered
                </Text>
              </View>
            </View>
          </View>
          
          {order.estimatedDeliveryTime && (
            <View style={styles.estimatedTime}>
              <Clock size={18} color="#3498db" />
              <Text style={styles.estimatedTimeText}>
                Estimated delivery by{' '}
                {new Date(order.estimatedDeliveryTime).toLocaleTimeString()}
              </Text>
            </View>
          )}
        </Card>
        
        {order.deliveryPersonName && (
          <Card style={styles.deliveryPersonCard}>
            <Text style={styles.sectionTitle}>Delivery Person</Text>
            
            <View style={styles.deliveryPersonInfo}>
              <View style={styles.deliveryPersonAvatar}>
                <Text style={styles.deliveryPersonAvatarText}>
                  {order.deliveryPersonName.charAt(0)}
                </Text>
              </View>
              
              <View style={styles.deliveryPersonDetails}>
                <Text style={styles.deliveryPersonName}>
                  {order.deliveryPersonName}
                </Text>
                <Text style={styles.deliveryPersonId}>
                  ID: {order.deliveryPersonId}
                </Text>
              </View>
              
              <TouchableOpacity style={styles.callButton}>
                <Phone size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </Card>
        )}
        
        <View style={styles.addressContainer}>
          <Text style={styles.sectionTitle}>Delivery Address</Text>
          
          <Card>
            <View style={styles.addressContent}>
              <MapPin size={20} color="#3498db" />
              <Text style={styles.addressText}>{order.address}</Text>
            </View>
          </Card>
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
  orderCard: {
    marginBottom: 16,
  },
  orderTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#333',
    marginBottom: 4,
  },
  orderDate: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
    marginBottom: 16,
  },
  orderDetails: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  detailLabel: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  detailValue: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#333',
  },
  mapContainer: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 12,
  },
  deliveryCard: {
    marginBottom: 16,
  },
  statusTimeline: {
    marginTop: 8,
    marginBottom: 16,
  },
  timelineContainer: {
    position: 'absolute',
    left: 24,
    top: 24,
    bottom: 0,
    width: 2,
    height: 120,
  },
  timelineBar: {
    flex: 1,
    width: 2,
    backgroundColor: '#ddd',
  },
  timelineBarActive: {
    backgroundColor: '#3498db',
  },
  timelineSteps: {
    marginLeft: 16,
  },
  timelineStep: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
  },
  stepCircle: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ddd',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepCircleActive: {
    backgroundColor: '#3498db',
  },
  stepText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  stepTextActive: {
    fontFamily: 'Inter-Medium',
    color: '#333',
  },
  estimatedTime: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ebf5ff',
    padding: 12,
    borderRadius: 8,
  },
  estimatedTimeText: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#3498db',
    marginLeft: 8,
  },
  deliveryPersonCard: {
    marginBottom: 16,
  },
  deliveryPersonInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deliveryPersonAvatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  deliveryPersonAvatarText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 20,
    color: '#fff',
  },
  deliveryPersonDetails: {
    flex: 1,
    marginLeft: 16,
  },
  deliveryPersonName: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  deliveryPersonId: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#666',
  },
  callButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#2ecc71',
    justifyContent: 'center',
    alignItems: 'center',
  },
  addressContainer: {
    marginBottom: 16,
  },
  addressContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#333',
    marginLeft: 12,
    flex: 1,
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
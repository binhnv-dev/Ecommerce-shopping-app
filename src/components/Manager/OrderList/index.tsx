import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { formatDate } from '../../../helpers/date';

interface Product {
  product: {
    imageUrl: string;
  };
  status: string;
}

interface Order {
  _id: string;
  products: Product[];
  created: string;
  totalWithTax: number;
}

interface OrderListProps {
  orders: Order[];
}

const OrderList: React.FC<OrderListProps> = ({ orders }) => {
  const navigation = useNavigation<any>();

  const renderFirstItem = (order: Order) => {
    if (order.products) {
      const product = order.products[0].product;
      return (
        <Image
          style={styles.itemImage}
          source={{
            uri: product && product.imageUrl ? product.imageUrl : '/images/placeholder-image.png',
          }}
        />
      );
    } else {
      return <Image style={styles.itemImage} source={{ uri: '/images/placeholder-image.png' }} />;
    }
  };

  return (
    <ScrollView style={styles.orderList}>
      {orders.map((order, index) => (
        <TouchableOpacity
          key={index}
          style={styles.orderBox}
          onPress={() => navigation.navigate('OrderDetails', { orderId: order._id })}
        >
          <View style={styles.orderContainer}>
            <View style={styles.orderFirstItem}>{renderFirstItem(order)}</View>
            <View style={styles.orderDetailsContainer}>
              <View style={styles.orderDetails}>
                <View style={styles.orderDetailItem}>
                  <Text>Status</Text>
                  {order.products ? (
                    <Text style={styles.orderStatus}>{` ${order.products[0].status}`}</Text>
                  ) : (
                    <Text style={styles.orderStatus}>{` Unavailable`}</Text>
                  )}
                </View>
                <View style={styles.orderDetailItem}>
                  <Text>Order #</Text>
                  <Text>{` ${order._id}`}</Text>
                </View>
                <View style={styles.orderDetailItem}>
                  <Text>Ordered on</Text>
                  <Text>{` ${formatDate(order.created)}`}</Text>
                </View>
                <View style={styles.orderDetailItem}>
                  <Text>Order Total</Text>
                  <Text>{` $${order.totalWithTax}`}</Text>
                </View>
              </View>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderList: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  orderBox: {
    marginBottom: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  orderContainer: {
    flexDirection: 'row',
    padding: 16,
  },
  orderFirstItem: {
    marginRight: 16,
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  orderDetailsContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  orderDetails: {
    flex: 1,
  },
  orderDetailItem: {
    marginBottom: 8,
  },
  orderStatus: {
    fontWeight: 'bold',
  },
});

export default OrderList;
import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { formatDate } from '../../../helpers/date';
import CustomButton from '../../Common/Button';

interface OrderMetaProps {
  order: any;
  cancelOrder: () => void;
  onBack: () => void;
}

const OrderMeta: React.FC<OrderMetaProps> = ({ order, cancelOrder, onBack }) => {
  const renderMetaAction = () => {
    const isNotDelivered = order.products.filter((i: any) => i.status === 'Delivered').length < 1;

    if (isNotDelivered) {
      return (
        <Button
          title={order.isPaid ? "You can't cancel this order!" : 'Cancel Order'}
          disabled={order.isPaid}
          onPress={cancelOrder}
          color={'red'}
        />
      );
    }
  };

  return (
    <View style={styles.orderMeta}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Order Details</Text>
        <Button
          title="Back to orders"
          onPress={onBack}
          color="#007bff"
          accessibilityLabel="Back to orders"
        />
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.label}>Order ID</Text>
          <Text style={styles.value}>{order._id}</Text>
        </View>
        <View style={styles.col}>
          <Text style={styles.label}>Order Date</Text>
          <Text style={styles.value}>{formatDate(order.created)}</Text>
        </View>
      </View>
      <View style={styles.actionContainer}>{renderMetaAction()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderMeta: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    padding: 8,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  row: {
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  col: {
    
    flex: 1,
  },
  label: {
    fontSize: 16,
    color: '#888',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  actionContainer: {
    alignItems: 'flex-end',
  },
});

export default OrderMeta;
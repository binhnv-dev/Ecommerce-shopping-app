import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface OrderSummaryProps {
  order: {
    total: number;
    totalTax: number;
    totalWithTax: number;
  };
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ order }) => {
  return (
    <View style={styles.orderSummary}>
      <Text style={styles.title}>Order Summary</Text>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Subtotal</Text>
        <Text style={styles.summaryValue}>${order.total}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Est. Sales Tax</Text>
        <Text style={styles.summaryValue}>${order.totalTax}</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Shipping & Handling</Text>
        <Text style={styles.summaryValue}>$0</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Total</Text>
        <Text style={styles.summaryValue}>${order.totalWithTax}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  orderSummary: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#888',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#ddd',
    marginVertical: 16,
  },
});

export default OrderSummary;
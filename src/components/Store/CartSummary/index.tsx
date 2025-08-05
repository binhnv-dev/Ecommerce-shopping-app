import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CartSummaryProps {
  cartTotal: number;
}

const CartSummary: React.FC<CartSummaryProps> = ({ cartTotal }) => {
  return (
    <View style={styles.cartSummary}>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Free Shipping</Text>
        <Text style={styles.summaryValue}>$0</Text>
      </View>
      <View style={styles.summaryItem}>
        <Text style={styles.summaryLabel}>Total</Text>
        <Text style={styles.summaryValue}>${cartTotal}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartSummary: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 16,
    color: '#888',
  },
  summaryValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CartSummary;
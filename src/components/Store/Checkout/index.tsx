import React from 'react';
import { View, StyleSheet } from 'react-native';

import Button from '../../Common/Button';

interface CheckoutProps {
  authenticated: boolean;
  handleShopping: () => void;
  handleCheckout: () => void;
  placeOrder: () => void;
}

const Checkout: React.FC<CheckoutProps> = ({
  authenticated,
  handleShopping,
  handleCheckout,
  placeOrder,
}) => {
  return (
    <View style={styles.easyCheckout}>
      <View style={styles.checkoutActions}>
        <Button
          variant='primary'
          text='Continue shopping'
          onClick={handleShopping}
          style={{ width: '50%'}}
        />
        {authenticated ? (
          <Button
            variant='primary'
            text='Place Order'
            onClick={placeOrder}
            style={{ width: '50%'}}
          />
        ) : (
          <Button
            variant='primary'
            text='Proceed To Checkout'
            onClick={handleCheckout}
            style={{ width: '50%'}}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  easyCheckout: {
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  checkoutActions: {
    display: 'flex',
    gap: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default Checkout;
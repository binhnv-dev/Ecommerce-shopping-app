import React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import actions from '../../actions';

import CartList from '../../components/Store/CartList';
import CartSummary from '../../components/Store/CartSummary';
import Checkout from '../../components/Store/Checkout';
import { BagIcon, CloseIcon } from '../../components/Common/Icon';
import Button from '../../components/Common/Button';

interface CartProps {
  isCartOpen: boolean;
  cartItems: any[];
  cartTotal: number;
  toggleCart: () => void;
  handleShopping: () => void;
  handleCheckout: () => void;
  handleRemoveFromCart: (product: any) => void;
  placeOrder: () => void;
  authenticated: boolean;
}

class Cart extends React.PureComponent<CartProps> {
  render() {
    const {
      isCartOpen,
      cartItems,
      cartTotal,
      toggleCart,
      handleShopping,
      handleCheckout,
      handleRemoveFromCart,
      placeOrder,
      authenticated
    } = this.props;

    return (
      <View style={styles.cart}>
        {cartItems.length > 0 ? (
          <ScrollView style={styles.cartBody}>
            <CartList
              toggleCart={toggleCart}
              cartItems={cartItems}
              handleRemoveFromCart={handleRemoveFromCart}
            />
          </ScrollView>
        ) : (
          <View style={styles.emptyCart}>
            <BagIcon width={60} height={60} />
            <Text style={styles.emptyCartText}>Your shopping cart is empty</Text>
          </View>
        )}
        {cartItems.length > 0 && (
          <View style={styles.cartCheckout}>
            <CartSummary cartTotal={cartTotal} />
            <Checkout
              handleShopping={handleShopping}
              handleCheckout={handleCheckout}
              placeOrder={placeOrder}
              authenticated={authenticated}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cart: {
    flex: 1,
    padding: 10,
    paddingTop: 16,
    backgroundColor: '#f5f5f5',
  },
  cartBody: {
    flex: 1,
  },
  emptyCart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyCartText: {
    marginTop: 8,
    fontSize: 16,
    color: '#888',
  },
  cartCheckout: {
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ddd',
  },
});

const mapStateToProps = (state: any) => {
  return {
    isCartOpen: state.navigation.isCartOpen,
    cartItems: state.cart.cartItems,
    cartTotal: state.cart.cartTotal,
    authenticated: state.authentication.authenticated
  };
};

export default connect(mapStateToProps, actions)(Cart);
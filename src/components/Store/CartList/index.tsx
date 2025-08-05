import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Button from '../../Common/Button';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface CartListProps {
  cartItems: any[];
  handleRemoveFromCart: (item: any) => void;
  toggleCart: () => void;
}

type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Product'
>;

const CartList: React.FC<CartListProps> = (props) => {
  const { cartItems, handleRemoveFromCart, toggleCart } = props;
  const navigation = useNavigation<ProductScreenNavigationProp>();

  const handleProductClick = (slug: string) => {
    toggleCart();
    navigation.navigate('Product', { slug });
  };

  return (
    <View style={styles.cartList}>
      {cartItems.map((item, index) => (
        <View key={index} style={styles.itemBox}>
          <View style={styles.itemDetails}>
            <View style={styles.row}>
              <View style={styles.imageContainer}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: item.imageUrl
                      ? item.imageUrl
                      : 'https://via.placeholder.com/150',
                  }}
                />
              </View>
              <TouchableOpacity
                style={styles.itemLink}
                onPress={() => handleProductClick(item.slug)}
              >
                <Text style={styles.itemName}>{item.name}</Text>
              </TouchableOpacity>
              <Button
                borderless
                variant='empty'
                ariaLabel={`remove ${item.name} from cart`}
                icon={<Text style={styles.iconTrash}>🗑️</Text>}
                onClick={() => handleRemoveFromCart(item)}
              />
            </View>
            <View style={styles.row}>
              <Text style={styles.itemLabel}>Price</Text>
              <Text style={styles.value}>{`$${item.totalPrice}`}</Text>
            </View>
            <View style={styles.row}>
              <Text style={styles.itemLabel}>Quantity</Text>
              <Text style={styles.value}>{item.quantity}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  cartList: {
    flex: 1,
  },
  itemBox: {
    marginBottom: 10,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemDetails: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  imageContainer: {
    marginRight: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  itemLink: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  iconTrash: {
    fontSize: 20,
    color: '#ff0000',
  },
  itemLabel: {
    flex: 1,
    fontSize: 14,
    color: '#888',
  },
  value: {
    fontSize: 14,
    fontWeight: 'bold',
  },
});

export default CartList;
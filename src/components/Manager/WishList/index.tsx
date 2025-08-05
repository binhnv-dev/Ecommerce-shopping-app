import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { formatDate } from '../../../helpers/date';
import Button from '../../Common/Button';
import { XIcon } from '../../Common/Icon';
import { navigate } from '../../../helpers/navigation';

interface Product {
  _id: string;
  name: string;
  price: number;
  slug: string;
  imageUrl?: string;
}

interface WishlistItem {
  product: Product;
  isLiked: boolean;
  created: string;
}

interface WishListProps {
  wishlist: WishlistItem[];
  updateWishlist: (e: any) => void;
}

const WishList: React.FC<WishListProps> = ({ wishlist, updateWishlist }) => {
  const getProductImage = (item: WishlistItem) => {
    if (item.product) {
      const product = item.product;
      return (
        <View style={styles.imageContainer}>
          <Image
            style={styles.itemImage}
            source={{
              uri: product.imageUrl ? product.imageUrl : '/images/placeholder-image.png',
            }}
          />
        </View>
      );
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {wishlist.map((item, index) => (
        <View key={index} style={styles.wishlistBox}>
          <TouchableOpacity
            onPress={() => {
              navigate('ProductDetail', { slug: item.product.slug });
            }}
            style={styles.productLink}
          >
            {getProductImage(item)}
            <View style={styles.productInfo}>
              <Text style={styles.productName}>{item.product.name}</Text>
              <Text style={styles.price}>${item.product.price}</Text>
              <Text style={styles.date}>{`Wishlist Added on ${formatDate(item.created)}`}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.removeWishlistBox}>
            <Button
              borderless
              variant="danger"
              icon={<XIcon width={15} />}
              onClick={() => {
                updateWishlist({
                  productId: item.product._id,
                  isLiked: !item.isLiked,
                });
              }}
            />
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  wishlistBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  imageContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  productLink: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  productInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    fontSize: 14,
    color: '#888',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
  },
  removeWishlistBox: {
    marginLeft: 10,
  },
});

export default WishList;
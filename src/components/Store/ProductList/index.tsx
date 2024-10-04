import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import AddToWishList from '../AddToWishList';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';

interface Product {
  slug: string;
  imageUrl: string;
  name: string;
  brand?: {
    name: string;
  };
  description: string;
  price: number;
  totalReviews: number;
  averageRating: number;
  sku: string;
  _id: string;
  isLiked: boolean;
}

interface ProductListProps {
  products: Product[];
  updateWishlist: (productId: string) => void;
  authenticated: boolean;
}

type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Product'
>;

const ProductList: React.FC<ProductListProps> = ({ products, updateWishlist, authenticated }) => {
  const navigation = useNavigation<ProductScreenNavigationProp>();
  const renderItem = ({ item: product }: { item: Product }) => (
    <View style={styles.productContainer}>
      <View style={styles.itemBox}>
        <View style={styles.addWishlistBox}>
          <AddToWishList
            product={product}
            updateWishlist={updateWishlist}
            authenticated={authenticated}
          />
        </View>

        <TouchableOpacity
          style={styles.itemLink}
          onPress={() => navigation.navigate('Product', { slug: product.slug } )}
        >
          <View style={styles.itemImageContainer}>
            <View style={styles.itemImageBox}>
              <Image
                style={styles.itemImage}
                source={{
                  uri: product.imageUrl ? product.imageUrl : 'https://via.placeholder.com/150',
                }}
              />
            </View>
          </View>
          <View style={styles.itemBody}>
            <View style={styles.itemDetails}>
              <Text style={styles.itemName}>{product.name}</Text>
              {product.brand && Object.keys(product.brand).length > 0 && (
                <Text style={styles.by}>
                  By <Text style={styles.brandName}>{product.brand.name}</Text>
                </Text>
              )}
              <Text style={styles.itemDesc}>{product.description}</Text>
            </View>
          </View>
          <View style={styles.itemFooter}>
            <Text style={styles.price}>${product.price}</Text>
            {product.totalReviews > 0 && (
              <Text style={styles.reviews}>
                <Text style={styles.rating}>{parseFloat(product.averageRating.toString()).toFixed(1)}</Text>
                <Text style={styles.star}>★</Text>
              </Text>
            )}
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <FlatList
      data={products}
      renderItem={renderItem}
      keyExtractor={(item) => item._id}
      contentContainerStyle={styles.productList}
    />
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  productList: {
    padding: 5,
  },
  productContainer: {
    flex: 1,
    margin: 5,
    borderRadius: 8,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
  },
  itemBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
  },
  addWishlistBox: {
    position: 'absolute',
    top: -10,
    right: -10,
    zIndex: 1,
  },
  itemLink: {
    flexDirection: 'column',
    height: '100%',
  },
  itemImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 120,
    backgroundColor: '#f5f5f5',
  },
  itemImageBox: {
    width: '100%',
    height: '100%',
    backgroundColor: '#f5f5f5',
  },
  itemImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  itemBody: {
    padding: 10,
  },
  itemDetails: {
    paddingBottom: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 3,
  },
  by: {
    fontSize: 12,
    color: '#555',
    marginBottom: 3,
  },
  brandName: {
    fontWeight: 'bold',
  },
  itemDesc: {
    fontSize: 12,
    color: '#777',
  },
  itemFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderTopWidth: 1,
    borderColor: '#ddd',
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#000',
  },
  reviews: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rating: {
    fontSize: 12,
    fontWeight: 'bold',
    marginRight: 3,
  },
  star: {
    fontSize: 12,
    color: '#ffb302',
  },
});

export default ProductList;
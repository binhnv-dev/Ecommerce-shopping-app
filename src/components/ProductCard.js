import React from 'react';
import { configs } from '../configs';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Image,
  Dimensions,
} from 'react-native';
import COLORS from '../utils/constants/colors';
const width = Dimensions.get('window').width / 2 - 30;
import Rating from './Rating';

const { LOCAL_SERVER_URL } = configs;

const ProductCard = ({ product, handleProduct }) => {
  console.log(product);
  return (
    <View style={style.card}>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handleProduct(product)}
      >
        <View style={style.imageContainer}>
          <Image
            source={{ uri: product.imageUrl }}
            style={style.image}
          />
        </View>
        <Text
          numberOfLines={2}
          style={{ fontWeight: 'bold', fontSize: 17, marginTop: 20 }}
        >
          {product.name}
        </Text>
      </TouchableOpacity>
      <Rating value={product.totalRatings} />
      <View style={style.ratingContainer}>
        <Text style={style.price}>${product.price}</Text>
        <Text style={style.price}>{product.totalReviews} reviews</Text>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  card: {
    height: 250,
    backgroundColor: COLORS.light,
    width,
    marginHorizontal: 2,
    borderRadius: 10,
    marginBottom: 20,
    padding: 15,
  },
  price: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.tomato,
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 5,
  },
  imageContainer: {
    height: 100,
    alignItems: 'center',
  },
  image: {
    height: 100,
    width: width,
    resizeMode: 'contain',
  },
});

export default ProductCard;

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { configs } from '../configs';
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  FlatList,
  SafeAreaView,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/MaterialIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';

import COLORS from '../utils/constants/colors';
import Rating from '../components/Rating';
import Loader from '../components/Loader';
import Message from '../components/Message';

import {
  listProductDetails,
  createProductReview,
} from '../redux/actions/productActions';
import { addToCart } from '../redux/actions/cartActions';
import { PRODUCT_CREATE_REVIEW_RESET } from '../redux/constants/productConstants';

const { LOCAL_SERVER_URL } = configs;

const Product = ({ navigation, route }) => {
  const id = route.params;

  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const [qty, setQty] = useState(1);
  const [userRating, setUserRating] = useState(1);
  const [comment, setComment] = useState('');

  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);
  const { userInfo } = userLogin;

  const productDetails = useSelector(state => state.productDetails);
  const { loading, error, product } = productDetails;

  const productReviewCreate = useSelector(state => state.productReviewCreate);
  const { success: successProductReview, error: errorProductReview } =
    productReviewCreate;

  const productRating = useMemo(() => {
    if (!product?.reviews || product.reviews.length === 0) {
      return 0;
    }
  
    const totalRating = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return totalRating / product.reviews.length;
  }, [product])
  useEffect(() => {
    if (successProductReview) {
      setUserRating(1);
      setComment('');
      dispatch({ type: PRODUCT_CREATE_REVIEW_RESET });
    }
    dispatch(listProductDetails(id));
  }, [dispatch, successProductReview, userInfo, id]);

  const addToCartHandler = () => {
    dispatch(addToCart(id, qty));
  };

  const reviewSubmitHandler = () => {
    dispatch(createProductReview(id, { userRating, comment }));
  };

  return loading ? (
    <Loader />
  ) : error ? (
    <>
      <Icon
        name="arrow-back"
        size={28}
        onPress={() => navigation.goBack()}
        style={{ marginLeft: 20, marginTop: 20 }}
      />
      <Message>{error}</Message>
    </>
  ) : (
    <SafeAreaView style={style.container}>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          marginTop: 0,
          paddingBottom: 50,
        }}
        scrollEnabled={true}
        keyExtractor={(_, index) => index.toString()}
        data={
          product && product.reviews && product.reviews.length === 0
            ? []
            : product.reviews
        }
        renderItem={({ item }) => {
          return (
            <View style={style.reviewBox}>
              <View style={style.reviewTop}>
                <Text>{item?.name}</Text>
                <Text>{item?.createdAt?.substring(0, 10)}</Text>
              </View>

              <View style={{ marginLeft: 15 }}>
                <Rating value={item?.rating} />
              </View>

              <Text style={style.comment}>{item?.comment}</Text>
            </View>
          );
        }}
        ListFooterComponentStyle={{
          marginTop: 10,
        }}
        ListHeaderComponent={() => (
          <View>
            <View style={style.header}>
              <Icon
                name="arrow-back"
                size={28}
                onPress={() => navigation.goBack()}
              />
              <AntDesign
                onPress={() => navigation.navigate('Cart')}
                name={'shoppingcart'}
                size={28}
                color={COLORS.tomato}
              />
            </View>
            <View style={style.imageContainer}>
              <Image
                source={{ uri: product.imageUrl }}
                style={style.image}
              />
            </View>
            <View style={style.detailsContainer}>
              <View style={style.ratingContainer}>
                <Rating value={productRating} />
                <View style={style.addToCart}>
                  <Text style={style.buyText}>
                    {product?.reviews ? product.reviews.length : 0}  reviews
                  </Text>
                </View>
              </View>
              <Text style={style.category}>{product.category}</Text>
              <View style={style.productNamePrice}>
                <Text style={style.name}>{product.name}</Text>
                <View style={style.priceTag}>
                  <Text style={style.price}>${product.price}</Text>
                </View>
              </View>
              {product.quantity > 0 ? (
                <View style={style.qtyBuy}>
                  <Text
                    style={{
                      alignSelf: 'center',
                      fontSize: 20,
                      fontWeight: 'bold',
                    }}
                  >
                    Quantity: {product.quantity}
                  </Text>
                  


                  <TouchableOpacity
                    activeOpacity={0.5}
                    onPress={addToCartHandler}
                  >
                    <View style={style.addToCart}>
                      <Text style={style.buyText}>Add to Cart</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={style.outOfStock}>Out of Stock</Text>
              )}
              <View style={style.aboutContainer}>
                <Text style={style.aboutText}>About</Text>
                <Text style={style.productDes}>{product.description}</Text>
              </View>
            </View>
            <View style={style.reviewsContainer}>
              <Text style={style.reviewTitle}>
                {product && product.reviews && product.reviews.length === 0
                  ? 'No Reviews'
                  : 'Reviews'}
              </Text>
            </View>
          </View>
        )}
        ListFooterComponent={() => (
          <View style={style.reviewsContainer}>
            <Text style={style.reviewTitle}>Write a Customer Review</Text>
            {errorProductReview && <Message>{errorProductReview}</Message>}
            {userInfo ? (
              <View>
                <View style={style.chooseReviewContainer}>
                  <Picker
                    style={style.pickerRating}
                    mode="dropdown"
                    ref={pickerRef}
                    selectedValue={userRating}
                    onValueChange={(itemValue, itemIndex) =>
                      setUserRating(itemValue)
                    }
                  >
                    <Picker.Item label={'1 - Poor'} value={1} />
                    <Picker.Item label={'2 - Fair'} value={2} />
                    <Picker.Item label={'3 - Good'} value={3} />
                    <Picker.Item label={'4 - Very Good'} value={4} />
                    <Picker.Item label={'5 - Excellent'} value={5} />
                  </Picker>

                  <TouchableOpacity activeOpacity={0.5}>
                    <View style={style.addToCart}>
                      <Text style={style.buyText}>Choose Rating</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <TextInput
                  placeholder={'Write your review comment'}
                  placeholderTextColor={COLORS.dark}
                  underlineColorAndroid={'transparent'}
                  style={style.input}
                  multiline={true}
                  numberOfLines={3}
                  editable
                  maxLength={100}
                  onChangeText={text => setComment(text)}
                />
                <TouchableOpacity
                  activeOpacity={0.6}
                  onPress={reviewSubmitHandler}
                >
                  <View style={style.submitReviewButton}>
                    <Text style={style.submitReviewText}>Submit Review</Text>
                  </View>
                </TouchableOpacity>
              </View>
            ) : (
              <View>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                  <Text style={style.login}>
                    Please Login to write a review
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  header: {
    paddingHorizontal: 20,
    marginTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  imageContainer: {
    height: 300,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    resizeMode: 'contain',
    height: 300,
    width: '100%',
  },
  detailsContainer: {
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 30,
    paddingTop: 30,
    height: undefined,
  },
  ratingContainer: {
    marginLeft: 20,
    marginTop: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  productNamePrice: {
    marginLeft: 20,
    marginTop: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  name: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  price: {
    marginLeft: 15,
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  qtyBuy: {
    marginTop: 20,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qtyBuyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  line: {
    width: 25,
    height: 2,
    backgroundColor: COLORS.dark,
    marginBottom: 5,
    marginRight: 3,
  },
  borderBtn: {
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    width: 60,
    height: 40,
  },
  qty: {
    fontSize: 20,
    marginHorizontal: 10,
    fontWeight: 'bold',
  },
  borderBtnText: {
    fontWeight: 'bold',
    fontSize: 28,
  },
  buyBtn: {
    width: 120,
    height: 40,
    backgroundColor: COLORS.green,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  priceTag: {
    backgroundColor: COLORS.green,
    width: 80,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  addToCart: {
    backgroundColor: COLORS.green,
    width: 120,
    height: 40,
    justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderBottomLeftRadius: 25,
  },
  buyText: {
    alignSelf: 'center',
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  aboutContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
    marginBottom: 10,
  },
  aboutText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  productDes: {
    color: 'grey',
    fontSize: 16,
    lineHeight: 22,
    marginTop: 10,
    marginBottom: 10,
  },
  category: {
    marginLeft: 20,
    marginTop: 10,
    fontSize: 15,
    fontWeight: 'bold',
  },
  outOfStock: {
    marginTop: 10,
    marginLeft: 20,
    fontSize: 20,
    fontWeight: 'bold',
  },
  reviewsContainer: {
    backgroundColor: COLORS.light,
    marginHorizontal: 7,
    marginBottom: 7,
    borderRadius: 20,
    marginTop: 10,
    paddingTop: 10,
    height: undefined,
  },
  reviewTitle: {
    paddingHorizontal: 20,
    marginBottom: 10,
    fontWeight: 'bold',
    fontSize: 20,
  },
  reviewBox: {
    height: undefined,
    width: '100%',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.light,
    backgroundColor: COLORS.light,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '96%',
    marginTop: 5,
  },
  reviewTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10,
  },
  comment: {
    marginLeft: 15,
    width: '80%',
    fontSize: 15,
    fontWeight: '500',
    marginBottom: 10,
  },
  chooseReviewContainer: {
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    marginBottom: 30,
    borderBottomColor: COLORS.dark,
    borderBottomWidth: 1,
    color: COLORS.dark,
    marginLeft: 15,
    fontSize: 15,
    margin: 10,
  },
  submitReviewButton: {
    borderRadius: 20,
    height: 50,
    width: 150,
    backgroundColor: COLORS.primary,
    marginLeft: 15,
    marginBottom: 10,
    justifyContent: 'center',
  },
  submitReviewText: {
    alignSelf: 'center',
    fontSize: 16,
    color: COLORS.white,
  },
  login: {
    fontSize: 15,
    fontWeight: 'bold',
    color: COLORS.tomato,
    alignSelf: 'center',
    marginBottom: 10,
  },
  picker: {
    color: 'black',
    height: 40,
    width: '40%',
  },
  pickerRating: {
    color: 'black',
    height: 40,
    width: '60%',
  },
});

export default Product;

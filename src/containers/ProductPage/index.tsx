import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';

import actions from '../../actions';

import Input from '../../components/Common/Input';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import {BagIcon} from '../../components/Common/Icon';
import ProductReviews from '../../components/Store/ProductReviews';
import {navigate} from '../../helpers/navigation';

interface ProductPageProps {
  fetchStoreProduct: (slug: string) => void;
  fetchProductReviews: (slug: string) => void;
  product: any;
  productShopData: any;
  shopFormErrors: any;
  isLoading: boolean;
  itemsInCart: string[];
  productShopChange: (name: string, value: any) => void;
  handleAddToCart: (product: any) => void;
  handleRemoveFromCart: (product: any) => void;
  addProductReview: () => void;
  reviewsSummary: any;
  reviews: any[];
  reviewFormData: any;
  reviewChange: (name: string, value: any) => void;
  reviewFormErrors: any;
}

const ProductPage: React.FC<ProductPageProps> = ({
  fetchStoreProduct,
  fetchProductReviews,
  product,
  productShopData,
  shopFormErrors,
  isLoading,
  itemsInCart,
  productShopChange,
  handleAddToCart,
  handleRemoveFromCart,
  addProductReview,
  reviewsSummary,
  reviews,
  reviewFormData,
  reviewChange,
  reviewFormErrors,
}) => {
  const route = useRoute();
  const {slug} = route.params as {slug: string};

  useEffect(() => {
    fetchStoreProduct(slug);
    fetchProductReviews(slug);
  }, [slug]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  if (Object.keys(product).length === 0) {
    return <NotFound message="No product found." />;
  }

  return (
    <ScrollView contentContainerStyle={styles.productShop}>
      <View style={styles.row}>
        <View style={styles.col}>
          <View style={styles.positionRelative}>
            <Image
              style={styles.itemImage}
              source={{
                uri: product.imageUrl
                  ? product.imageUrl
                  : 'https://via.placeholder.com/150',
              }}
            />
            {product.inventory <= 0 && !shopFormErrors['quantity'] ? (
              <Text style={styles.outOfStock}>Out of stock</Text>
            ) : (
              <Text style={styles.inStock}>In stock</Text>
            )}
          </View>
        </View>
        <View style={styles.col}>
          <View style={styles.productContainer}>
            <View style={styles.itemBox}>
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{product.name}</Text>
                <Text style={styles.sku}>{product.sku}</Text>
                <View style={styles.hr} />
                {product.brand && (
                  <Text style={styles.by}>
                    see more from{' '}
                    <TouchableOpacity
                      onPress={() =>
                        navigate('Brand', {slug: product.brand.slug})
                      }>
                      <Text style={styles.defaultLink}>
                        {product.brand.name}
                      </Text>
                    </TouchableOpacity>
                  </Text>
                )}
                <Text style={styles.itemDesc}>{product.description}</Text>
                <Text style={styles.price}>${product.price}</Text>
              </View>
              <View style={styles.itemCustomize}>
                <Input
                  type={'number'}
                  error={shopFormErrors['quantity']}
                  label={'Quantity'}
                  name={'quantity'}
                  decimals={false}
                  min={1}
                  max={product.inventory}
                  placeholder={'Product Quantity'}
                  disabled={
                    product.inventory <= 0 && !shopFormErrors['quantity']
                  }
                  value={productShopData.quantity}
                  onInputChange={(name, value) => {
                    productShopChange(name, value);
                  }}
                />
              </View>
              <View style={styles.itemActions}>
                {itemsInCart?.includes(product._id) ? (
                  <Button
                    variant="primary"
                    disabled={
                      product.inventory <= 0 && !shopFormErrors['quantity']
                    }
                    text="Remove From Bag"
                    className="bag-btn"
                    icon={<BagIcon width={16} height={16} fill='#fff' />}
                    onClick={() => handleRemoveFromCart(product)}
                    style={styles.button}
                  />
                ) : (
                  <Button
                    variant="primary"
                    disabled={
                      product.quantity <= 0 && !shopFormErrors['quantity']
                    }
                    text="Add To Bag"
                    className="bag-btn"
                    icon={<BagIcon width={16} height={16} fill='#fff' />}
                    onClick={() => handleAddToCart(product)}
                    style={styles.button}
                  />
                )}
              </View>
            </View>
          </View>
        </View>
      </View>
      <ProductReviews
        reviewFormData={reviewFormData}
        reviewFormErrors={reviewFormErrors}
        reviews={reviews}
        reviewsSummary={reviewsSummary}
        reviewChange={reviewChange}
        addReview={addProductReview}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productShop: {
    padding: 10,
  },
  row: {
    flexDirection: 'column',
    flexWrap: 'wrap',
  },
  col: {
    flex: 1,
    padding: 10,
  },
  positionRelative: {
    position: 'relative',
  },
  itemImage: {
    width: '100%',
    height: 300,
    resizeMode: 'cover',
    borderRadius: 10,
    backgroundColor: '#333',
  },
  outOfStock: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'red',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  inStock: {
    position: 'absolute',
    top: 10,
    left: 10,
    color: 'green',
    fontWeight: 'bold',
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    padding: 5,
    borderRadius: 5,
  },
  productContainer: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    padding: 10,
  },
  itemDetails: {
    marginBottom: 10,
  },
  itemName: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  sku: {
    fontSize: 12,
    color: '#777',
  },
  hr: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginVertical: 10,
  },
  by: {
    fontSize: 14,
    color: '#555',
  },
  defaultLink: {
    color: '#007bff',
  },
  itemDesc: {
    fontSize: 14,
    color: '#333',
    marginVertical: 10,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  itemCustomize: {
    marginVertical: 10,
  },
  itemActions: {
    marginVertical: 10,
  },
  button: {
    width: '80%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
    height: 50,
  },
});

const mapStateToProps = (state: any) => {
  return {
    product: state.product.storeProduct,
    productShopData: state.product.productShopData,
    shopFormErrors: state.product.shopFormErrors,
    isLoading: state.product.isLoading,
    reviews: state.review?.productReviews,
    reviewsSummary: state?.review?.reviewsSummary,
    reviewFormData: state?.review?.reviewFormData,
    reviewFormErrors: state.review?.reviewFormErrors,
    itemsInCart: state.cart?.itemsInCart,
  };
};

export default connect(mapStateToProps, actions)(ProductPage);

/**
 *
 * CategoryShop
 *
 */

import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import actions from '../../actions';

import ProductList from '../../components/Store/ProductList';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

interface Props {
  products: any[];
  isLoading: boolean;
  authenticated: boolean;
  filterProducts?: (filterType: string, slug: string) => void;
  updateWishlist?: (productId: string) => void;
}

const CategoryShop: React.FC<Props> = ({
  products,
  isLoading,
  authenticated,
  filterProducts,
  updateWishlist,
}) => {
  const route = useRoute();
  const slug = (route.params as { slug: string })?.slug;

  useEffect(() => {
    if (filterProducts) filterProducts('category', slug);
  }, [filterProducts, slug]);

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator />}
      {products && products.length > 0 && (
        <ProductList
          products={products}
          authenticated={authenticated}
          updateWishlist={updateWishlist}
        />
      )}
      {!isLoading && products && products.length <= 0 && (
        <NotFound message='No products found.' />
      )}
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    products: state.product.storeProducts,
    isLoading: state.product.isLoading,
    authenticated: state.authentication.authenticated,
  };
};

export default connect(mapStateToProps, actions)(CategoryShop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
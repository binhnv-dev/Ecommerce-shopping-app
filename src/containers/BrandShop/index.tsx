/**
 *
 * BrandsShop
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
  fetchBrandProducts?: (slug: string) => void;
  updateWishlist?: (productId: string) => void;
}

const BrandsShop: React.FC<Props> = ({
  products,
  isLoading,
  authenticated,
  fetchBrandProducts,
  updateWishlist,
}) => {
  const route = useRoute();
  const slug = (route.params as { slug: string })?.slug;

  useEffect(() => {
    if (fetchBrandProducts) fetchBrandProducts(slug);
  }, [fetchBrandProducts, slug]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <LoadingIndicator />
      ) : products.length > 0 ? (
        <ProductList
          products={products}
          authenticated={authenticated}
          updateWishlist={updateWishlist}
        />
      ) : (
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

export default connect(mapStateToProps, actions)(BrandsShop);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});
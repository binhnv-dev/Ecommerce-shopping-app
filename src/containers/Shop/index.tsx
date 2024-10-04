/**
 *
 * Shop
 *
 */

import React, { useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import actions from '../../actions';

import ProductsShop from '../ProductShop';

import Pagination from '../../components/Common/Pagination';
import SelectOption from '../../components/Common/SelectOption';

interface Props {
  authenticated: boolean;
  products: any[];
  advancedFilters: {
    totalProducts: number;
    pageNumber: number;
    pages: number;
    order: number;
  };
  filterProducts: (name: string, value: any) => void;
  productChange: (name: string, value: any) => void;
  clearAuth: () => void;
  productEditChange: (name: string, value: any) => void;
}

const Shop: React.FC<Props> = ({
  products,
  advancedFilters,
  filterProducts,
}) => {
  const { totalProducts, pageNumber, pages, order } = advancedFilters;

  const sortOptions = [
    { value: 0, label: 'Newest First' },
    { value: 1, label: 'Price High to Low' },
    { value: 2, label: 'Price Low to High' },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <View style={styles.col9}>
          <View style={styles.row}>
            <View style={styles.col9}>
              <Text style={styles.text}>
                <Text>Showing: </Text>
                {`${
                  totalProducts < 8
                    ? totalProducts
                    : 8 * pageNumber - 8 == 0
                    ? 1
                    : 8 * pageNumber - 8 + 1
                } – ${
                  totalProducts < 8
                    ? totalProducts
                    : 8 * pageNumber < totalProducts
                    ? 8 * pageNumber
                    : totalProducts
                } products of ${totalProducts} products`}
              </Text>
            </View>
          </View>
          <ProductsShop />
          {totalProducts >= 8 && (
            <View style={styles.paginationContainer}>
              <Pagination
                handlePagenationChangeSubmit={filterProducts}
                pages={pages}
                page={pageNumber}
              />
            </View>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    advancedFilters: state.product.advancedFilters,
  };
};

export default connect(mapStateToProps, actions)(Shop);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  col3: {
    width: '25%',
    padding: 10,
  },
  col9: {
    width: '100%',
    padding: 10,
  },
  col6: {
    width: '50%',
    padding: 10,
  },
  col2: {
    width: '16.66%',
    padding: 10,
  },
  col4: {
    width: '33.33%',
    padding: 10,
  },
  text: {
    fontSize: 16,
  },
  textRight: {
    textAlign: 'right',
    fontSize: 16,
  },
  paginationContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
});
import React from 'react';
import {View, StyleSheet} from 'react-native';
import SearchBar from '../../Common/SearchBar';

interface OrderSearchProps {
  onBlur: (e: {value: string}) => void;
  onSearch: (e: {value: string}) => void;
  onSearchSubmit: (search: string) => void;
}

const OrderSearch: React.FC<OrderSearchProps> = ({
  onSearch,
  onSearchSubmit,
}) => {
  return (
    <View style={styles.container}>
      <SearchBar
        name="order"
        placeholder="Type the complete order ID"
        btnText="Search"
        onSearch={onSearch}
        onSearchSubmit={onSearchSubmit}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
});

export default OrderSearch;

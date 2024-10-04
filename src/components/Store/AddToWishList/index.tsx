/**
 *
 * AddToWishList
 *
 */

import React from 'react';
import { View, TouchableOpacity, StyleSheet, useWindowDimensions } from 'react-native';
import { HeartIcon } from '../../Common/Icon';

interface AddToWishListProps {
  product: {
    sku: string;
    _id: string;
    isLiked: boolean;
    name: string;
  };
  updateWishlist: (e: any) => void;
  authenticated: boolean;
}

const AddToWishList: React.FC<AddToWishListProps> = ({ product, updateWishlist, authenticated }) => {
  const { width, height } = useWindowDimensions();
  const [checked, setChecked] = React.useState(!!product?.isLiked);
  const handleCheckboxChange = (e: any) => {
    setChecked(!checked);

    const updatePayload = {
      checked: product?.isLiked ? false : true,
      id: product._id,
      name: product.name
    }
    
    updateWishlist(updatePayload);
  }

  return (
    <View style={styles.addToWishlist}>
      <TouchableOpacity
        onPress={handleCheckboxChange}
        style={authenticated ? styles.checkbox : styles.disabledCheckbox}
      >
        <HeartIcon filled={checked} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addToWishlist: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1,
  },
  checkbox: {
    // Add styles for the checkbox
  },
  disabledCheckbox: {
    // Add styles for the disabled checkbox
  },
  heartIcon: {
    // Add styles for the heart icon
  },
});

export default AddToWishList;
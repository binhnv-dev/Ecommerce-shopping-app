import React, { useState, useRef } from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import { configs } from '../configs';
import Icon from 'react-native-vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';

import COLORS from '../utils/constants/colors';

const { LOCAL_SERVER_URL } = configs;

const CartItem = ({
  item,
  addToCartHandler,
  removeFromCartHandler,
  handleProduct,
}) => {
  const pickerRef = useRef();

  function open() {
    pickerRef.current.focus();
  }

  function close() {
    pickerRef.current.blur();
  }

  const [selectedQty, setSelectedQty] = useState(item.qty);
  const handleValueChange = value => {
    if (!Number(value)) {
      value = 0;
    }

    if (Number(value) > item.countInStock) {
      value = item.countInStock;
      Alert.alert('Notice', 'The quantity is more than the stock available!')
    }
    
    setSelectedQty(Number(value));
    addToCartHandler(value, item.product);
  };

  return (
    <View style={style.mainContainer}>
      <View style={style.container}>
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => handleProduct(item.product)}
        >
          <Image source={{ uri: item.image }} style={style.imageStyle} />
        </TouchableOpacity>
        <View
          style={{ flexDirection: 'column', justifyContent: 'space-between' }}
        >
          <View style={style.detailsContainer}>
            <TouchableOpacity
              activeOpacity={0.6}
              onPress={() => handleProduct(item.product)}
            >
              <Text numberOfLines={2} style={style.name}>
                {item.name}
              </Text>
            </TouchableOpacity>
            <Text style={style.price}>${item.price}</Text>
          </View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 15,
                fontWeight: 'bold',
                marginLeft: 10,
              }}
            >
              Quantity
            </Text>
            <TextInput
              keyboardType="number"
              
              style={style.picker}
              value={selectedQty.toString()}
              placeholderTextColor={COLORS.dark}
              underlineColorAndroid={'transparent'}
              onChangeText={value => handleValueChange(value)}
            />
          </View>
        </View>
      </View>
      <View style={{ justifyContent: 'center' }}>
        <TouchableOpacity onPress={() => removeFromCartHandler(item.product)}>
          <Icon
            name={'trash-outline'}
            size={30}
            color={COLORS.red}
            style={{ alignSelf: 'center', marginRight: 10 }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  container: {
    height: 100,
    elevation: 15,
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    width: '85%',
  },
  imageStyle: {
    height: 80,
    width: 80,
  },
  detailsContainer: {
    height: 100,
    marginLeft: 10,
    marginTop: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 12,
    width: '60%',
  },
  category: {
    fontSize: 13,
    color: COLORS.grey,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.tomato,
    position: 'absolute',
    marginLeft: 190,
  },
  qtyCon: {
    marginRight: 20,
    alignItems: 'center',
  },
  qty: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  picker: {
    color: 'black',
    height: 40,
    width: 50,
    display: 'flex',
    justifyContent: 'center',
    textAlign: 'center',
    backgroundColor: COLORS.light,
  },
});

export default CartItem;

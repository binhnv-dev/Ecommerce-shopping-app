import React from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';
import COLORS from '../utils/constants/colors';

const OrderHistoryItem = ({item, handleOrderDetail}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.9}
      onPress={() => handleOrderDetail(item._id)}>
      <View style={style.container}>
        <View style={style.detailsContainer}>
          <View style={style.detailsRowContainer}>
            <Text
              numberOfLines={1}
              style={[style.name, {color: COLORS.tomato}]}>
              Order ID: {item._id}
            </Text>
            <Text style={[style.name, {color: COLORS.dark}]}>
              {item?.createdAt?.substring(0, 10)}
            </Text>
          </View>

          <View style={style.detailsRowContainer}>
            <Text style={[style.name, {color: COLORS.green}]}>
              Total : ${item.total}
            </Text>
          </View>

          <View style={style.detailsRowContainer}>
            {item.isPaid ? (
              <Text style={[style.name, {color: COLORS.green}]}>
                Paid on : {item.paidAt.substring(0, 10)}
              </Text>
            ) : (
              <Text style={[style.name, {color: COLORS.red}]}>Not Paid</Text>
            )}
            {item?.products[0]?.status && (
              <Text style={[style.name, {color: COLORS.green}]}>
                {item.products[0].status}
              </Text>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const style = StyleSheet.create({
  container: {
    height: 100,
    borderRadius: 10,
    elevation: 10,
    backgroundColor: COLORS.white,
    marginVertical: 10,
    marginHorizontal: 20,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageStyle: {
    height: 80,
    width: 80,
  },
  detailsContainer: {
    height: 100,
    marginLeft: 10,
    paddingVertical: 10,
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  detailsRowContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  price: {
    fontSize: 13,
    fontWeight: 'bold',
    color: COLORS.tomato,
  },
});

export default OrderHistoryItem;

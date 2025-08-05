import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Button, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import DropdownConfirm from '../../Common/DropdownConfirm';

interface OrderItemsProps {
  order: any;
  user: any;
  updateOrderItemStatus: (itemId: string, status: string) => void;
}

const OrderItems: React.FC<OrderItemsProps> = ({ order, user, updateOrderItemStatus }) => {
  const navigation = useNavigation<any>();

  const renderPopoverContent = (item: any) => {
    const statuses = order.isPaid ? ['Shipped', 'Delivered', 'Cancelled'] : ['Not Processing', 'Processing'];

    return (
      <View style={styles.popoverContent}>
        {statuses.map((s, i) => (
          <TouchableOpacity
            key={`${s}-${i}`}
            style={[styles.dropdownItem, s === item?.status && styles.activeDropdownItem]}
            onPress={() => updateOrderItemStatus(item._id, s)}
          >
            <Text>{s}</Text>
          </TouchableOpacity>
        ))}
      </View>
    );
  };

  const renderItemsAction = (item: any) => {
    if (item.status === 'Delivered') {
      return (
        <TouchableOpacity
          onPress={() => navigation.navigate('Product', { slug: item.product.slug })}
          style={styles.linkButton}
        >
          <Text style={styles.linkButtonText}>Review Product</Text>
        </TouchableOpacity>
      );
    }
  };

  return (
    <ScrollView style={styles.orderItems}>
      <Text style={styles.title}>Order Items</Text>
      {order.products.map((item: any, index: number) => (
        <View key={index} style={styles.item}>
          <View style={styles.orderItemBox}>
            <View style={styles.itemRow}>
              <View style={styles.itemBox}>
                <Image
                  style={styles.itemImage}
                  source={{
                    uri: item.product && item.product.imageUrl ? item.product.imageUrl : '/images/placeholder-image.png',
                  }}
                />
                <View style={styles.itemDetails}>
                  {item.product ? (
                    <>
                      <TouchableOpacity
                        onPress={() => navigation.navigate('Product', { slug: item.product?.slug })}
                        style={styles.itemLink}
                      >
                        <Text style={styles.itemName}>{item.product?.name}</Text>
                      </TouchableOpacity>
                      <View style={styles.itemPriceContainer}>
                        <Text style={styles.price}>${item.purchasePrice || item.product.price}</Text>
                      </View>
                    </>
                  ) : (
                    <Text style={styles.notAvailable}>Not Available</Text>
                  )}
                </View>
              </View>
              <View style={styles.itemInfo}>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Status</Text>
                  <Text style={styles.infoValue}>{item.status}</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Quantity</Text>
                  <Text style={styles.infoValue}>{item.quantity}</Text>
                </View>
                <View style={styles.infoBlock}>
                  <Text style={styles.infoLabel}>Total Price</Text>
                  <Text style={styles.infoValue}>${item.totalPrice}</Text>
                </View>
              </View>
            </View>
            {item.product && <View style={styles.itemAction}>{renderItemsAction(item)}</View>}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  orderItems: {
    padding: 0,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  item: {
    marginBottom: 16,
  },
  orderItemBox: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemBox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  itemImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
  },
  itemDetails: {
    marginLeft: 16,
  },
  itemLink: {
    marginBottom: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemPriceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  price: {
    fontSize: 16,
    color: '#888',
  },
  notAvailable: {
    fontSize: 16,
    color: '#888',
  },
  itemInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoBlock: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#888',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  itemAction: {
    marginTop: 16,
    alignItems: 'flex-end',
  },
  linkButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#007bff',
    borderRadius: 4,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 14,
  },
  popoverContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  dropdownItem: {
    padding: 8,
    width: '100%',
    textAlign: 'center',
  },
  activeDropdownItem: {
    backgroundColor: '#007bff',
    color: '#fff',
  },
  confirmContent: {
    padding: 16,
    alignItems: 'center',
  },
  confirmText: {
    marginBottom: 16,
    textAlign: 'center',
  },
  adminDropdown: {
    backgroundColor: '#f8f9fa',
  },
});

export default OrderItems;
import React from 'react';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {NavigationProp, RouteProp} from '@react-navigation/native';

import actions from '../../actions';
import OrderDetails from '../../components/Manager/OrderDetails';
import NotFound from '../../components/Common/NotFound';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

interface OrderPageProps {
  navigation: NavigationProp<any>;
  route: RouteProp<{params: {id: string}}, 'params'>;
  fetchOrder: (id: string) => void;
  order: any;
  user: any;
  isLoading: boolean;
  cancelOrder: () => void;
  updateOrderItemStatus: (itemId: string, status: string) => void;
  paidOrderSuccess: (
    order: any,
    data: any,
    type: string,
    amount: number,
    tokenId?: string | null,
  ) => void;
  paidOrderMobileSuccess: (order: any, type: string, amount: number) => void;
}

class OrderPage extends React.PureComponent<OrderPageProps> {
  componentDidMount() {
    const id = this.props.route.params.id;
    this.props.fetchOrder(id);
  }

  componentDidUpdate(prevProps: OrderPageProps) {
    if (this.props.route.params.id !== prevProps.route.params.id) {
      const id = this.props.route.params.id;
      this.props.fetchOrder(id);
    }
  }

  render() {
    const {
      navigation,
      order,
      user,
      isLoading,
      cancelOrder,
      updateOrderItemStatus,
      paidOrderSuccess,
      paidOrderMobileSuccess,
    } = this.props;

    return (
      <View style={styles.container}>
        {isLoading ? (
          <LoadingIndicator backdrop />
        ) : order._id ? (
          <OrderDetails
            order={order}
            user={user}
            cancelOrder={cancelOrder}
            updateOrderItemStatus={updateOrderItemStatus}
            paidOrderSuccess={paidOrderSuccess}
            paidOrderMobileSuccess={paidOrderMobileSuccess}
            onBack={() => {
              if (navigation.canGoBack()) {
                navigation.goBack();
              } else {
                navigation.navigate('Orders');
              }
            }}
          />
        ) : (
          <NotFound message="No order found." />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
});

const mapStateToProps = (state: any) => {
  return {
    user: state.account.user,
    order: state.order.order,
    isLoading: state.order.isLoading,
  };
};

export default connect(mapStateToProps, actions)(OrderPage);

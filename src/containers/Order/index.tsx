import React from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { connect } from 'react-redux';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import actions from '../../actions';
import SubPage from '../../components/Manager/SubPage';
import OrderList from '../../components/Manager/OrderList';
import OrderSearch from '../../components/Manager/OrderSearch';
import NotFound from '../../components/Common/NotFound';

interface ListProps {
  fetchOrders: () => void;
  searchOrders: (search: string) => void;
  user: any;
  orders: any[];
  isLoading: boolean;
}

interface ListState {
  search: string;
}

class List extends React.PureComponent<ListProps, ListState> {
  constructor(props: ListProps) {
    super(props);

    this.state = {
      search: '',
    };
  }

  componentDidMount() {
    this.props.fetchOrders();
  }

  handleOrderSearch = (e: { value: string }) => {
    if (e.value.length >= 2) {
      this.setState({
        search: e.value,
      });
    } else {
      this.setState({
        search: '',
      });
    }
  };

  render() {
    const { user, orders, isLoading, searchOrders } = this.props;
    console.log('orders', user, orders);
    
    const { search } = this.state;

    const filteredOrders = search
      ? orders.filter((o) => o._id.includes(search))
      : orders;

    return (
      <ScrollView style={styles.container}>
        <SubPage
          title="Your Orders"
          actionTitle={user.role === 'ROLE_ADMIN' ? 'Customer Orders' : undefined}
          handleAction={() =>
            user.role === 'ROLE_ADMIN' && useNavigation<NavigationProp<any>>().navigate('CustomerOrders')
          }
        >
          <OrderSearch
            onBlur={this.handleOrderSearch}
            onSearch={this.handleOrderSearch}
            onSearchSubmit={searchOrders}
          />
          {isLoading ? (
            <ActivityIndicator style={styles.loadingIndicator} />
          ) : orders.length > 0 ? (
            <OrderList orders={filteredOrders} />
          ) : (
            <NotFound message="You have no orders yet!" />
          )}
        </SubPage>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingIndicator: {
    marginTop: 20,
  },
});

const mapStateToProps = (state: any) => {
  return {
    user: state.account.user,
    orders: state.order.orders,
    isLoading: state.order.isLoading,
  };
};

export default connect(mapStateToProps, actions)(List);
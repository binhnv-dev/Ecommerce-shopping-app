import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import {connect, ConnectedProps} from 'react-redux';
import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import WishList from '../../components/Manager/WishList';
import NotFound from '../../components/Common/NotFound';
import {RootState} from '../../store';

const mapStateToProps = (state: RootState) => ({
  wishlist: state.wishlist.wishlist,
  isLoading: state.wishlist.isLoading,
});

const connector = connect(mapStateToProps, actions);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface Props extends PropsFromRedux {}

const Wishlist: React.FC<Props> = ({
  wishlist,
  isLoading,
  fetchWishlist,
  updateWishlist,
}) => {
  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SubPage title="Your Wishlist">
        {isLoading ? (
          <ActivityIndicator size="large" color="#0000ff" />
        ) : wishlist.length > 0 ? (
          <WishList wishlist={wishlist} updateWishlist={updateWishlist} />
        ) : (
          <NotFound message="You have no wishlist yet!" />
        )}
      </SubPage>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
});

export default connector(Wishlist);

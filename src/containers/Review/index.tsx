import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { View, StyleSheet, Text, ScrollView } from 'react-native';
import { RootState } from '../../store';
import actions from '../../actions';

import SubPage from '../../components/Manager/SubPage';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import NotFound from '../../components/Common/NotFound';
import ReviewList from '../../components/Manager/ReviewList';

interface ReviewProps extends PropsFromRedux {}

class Review extends React.PureComponent<ReviewProps> {
  componentDidMount() {
    this.props.fetchReviews();
  }

  render() {
    const {
      reviews,
      isLoading,
      approveReview,
      rejectReview,
      deleteReview
    } = this.props;

    return (
      <View style={styles.container}>
        <SubPage title={'Reviews'}>
          {isLoading ? (
            <LoadingIndicator inline />
          ) : reviews.length > 0 ? (
            <ReviewList
              reviews={reviews}
              approveReview={approveReview}
              rejectReview={rejectReview}
              deleteReview={deleteReview}
            />
          ) : (
            <NotFound message='No reviews found.' />
          )}
        </SubPage>
      </View>
    );
  }
}

const mapStateToProps = (state: RootState) => {
  return {
    reviews: state.review.reviews,
    isLoading: state.review.isLoading
  };
};

const connector = connect(mapStateToProps, actions);
type PropsFromRedux = ConnectedProps<typeof connector>;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});

export default connector(Review);
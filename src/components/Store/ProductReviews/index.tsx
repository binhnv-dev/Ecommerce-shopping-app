import React from 'react';
import { View, StyleSheet, ScrollView, Text } from 'react-native';

import AddReview from './Add';
import ReviewList from './List';
import ReviewSummary from './Summary';

interface ProductReviewsProps {
  reviewsSummary: any;
  reviews: any[];
  reviewFormData: any;
  reviewChange: (name: string, value: any) => void;
  reviewFormErrors: any;
  addReview: () => void;
}

const ProductReviews: React.FC<ProductReviewsProps> = (props) => {
  return (
    <ScrollView contentContainerStyle={styles.productReviews}>
      <View style={styles.section}>
        {Object.keys(props?.reviewsSummary || {}).length > 0 && (
          <ReviewSummary reviewsSummary={props.reviewsSummary} />
        )}
      </View>
      <View style={styles.section}>
        {props?.reviews?.length > 0 ? (
          <ReviewList reviews={props.reviews} />
        ) : (
          <Text style={styles.noReviewsText}>No reviews yet.</Text>
        )}
        <AddReview
          reviewFormData={props.reviewFormData}
          reviewChange={props.reviewChange}
          reviewFormErrors={props.reviewFormErrors}
          addReview={props.addReview}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  productReviews: {
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  noReviewsText: {
    textAlign: 'center',
    color: '#777',
    marginVertical: 10,
  },
});

export default ProductReviews;
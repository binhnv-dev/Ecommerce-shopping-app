import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import NotFound from '../../Common/NotFound';
import { ReviewIcon } from '../../Common/Icon';

interface SummaryProps {
  reviewsSummary: {
    ratingSummary: { [key: string]: number }[];
    totalRatings: number;
    totalReviews: number;
    totalSummary: number;
  };
}

const Summary: React.FC<SummaryProps> = ({ reviewsSummary }) => {
  const { ratingSummary, totalRatings, totalReviews, totalSummary } = reviewsSummary;

  const getRatingPercentage = (value: number) => {
    return parseFloat(percentage(value, totalSummary).toFixed(2));
  };

  const averageRating = totalRatings > 0 ? Math.round(totalRatings / totalReviews) : 0;

  return (
    <View style={styles.reviewSummary}>
      <Text style={styles.heading}>Rating</Text>
      {averageRating > 0 && (
        <View style={styles.ratingContainer}>
          <AirbnbRating
            count={5}
            defaultRating={averageRating}
            size={17}
            showRating={false}
            isDisabled
          />
          {totalReviews > 0 && <Text style={styles.reviewText}>based on {totalReviews} reviews.</Text>}
        </View>
      )}

      <View style={styles.separator} />
      {totalReviews > 0 ? (
        ratingSummary.map((r, index) => (
          <View key={index} style={styles.ratingRow}>
            <View style={styles.left}>
              <Text>{parseInt(Object.keys(r)[0])} star</Text>
            </View>
            <View style={styles.middle}>
              <View style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { width: `${getRatingPercentage(parseInt(r[Object.keys(r)[0]] as unknown as string))}%` },
                  ]}
                />
              </View>
            </View>
            <View style={styles.right}>
              <Text style={styles.percentageText}>
                {getRatingPercentage(parseInt(r[Object.keys(r)[0]] as unknown as string))}%
              </Text>
            </View>
          </View>
        ))
      ) : (
        <NotFound>
          <ReviewIcon width={40} height={40} style={styles.icon} />
          <Text style={styles.noReviewText}>Be the first to add a review.</Text>
        </NotFound>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  reviewSummary: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  reviewText: {
    marginLeft: 10,
  },
  separator: {
    borderBottomWidth: 3,
    borderBottomColor: '#f1f1f1',
    marginVertical: 10,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  left: {
    width: 50,
  },
  middle: {
    flex: 1,
  },
  barContainer: {
    height: 10,
    backgroundColor: '#f1f1f1',
    borderRadius: 5,
    overflow: 'hidden',
  },
  bar: {
    height: '100%',
    backgroundColor: '#ffb302',
  },
  right: {
    width: 50,
    marginLeft: 10,
  },
  percentageText: {
    fontWeight: 'bold',
  },
  icon: {
    marginVertical: 10,
  },
  noReviewText: {
    marginBottom: 10,
  },
});

export default Summary;

function percentage(partialValue: number, totalValue: number): number {
  return (100 * partialValue) / totalValue;
}
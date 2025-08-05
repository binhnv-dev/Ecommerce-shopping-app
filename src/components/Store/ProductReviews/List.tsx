import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { AirbnbRating } from 'react-native-ratings';

import { formatDate } from '../../../helpers/date';
import { getRandomColors } from '../../../helpers/color';

interface Review {
  user: {
    firstName: string;
  };
  title: string;
  rating: number;
  created: string;
  review: string;
}

interface ListProps {
  reviews: Review[];
}

const List: React.FC<ListProps> = ({ reviews }) => {
  const getAvatar = (review: Review) => {
    const color = getRandomColors();
    if (review.user.firstName) {
      return (
        <View style={[styles.avatar, { backgroundColor: color ? color : 'red' }]}>
          <Text style={styles.avatarText}>{review.user.firstName.charAt(0)}</Text>
        </View>
      );
    }
  };

  const renderItem = ({ item: review }: { item: Review }) => (
    <View style={styles.reviewBox}>
      <View style={styles.avatarContainer}>{getAvatar(review)}</View>
      <View style={styles.reviewContent}>
        <View style={styles.reviewHeader}>
          <Text style={styles.reviewTitle}>{review.title}</Text>
          <AirbnbRating
            count={5}
            defaultRating={review.rating}
            size={16}
            showRating={false}
            isDisabled
          />
        </View>
        <Text style={styles.reviewDate}>{formatDate(`${review.created}`)}</Text>
        <Text style={styles.reviewText}>{review.review}</Text>
      </View>
    </View>
  );

  return (
    <FlatList
      data={reviews}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.reviewList}
    />
  );
};

const styles = StyleSheet.create({
  reviewList: {
    padding: 10,
  },
  reviewBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  avatarContainer: {
    marginRight: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  reviewContent: {
    flex: 1,
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  reviewDate: {
    fontSize: 12,
    color: '#777',
    marginBottom: 5,
  },
  reviewText: {
    fontSize: 14,
    color: '#333',
  },
});

export default React.memo(List);
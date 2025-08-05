import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {AirbnbRating} from 'react-native-ratings';
import {formatDate} from '../../../helpers/date';
import {getRandomColors} from '../../../helpers/color';
import Button from '../../Common/Button';
import {CheckIcon, RefreshIcon, TrashIcon} from '../../Common/Icon';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../../../App';
import { Dispatch } from 'redux';

interface Review {
  _id: string;
  title: string;
  review: string;
  rating: number;
  status: string;
  created: string;
  isRecommended: boolean;
  user: {
    firstName: string;
  };
  product: {
    slug: string;
    name: string;
    imageUrl: string;
  };
}

type ProductScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Product'
>;

interface ReviewListProps {
  reviews: Review[];
  approveReview: (review: Review) => (dispatch: Dispatch) => Promise<void>;
  rejectReview: (review: Review) => (dispatch: Dispatch) => Promise<void>;
  deleteReview: (id: string) => void;
}

const ReviewList: React.FC<ReviewListProps> = ({
  reviews,
  approveReview,
  rejectReview,
  deleteReview,
}) => {
    const navigation = useNavigation<ProductScreenNavigationProp>();

  const getAvatar = (review: Review) => {
    const color = getRandomColors();
    if (review.user.firstName) {
      return (
        <View style={[styles.avatar, {backgroundColor: color}]}>
          <Text style={styles.avatarText}>
            {review.user.firstName.charAt(0)}
          </Text>
        </View>
      );
    }
  };

  const getProduct = (review: Review) => {
    if (review.product) {
      const product = review.product;
      return (
        <View style={styles.productContainer}>
          <Image
            style={styles.productImage}
            source={{
              uri: product.imageUrl
                ? product.imageUrl
                : 'https://via.placeholder.com/150',
            }}
          />
        </View>
      );
    }
  };

  return (
    <ScrollView style={styles.container}>
      {reviews.map((review, index) => (
        <View key={index} style={styles.reviewBox}>
          <View style={styles.reviewContent}>
            <View style={styles.reviewHeader}>
              <Text style={styles.reviewTitle}>{review.title}</Text>
              {getAvatar(review)}
            </View>
            <Text style={styles.reviewText}>{review.review}</Text>
            <View style={styles.reviewFooter}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate('Product', { slug: review.product.slug })
                }>
                <Text style={styles.productLink}>{review.product.name}</Text>
              </TouchableOpacity>
              <AirbnbRating
                count={5}
                defaultRating={review.rating}
                size={17}
                showRating={false}
                isDisabled
              />
              {getProduct(review)}
            </View>
            <Text style={styles.reviewDate}>{`Review Added on ${formatDate(
              review.created,
            )}`}</Text>
            <View style={styles.reviewActions}>
              {review.status === 'Approved' ? (
                <View style={styles.actionRow}>
                  <CheckIcon />
                  <Text style={styles.approvedText}>Approved</Text>
                  <Button
                    text="Delete"
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteReview(review._id)}
                  />
                </View>
              ) : review.status === 'Rejected' ? (
                <>
                  <View style={styles.actionRow}>
                    <RefreshIcon />
                    <Text style={styles.reapproveText}>Re Approve Review</Text>
                  </View>
                  <View style={styles.actionButtons}>
                    <Button
                      text="Approve"
                      onClick={() => approveReview(review)}
                    />
                    <Button
                      text="Delete"
                      icon={<TrashIcon width={15} />}
                      onClick={() => deleteReview(review._id)}
                    />
                  </View>
                </>
              ) : (
                <View style={styles.actionButtons}>
                  <Button
                    text="Approve"
                    onClick={() => approveReview(review)}
                  />
                  <Button text="Reject" onClick={() => rejectReview(review)} />
                  <Button
                    text="Delete"
                    icon={<TrashIcon width={15} />}
                    onClick={() => deleteReview(review._id)}
                  />
                </View>
              )}
            </View>
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  reviewBox: {
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  reviewContent: {
    flexDirection: 'column',
  },
  reviewHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reviewTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  reviewText: {
    marginTop: 8,
    fontSize: 14,
  },
  reviewFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  productLink: {
    color: '#007bff',
  },
  productContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: 50,
    height: 50,
  },
  reviewDate: {
    marginTop: 8,
    fontSize: 12,
    color: '#6c757d',
  },
  reviewActions: {
    marginTop: 8,
  },
  actionRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  icon: {
    marginRight: 8,
  },
  approvedText: {
    color: 'green',
  },
  reapproveText: {
    color: 'blue',
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
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ReviewList;

import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import Input from '../../Common/Input';
import Button from '../../Common/Button';

const recommedableSelect = [
  { value: 1, label: 'Yes' },
  { value: 0, label: 'No' }
];

interface AddProps {
  reviewFormData: {
    title: string;
    review: string;
    rating: number;
    isRecommended: number;
  };
  reviewChange: (name: string, value: any) => void;
  reviewFormErrors: {
    [key: string]: string[];
  };
  addReview: () => void;
}

const Add: React.FC<AddProps> = ({ reviewFormData, reviewChange, reviewFormErrors, addReview }) => {
  const handleSubmit = () => {
    addReview();
  };

  return (
    <ScrollView contentContainerStyle={styles.addReview}>
      <View style={styles.form}>
        <Text style={styles.heading}>Add Review</Text>
        <Input
          type="text"
          error={reviewFormErrors?.['title']}
          label="Title"
          name="title"
          placeholder="Enter Review title"
          value={reviewFormData?.title}
          onInputChange={(name, value) => {
            reviewChange(name, value);
          }}
        />
        <Input
          type="textarea"
          error={reviewFormErrors?.['review']}
          label="Comment"
          name="review"
          placeholder="Write Review"
          value={reviewFormData?.review}
          onInputChange={(name, value) => {
            reviewChange(name, value);
          }}
        />
        <Input
          type="stars"
          error={reviewFormErrors?.['rating']}
          label="Rating"
          name="rating"
          value={reviewFormData?.rating}
          onInputChange={(name, value) => {
            reviewChange(name, value);
          }}
        />
        <View style={styles.pickerContainer}>
          <Text style={styles.label}>Will you recommend this product?</Text>
          <Picker
            selectedValue={reviewFormData?.isRecommended}
            onValueChange={(value) => reviewChange('isRecommended', value)}
            style={styles.picker}
          >
            {recommedableSelect.map((option) => (
              <Picker.Item key={option.value} label={option.label} value={option.value} />
            ))}
          </Picker>
          {reviewFormErrors?.['isRecommended'] && (
            <Text style={styles.invalidMessage}>{reviewFormErrors?.['isRecommended'][0]}</Text>
          )}
        </View>
        <View style={styles.buttonContainer}>
          <Button type="submit" text="Publish Review" onClick={handleSubmit} />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  addReview: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  form: {
    flex: 1,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    height: 50,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
  },
  buttonContainer: {
    marginTop: 20,
  },
  invalidMessage: {
    color: 'red',
    marginTop: 5,
  },
});

export default Add;
/*
 *
 * Signup
 *
 */
import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, GestureResponderEvent } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';

import actions from '../../actions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import SignupProvider from '../../components/Common/SignupProvider';
import Checkbox from '../../components/Common/Checkbox';
import Button from '../../components/Common/Button';

interface Props {
  authenticated: boolean;
  signupFormData: {
    email: string;
    firstName: string;
    lastName: string;
    password: string;
  };
  formErrors: Record<string, string[]>;
  isLoading: boolean;
  isSubmitting: boolean;
  isSubscribed: boolean;
  signupChange: (name: string, value: string) => void;
  signUp: () => void;
  subscribeChange: () => void;
}

const Signup: React.FC<Props> = ({
  authenticated,
  signupFormData,
  formErrors,
  isLoading,
  isSubmitting,
  isSubscribed,
  signupChange,
  signUp,
  subscribeChange,
}) => {
  const navigation = useNavigation();

  if (authenticated) {
    navigation.navigate('Home' as never);
    return null;
  }

  const handleSubmit = (event: GestureResponderEvent) => {
    event.preventDefault();
    signUp();
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <LoadingIndicator backdrop />}
      <Text style={styles.title}>Register</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(value) => signupChange('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        {formErrors['email'] && <Text style={styles.error}>{formErrors['email']}</Text>}
        <TextInput
          style={styles.input}
          placeholder="First Name"
          onChangeText={(value) => signupChange('firstName', value)}
          autoCapitalize="words"
          placeholderTextColor="#888"
        />
        {formErrors['firstName'] && <Text style={styles.error}>{formErrors['firstName']}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Last Name"
          value={signupFormData.lastName}
          onChangeText={(value) => signupChange('lastName', value)}
          autoCapitalize="words"
          placeholderTextColor="#888"
        />
        {formErrors['lastName'] && <Text style={styles.error}>{formErrors['lastName']}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={signupFormData.password}
          onChangeText={(value) => signupChange('password', value)}
          secureTextEntry
          placeholderTextColor="#888"
        />
        {formErrors['password'] && <Text style={styles.error}>{formErrors['password']}</Text>}
      </View>
      {/* <SignupProvider /> */}
      <Checkbox
              id={'subscribe'}
              label={'Subscribe to newsletter'}
              checked={isSubscribed}
              toggleCheckboxChange={subscribeChange} name={''}      />
      <View style={styles.buttonContainer}>
        <Button
          onClick={handleSubmit}
          text='Sign Up'
          disabled={isSubmitting}
        />
        <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
          <Text style={styles.link}>Back to login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authenticated: state.authentication.authenticated,
    signupFormData: state.signup.signupFormData,
    formErrors: state.signup.formErrors,
    isLoading: state.signup.isLoading,
    isSubmitting: state.signup.isSubmitting,
    isSubscribed: state.signup.isSubscribed,
  };
};

export default connect(mapStateToProps, actions)(Signup);

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 15,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    fontSize: 16,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  buttonContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
    marginTop: 10,
  },
});
import React, { useCallback } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { debounce } from 'lodash';

import actions from '../../actions';
import Button from '../../components/Common/Button';
import LoadingIndicator from '../../components/Common/LoadingIndicator';

interface Props {
  isLoading: boolean;
  authenticated: boolean;
  forgotFormData: {
    email: string;
  };
  formErrors: Record<string, string>;
  forgotPasswordChange: (name: string, value: string) => void;
  forgotPassword: (
    navigation: any,
  ) => (dispatch: any, getState: any) => Promise<any>;
}

const ForgotPassword: React.FC<Props> = ({
  authenticated,
  forgotFormData,
  formErrors,
  forgotPasswordChange,
  forgotPassword,
  isLoading,
}) => {
  const navigation = useNavigation();

  if (authenticated) {
    navigation.navigate('Home' as never);
    return null;
  }

  const handleSubmit = (event: any) => {
    event.preventDefault();
    forgotPassword(navigation);
  };

  const debouncedChangeHandler = useCallback(
    debounce((name: string, value: string) => {
      forgotPasswordChange(name, value);
    }, 300),
    []
  );
console.log('isLoading', isLoading);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {isLoading && <LoadingIndicator />}
      <Text style={styles.title}>Forgot Password</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={value => debouncedChangeHandler('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        {formErrors['email'] && (
          <Text style={styles.error}>{formErrors['email']}</Text>
        )}
      </View>
      <Button onClick={handleSubmit} text="Send Email" variant="primary" />
      <TouchableOpacity onPress={() => navigation.navigate('Login' as never)}>
        <Text style={styles.link}>Back to login</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const mapStateToProps = (state: any) => {
    console.log('state', state);
    
  return {
    authenticated: state.authentication.authenticated,
    forgotFormData: state.forgotPassword.forgotFormData,
    formErrors: state.forgotPassword.formErrors,
    isLoading: state.forgotPassword.isLoading,
  };
};

export default connect(mapStateToProps, actions)(ForgotPassword);

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
  button: {
    marginBottom: 20,
  },
  link: {
    color: '#007BFF',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
});
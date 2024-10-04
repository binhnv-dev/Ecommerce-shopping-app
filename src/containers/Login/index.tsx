/*
 *
 * Login
 *
 */

import React, { useCallback, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import actions from '../../actions';
import LoadingIndicator from '../../components/Common/LoadingIndicator';
import { debounce } from 'lodash';

interface Props {
  authenticated: boolean;
  loginFormData: {
    email: string;
    password: string;
  };
  loginChange: (name: string, value: string) => void;
  login: () => void;
  formErrors: Record<string, string>;
  isLoading: boolean;
  isSubmitting: boolean;
}

const Login: React.FC<Props> = ({
  authenticated,
  loginFormData,
  loginChange,
  login,
  formErrors,
  isLoading,
  isSubmitting,
}) => {
  const navigation = useNavigation();

  useEffect(() => {
    if (authenticated) {
      navigation.navigate('Home' as never);
    }

    return () => {};
  }, [authenticated, navigation]);

  const handleSubmit = () => {
    login();
  };

  const debouncedChangeHandler = useCallback(
    debounce((name: string, value: string) => {
      loginChange(name, value);
    }, 300),
    []
  );

  return (
    <View style={styles.container}>
      {isLoading && <LoadingIndicator />}
      <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Login</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          onChangeText={(value) => debouncedChangeHandler('email', value)}
          autoCapitalize="none"
          keyboardType="email-address"
          placeholderTextColor="#888"
        />
        {formErrors['email'] && <Text style={styles.error}>{formErrors['email']}</Text>}
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(value) => debouncedChangeHandler('password', value)}
          secureTextEntry
          placeholderTextColor="#888"
        />
        {formErrors['password'] && <Text style={styles.error}>{formErrors['password']}</Text>}
      </View>
      {/* <SignupProvider /> */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[styles.button, isSubmitting && styles.buttonDisabled]}
          onPress={handleSubmit}
          disabled={isSubmitting}
        >
          <Text style={styles.buttonText}>{isSubmitting ? 'Loading...' : 'Login'}</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.linkButton}
          onPress={() => navigation.navigate('Register' as never)}
        >
          <Text style={styles.linkButtonText}>Create an account</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.linkButton}
        onPress={() => navigation.navigate('Forgot Password' as never)}
      >
        <Text style={styles.linkButtonText}>Forgot Password?</Text>
      </TouchableOpacity>
    </View>
  );
};

const mapStateToProps = (state: any) => {
  return {
    authenticated: state.authentication.authenticated,
    loginFormData: state.login.loginFormData,
    formErrors: state.login.formErrors,
    isLoading: state.login.isLoading,
    isSubmitting: state.login.isSubmitting,
  };
};

export default connect(mapStateToProps, actions)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#f5f5f5',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
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
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonDisabled: {
    backgroundColor: '#aaa',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  linkButtonText: {
    color: '#007BFF',
    fontSize: 16,
  },
});
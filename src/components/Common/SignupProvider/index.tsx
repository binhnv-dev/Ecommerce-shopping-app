/**
 *
 * SignupProvider
 *
 */

import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { GoogleIcon, FacebookIcon } from '../Icon';

interface SignupProviderProps {
  onGoogleSignup?: () => void;
  onFacebookSignup?: () => void;
}

const SignupProvider: React.FC<SignupProviderProps> = ({ onGoogleSignup, onFacebookSignup }) => {
  return (
    <View style={styles.signupProvider}>
      <TouchableOpacity style={styles.googleBtn} onPress={onGoogleSignup}>
        <GoogleIcon />
        <Text style={styles.btnText}>Login with Google</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.facebookBtn} onPress={onFacebookSignup}>
        <FacebookIcon />
        <Text style={styles.btnText}>Login with Facebook</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  signupProvider: {
    // Add your styles here
    marginBottom: 20,
  },
  googleBtn: {
    // Add your styles for Google button here
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4285F4', // Example color
    padding: 10,
    borderRadius: 5,
  },
  facebookBtn: {
    // Add your styles for Facebook button here
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#3b5998', // Example color
    padding: 10,
    borderRadius: 5,
  },
  btnText: {
    color: '#FFFFFF', // Example text color
    marginLeft: 10,
  },
});

export default SignupProvider;
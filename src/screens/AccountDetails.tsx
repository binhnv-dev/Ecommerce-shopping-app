import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

const AccountDetails: React.FC<{ navigation: any }> = ({ navigation }) => {
  const { state } = useAuth();

  useEffect(() => {
    if (!state.isAuthenticated) {
      navigation.navigate('Login'); // Redirect to Login if not authenticated
    }
  }, [state.isAuthenticated]);

  return (
    <View>
      <Text>Account Details</Text>
      {/* Display user info here */}
    </View>
  );
};

export default AccountDetails;
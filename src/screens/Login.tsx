import React, {useState} from 'react';
import {View, Text, TextInput, Button, Alert} from 'react-native';
import {useAuth} from '../contexts/AuthContext';

const Login: React.FC<{navigation: any}> = ({navigation}) => {
  const {dispatch} = useAuth();
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');

  const handleLogin = () => {
    // Simulate an API call
    if (email === 'user@example.com' && password === 'password') {
      const userInfo = {name: 'User'};
      const token = 'sample_token';

      dispatch({
        type: 'LOGIN',
        payload: {userInfo, token},
      });

      navigation.navigate('AccountDetails');
    } else {
      Alert.alert('Login failed', 'Invalid email or password');
    }
  };

  return (
    <View>
      <Text>Login</Text>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default Login;

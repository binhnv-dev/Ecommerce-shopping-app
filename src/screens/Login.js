import React, { useState, useEffect, useMemo } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  TextInput,
  View,
  Text,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import Message from '../components/Message';
import Loader from '../components/Loader';

import { login } from '../redux/actions/userActions';

import COLORS from '../utils/constants/colors';

const Login = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const userLogin = useSelector(state => state.userLogin);

  const { loading, error, userInfo } = userLogin;

  const redirect = route.params;

  const redirectColone = useMemo(() => redirect, [redirect]);

  useEffect(() => {
    if (userInfo) {
      if (redirect) {
        navigation.navigate(redirectColone);
      } else {
        navigation.navigate('Home');
      }
    }
  }, [userInfo, redirectColone]);

  const loginUser = () => {
    if (email === '' || password === '') {
      Alert.alert('Empty Fields', 'Fields are empty!');
      return;
    }
    dispatch(login(email, password));
  };

  return (
    <SafeAreaView style={style.container}>
      {error && <Message>{error}</Message>}
      <View style={style.registerForm}>
        <Text style={style.appTitle}>Industrious</Text>

        <Text style={style.header}>Sign In</Text>

        <TextInput
          style={style.textInput}
          placeholder={'Email'}
          placeholderTextColor={COLORS.dark}
          underlineColorAndroid={'transparent'}
          value={email}
          onChangeText={value => setEmail(value)}
        />

        <TextInput
          style={style.textInput}
          placeholder={'Password'}
          secureTextEntry={true}
          placeholderTextColor={COLORS.dark}
          underlineColorAndroid={'transparent'}
          value={password}
          onChangeText={value => setPassword(value)}
        />

        {loading && <Loader />}

        <TouchableOpacity style={style.button} onPress={loginUser}>
          <Text style={style.buttonText}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() => navigation.navigate('Signup')}
        >
          <Text style={style.already}>Don't have an accout? Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: 40
  },
  appName: {
    alignSelf: 'center',
    fontSize: 30,
    color: COLORS.dark,
    marginBottom: 100,
  },
  registerForm: {
    alignSelf: 'stretch',
  },
  appTitle: {
    fontSize: 24,
    color: COLORS.dark,
    fontWeight: 'bold',
    paddingBottom: 10,
    marginBottom: 40,
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    color: COLORS.dark,
    paddingBottom: 10,
    marginBottom: 40,
    borderBottomColor: COLORS.dark,
    borderBottomWidth: 1,
  },
  textInput: {
    alignSelf: 'stretch',
    height: 40,
    marginBottom: 30,
    color: COLORS.dark,
    borderBottomColor: COLORS.dark,
    borderBottomWidth: 2,
  },
  button: {
    alignSelf: 'stretch',
    alignItems: 'center',
    padding: 12,
    backgroundColor: COLORS.dark,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: 'bold',
  },
  already: {
    color: COLORS.dark,
    fontSize: 15,
    alignSelf: 'center',
    marginTop: 10,
    fontWeight: 'bold',
  },
  image: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    color: COLORS.dark,
    backgroundColor: 'transparent'
  },
});

export default Login;

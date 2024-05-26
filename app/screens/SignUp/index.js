import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import {AlertHelper} from '../../utils/AlertHelper';
import api from '../../services/axiosClient';
import ReduxWrapper from '../../utils/ReduxWrapper';
import setToken from '../../utils/token';

function index({navigation, loginUser$}) {
  const [userInfo, setUserInfo] = useState({});
  const handleChange = (name, text) => {
    setUserInfo({...userInfo, [name]: text});
  };

  const handleSubmitAccount = async () => {
    try {
      const response = await api.post('/auth/register', userInfo);

      if (response?.data?.token) setToken(response?.data?.token);
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  };

  const onSignUp = async () => {
    const {email, password, firstName, lastName} = userInfo;

    if (!email || !password || !firstName || !lastName) {
      AlertHelper.show('error', 'All fields are required');
      return;
    }

    await handleSubmitAccount().then(() => {
      loginUser$({email, name: `${firstName} ${lastName}`});
      AlertHelper.show('success', 'Signup Success, Welcome to Ecommerce');
      navigation.navigate('Home');
    }).catch((error) => {
      AlertHelper.show('error', error.message);
    });
  };
  return (
    <Container isScrollable>
      <Pressable
        onPress={() => navigation.goBack()}
        style={{marginTop: scale(30)}}>
        <Feather name={'chevron-left'} size={scale(25)} />
      </Pressable>
      <View
        style={{
          marginTop: scale(30),
          backgroundColor: appColors.white,
          ...shadow,
          padding: scale(15),
          borderRadius: scale(5),
        }}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
          }}>
          <Label
            text="Sign Up"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Sign in to Continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => handleChange('firstName', text)}
            label="First Name"
            placeholder="John"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => handleChange('lastName', text)}
            label="Last Name"
            placeholder="Doe"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => handleChange('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => handleChange('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
          />
        </View>
        <CustomButton onPress={onSignUp} label="Sign up" />
      </View>
    </Container>
  );
}

export default ReduxWrapper(index);

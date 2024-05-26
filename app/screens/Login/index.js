/*
 *
 * Login
 *
 */
import React, {useState} from 'react';
import {View, Text, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import {AlertHelper} from '../../utils/AlertHelper';

import googleLogin from '../../services/googleLogin';
import ReduxWrapper from '../../utils/ReduxWrapper';
import api from '../../services/axiosClient';
import setToken from '../../utils/token';

function index({getProductsList$, loginUser$, navigation}) {
  const [credentials, setCredentials] = useState({});
  const [isloading, setisloading] = useState(false);

  const onGoogleLogin = async () => {
    const {user, additionalUserInfo} = await googleLogin();
    const {email, displayName, uid, photoURL} = user;
    if (additionalUserInfo?.isNewUser) {
    }
    getProductsList$();
    loginUser$({email, name: displayName, uid, photoURL});
  };

  const handleLoginAction = async (email, password) => {
    try {
      const response = await api.post('/auth/login', {email, password});

      if (response?.data?.user) {
        const {email, firstName, lastName} = response?.data?.user;
        setisloading(false);
        AlertHelper.show('success', 'Welcome to Ecommerce');
        navigation.navigate('Home');
        loginUser$({
          email: email,
          name: `${firstName} ${lastName}`,
        });
        setToken(response?.data?.token);
        getProductsList$();
      }
    } catch (error) {
      if (error.response) {
        AlertHelper.show('error', error.response.data.error);
      }
      setisloading(false);
    }
  };

  const onLogin = async () => {
    const {email, password} = credentials;
    try {
      if (email && password) {
        setisloading(true);

        await handleLoginAction(email, password);
      } else {
        AlertHelper.show('error', 'Email and password is required!!');
      }
    } catch (error) {
      AlertHelper.show('error', 'Something went wrong');
    }
  };

  const onChangeText = (name, text) => {
    setCredentials({...credentials, [name]: text});
  };

  return (
    <Container isScrollable>
      <View
        style={{
          marginTop: scale(50),
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
            text="Welcome,"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
          <Pressable onPress={() => navigation.navigate('SignUp')}>
            <Label
              text="Sign Up"
              style={{
                fontSize: scale(14),
                fontWeight: '500',
                color: appColors.primary,
              }}
            />
          </Pressable>
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
            onChangeText={(text) => onChangeText('email', text)}
            keyboardType="email-address"
            label="Email"
            placeholder="john@doe.com"
          />
        </View>
        <View style={{paddingVertical: scale(10)}}>
          <CustomInput
            onChangeText={(text) => onChangeText('password', text)}
            secureTextEntry
            label="Password"
            placeholder="Password"
            // value="*******"
          />
        </View>
        <Pressable
          onPress={() => navigation.navigate('Verification')}
          style={{
            flexDirection: 'row',
            justifyContent: 'flex-end',
            paddingVertical: scale(10),
          }}>
          <Label
            text="Forgot password"
            style={{
              fontSize: scale(14),
              // fontWeight: '500',
            }}
          />
        </Pressable>
        <CustomButton isLoading={isloading} onPress={onLogin} label="Sign in" />
      </View>
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          paddingVertical: scale(20),
        }}>
        <Label
          text="-OR-"
          style={{
            fontSize: scale(18),
            //fontWeight: '500',
          }}
        />
      </View>
      <CustomButton
        onPress={onGoogleLogin}
        icon="google"
        label="Login with Google"
        unFilled
      />
    </Container>
  );
}

export default ReduxWrapper(index);

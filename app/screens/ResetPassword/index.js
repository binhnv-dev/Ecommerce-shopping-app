/*
 *
 * Verify email screen
 *
 */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/axiosClient';
import {AlertHelper} from '../../utils/AlertHelper';
import {scale} from 'react-native-size-matters';
import ReduxWrapper from '../../utils/ReduxWrapper';

function index({navigation, auth: {resetToken}}) {
  const [credential, setCredential] = React.useState({});

  const onChangeText = (name, text) => {
    setCredential({...credential, [name]: text});
  };

  const validatePassword = () => {
    const {password, confirmPassword} = credential;
    if (password !== confirmPassword) {
      AlertHelper.show('error', 'Password does not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!credential) {
      AlertHelper.show('error', 'Please enter your password');
      return;
    }
    const isValid = validatePassword();

    if (!isValid) return;

    await api
      .post(`/auth/reset/${resetToken}`, {...credential})
      .then((res) => {
        if (res.data?.success) {
          AlertHelper.show('success', 'Password reset successfully');
          navigation.navigate('Login');
        }
      })
      .catch((err) => {
        AlertHelper.show('error', err.response.data.error);
        console.log('error', err);
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
          marginTop: scale(70),
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
            text="Reset Password"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="Enter your new password"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>

        <View style={{paddingVertical: scale(5)}}>
          <CustomInput
            onChangeText={(text) => onChangeText('password', text)}
            label="Password"
            placeholder="Your new password"
            secureTextEntry
          />
        </View>
        <View style={{paddingVertical: scale(5)}}>
          <CustomInput
            onChangeText={(text) => onChangeText('confirmPassword', text)}
            label="Confirm Password"
            placeholder="Your confirm password"
            secureTextEntry
          />
        </View>
        <CustomButton onPress={handleSubmit} label="Submit" />
      </View>
    </Container>
  );
}

export default ReduxWrapper(index);

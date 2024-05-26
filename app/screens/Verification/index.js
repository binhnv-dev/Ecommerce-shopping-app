/*
 *
 * Verify email screen
 *
 */
import React from 'react';
import {View, Text, Pressable} from 'react-native';
import {scale} from 'react-native-size-matters';
import Container from '../../components/Container';
import CustomInput from '../../components/CustomInput';
import CustomButton from '../../components/CustomButton';
import Label from '../../components/Label';
import {appColors, shadow} from '../../utils/appColors';
import Feather from 'react-native-vector-icons/Feather';
import api from '../../services/axiosClient';
import {AlertHelper} from '../../utils/AlertHelper';
import ReduxWrapper from '../../utils/ReduxWrapper';
import {useApi} from '../../hooks/useApi';

function index({navigation, resetPassword$}) {
  const [email, setEmail] = React.useState('');
  const [code, setCode] = React.useState('');
  const [isSentCode, setIsSentCode] = React.useState(false);

  const { isProcessing, handleApiCall } = useApi();

  const onChangeText = (text) => {
    setEmail(text);
  };

  const onChangeCode = (text) => {
    setCode(text);
  }

  const handleSentCode = () => {
    handleApiCall('/auth/verify-email', {email}, (data) => {
      setIsSentCode(true);
      AlertHelper.show('success', 'Code was sent to your email');
    });
  };
  
  const handleVerifyCode = () => {
    handleApiCall('/auth/verify-code', {code}, (data) => {
      AlertHelper.show('success', 'Code verified successfully');
      resetPassword$(data?.token);
      navigation.navigate('ResetPassword');
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
            text="Verification"
            style={{fontSize: scale(30), fontWeight: '700'}}
          />
        </View>
        <View style={{paddingVertical: scale(15)}}>
          <Label
            text="A 6 - Digit PIN has been sent to your email  address, enter your email below to continue"
            style={{
              fontSize: scale(16),
              //fontWeight: '500',
              color: appColors.darkGray,
            }}
          />
        </View>

        {!isSentCode ? (
          <>
            <View style={{paddingVertical: scale(5)}}>
              <CustomInput
                onChangeText={onChangeText}
                keyboardType="email-address"
                label="Email"
                placeholder="john@doe.com"
                value={email}
              />
            </View>
            <CustomButton onPress={handleSentCode} label="Continue" isLoading={isProcessing} />
          </>
        ) : (
          <>
            <View style={{paddingVertical: scale(5)}}>
              <CustomInput
                onChangeText={onChangeCode}
                label="Code"
                placeholder="xxxxxx"
                value={code}
              />
            </View>
            <CustomButton onPress={handleVerifyCode} label="Verify" isLoading={isProcessing} />
          </>
        )}
      </View>
    </Container>
  );
}

export default ReduxWrapper(index);

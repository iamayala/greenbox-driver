import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Text,
  Keyboard,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  ScrollView,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import styled from '../../style/styles';
import colors from '../../constants/colors';
import AppButton from '../../component/AppButton';
import fonts from '../../constants/fonts';
import { baseURL, get, post } from '../../utils/Api';
import ToastMessage from '../../component/ToastMessage';
import { storeLocalData } from '../../utils/Helpers';

function Login({ navigation }) {
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hidepwd, setHidepwd] = useState(true);

  const verifyPhone = (e) => {
    const dstPhone = e.split('');
    if (dstPhone.length < 9) {
      setError('Please make sure the phone number is valid');
    } else if (dstPhone[0] !== '7') {
      setError('Please use the right format ex. 7xxxxxxxx');
    } else {
      handleLogin();
    }
  };

  const handleLogin = () => {
    // navigation.navigate('OTP');
    setLoading(true);
    post(`${baseURL}/login`, {
      customer_phone_number: `+250${phone}`,
      customer_password: password,
    })
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 404) {
          setError('Wrong credentials. Please try again!');
          setLoading(false);
        } else if (res.data.status == 200) {
          handleSaveToLocal(res.data.data);
        }
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError('An error occurred! Try again!');
      });
  };

  const handleSaveToLocal = (data) => {
    storeLocalData('@USERDATA', data)
      .then(() => {
        navigation.navigate('MainStack');
        setLoading(false);
      })
      .catch((err) => {
        setError('Something went wrong! Please try again!');
        setPhone(''), setPassword('');
        setLoading(false);
      });
  };

  return (
    <AppScreen>
      {error && (
        <ToastMessage
          label={error}
          style={{ backgroundColor: colors.danger }}
          onPress={() => setError(null)}
        />
      )}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'position' : undefined}
        keyboardVerticalOffset={80}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ paddingHorizontal: 20 }}
            keyboardShouldPersistTaps="always">
            <View style={{ height: 200 }} />
            <Text style={styled.header}>Login</Text>
            <Text style={[styled.subheader, { marginBottom: 25 }]}>
              Enter your phone number and password
            </Text>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Phone Number</Text>
              <View style={styled.inputField}>
                <Text style={[styled.label, { color: colors.textDark, marginRight: 10 }]}>
                  +250
                </Text>
                <TextInput
                  style={styled.textInput}
                  keyboardType="phone-pad"
                  maxLength={9}
                  placeholder="Phone"
                  onChangeText={(e) => setPhone(e)}
                />
              </View>
            </View>

            <View style={{ marginVertical: 10 }}>
              <Text style={styled.label}>Password</Text>
              <View style={styled.inputField}>
                <TextInput
                  style={styled.textInput}
                  secureTextEntry={hidepwd}
                  placeholder="Password"
                  onChangeText={(e) => setPassword(e)}
                />
                <TouchableOpacity onPress={() => setHidepwd(!hidepwd)}>
                  <Feather name={hidepwd ? 'eye-off' : 'eye'} size={16} color={colors.iconDark} />
                </TouchableOpacity>
              </View>
            </View>

            <View style={{ height: 180, justifyContent: 'space-between' }}>
              <TouchableOpacity style={{ marginTop: 10, marginBottom: 15 }}>
                <Text
                  style={{ fontFamily: fonts.medium, color: colors.textGrey, textAlign: 'right' }}>
                  Forgot Password{' '}
                </Text>
              </TouchableOpacity>

              <AppButton
                onPress={
                  phone == '' || password == '' || loading ? () => {} : () => verifyPhone(phone)
                }
                style={{
                  backgroundColor: phone == '' || password == '' ? colors.textGrey : colors.primary,
                }}
                label="Login"
                loading={loading}
              />

              <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
                <Text
                  style={{
                    color: colors.textDark,
                    fontFamily: fonts.medium,
                    textAlign: 'center',
                    marginTop: 25,
                  }}>
                  Don't have an account?{' '}
                  <Text style={{ color: colors.primary, textDecorationLine: 'underline' }}>
                    Create Account
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </AppScreen>
  );
}

export default Login;

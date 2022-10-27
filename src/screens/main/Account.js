import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity } from 'react-native';
import AccountItem from '../../component/AccountItem';
import AppButton from '../../component/AppButton';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { emojis } from '../../constants/utils';
import { baseURL, get } from '../../utils/Api';
import { getLocalData } from '../../utils/Helpers';
import Modal from 'react-native-modal';
import PromptModal from '../../component/PromptModal';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  topBtn: {
    height: 40.67,
    width: 40.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: colors.backgroundGrey,
    borderWidth: 1,
  },
});

function Account({ navigation }) {
  const [profile, setProfile] = useState(null);
  const [logoutmodal, setlogoutmodal] = useState(false);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    getLocalData('@USERDATA').then((res) => {
      // console.log(res[0]);
      setProfile(res[0]);
    });
  }, []);

  const handleLogout = () => {
    setloading(true);
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Account</Text>
      </View>
      <Modal isVisible={logoutmodal}>
        <PromptModal
          text="You are about to logout of your account. Please confirm this action."
          yes={() => {
            setlogoutmodal(false);
            handleLogout();
          }}
          no={() => setlogoutmodal(false)}
        />
      </Modal>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100, paddingHorizontal: 20 }}
        showsVerticalScrollIndicator={false}>
        <View
          style={{ flexDirection: 'row', marginTop: 10, alignItems: 'center', marginBottom: 15 }}>
          <View
            style={{
              height: 70,
              width: 70,
              borderColor: colors.primary,
              borderWidth: 1,
              backgroundColor: colors.lightGreen,
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 17,
            }}>
            <Image
              source={{ uri: emojis.grape }}
              style={{
                height: 35,
                width: 35,
              }}
            />
          </View>
          <View style={{ marginHorizontal: 15, flex: 1 }}>
            <Text style={[styles.text, { fontSize: 17, textTransform: 'capitalize' }]}>
              {profile?.customer_username}
            </Text>
            <Text
              style={[
                styles.text,
                { fontSize: 16, color: colors.textGrey, fontFamily: fonts.regular },
              ]}>
              {profile?.customer_phone_number}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate('Profile')}
            style={[styles.topBtn, { display: 'none' }]}>
            <Feather name="edit-2" size={18} color={colors.iconDark} />
          </TouchableOpacity>
        </View>
        <AccountItem
          icon="box"
          label="orders"
          onPress={() => navigation.navigate('Orders', { customer_id: profile.customer_id })}
        />
        {/* <AccountItem icon="smile" label="my details" /> */}
        {/* <AccountItem icon="credit-card" label="payment methods" /> */}
        <AccountItem
          icon="map-pin"
          label="delivery address"
          onPress={() => navigation.navigate('Address', { profile: profile })}
        />
        <AccountItem
          icon="bell"
          label="notifications"
          onPress={() => navigation.navigate('Notification')}
          badge={2}
        />
        <AccountItem icon="help-circle" label="help" onPress={() => navigation.navigate('Help')} />
        <AccountItem icon="info" label="about" onPress={() => navigation.navigate('About')} />
        <AppButton
          label="Logout"
          style={{ backgroundColor: colors.danger, marginTop: 45 }}
          onPress={loading ? () => {} : () => setlogoutmodal(true)}
          loading={loading}
        />
      </ScrollView>
    </AppScreen>
  );
}

export default Account;

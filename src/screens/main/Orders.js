import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import AppButton from '../../component/AppButton';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import ProductCard from '../../component/ProductCard';
import AddressItem from '../../component/AddressItem';
import NotificationItem from '../../component/NotificationItem';
import OrderCard from '../../component/OrderCard';
import { emojis } from '../../constants/utils';

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
  },
  name: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  subname: {
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textGrey,
  },
  tab: {
    backgroundColor: colors.primary,
    height: 45,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
  },
});

function Orders({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [location, setLocation] = useState([1, 2]);
  const [tab, setTab] = useState(1);

  const Tab = ({ label, onPress, active }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.tab, { backgroundColor: active ? colors.primary : colors.borderGrey }]}>
        <Text
          style={[styles.name, { fontSize: 15, color: active ? colors.white : colors.textDark }]}>
          {label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 18 }]}>Orders</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          marginBottom: 10,
        }}>
        <Tab label="Active" active={tab == 1} onPress={() => setTab(1)} />
        <Tab label="Completed" active={tab == 2} onPress={() => setTab(2)} />
        <Tab label="Cancelled" active={tab == 3} onPress={() => setTab(3)} />
      </View>
      <View style={{ marginBottom: 10, flex: 1 }}>
        <FlatList
          data={location}
          renderItem={({ item }) => {
            return (
              <OrderCard
                emoji={
                  tab == 1
                    ? emojis.orderActive
                    : tab == 2
                    ? emojis.orderComplete
                    : tab == 3
                    ? emojis.orderCancelled
                    : ''
                }
              />
            );
          }}
        />
      </View>
    </AppScreen>
  );
}

export default Orders;

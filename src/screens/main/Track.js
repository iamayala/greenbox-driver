import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
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
import NoData from '../../component/NoData';
import { emojis, formatDate } from '../../constants/utils';
import { baseURL, get } from '../../utils/Api';
import Tracker from '../../component/Tracker';

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
});

function Track({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [item, setitem] = useState(route.params.item);
  const [order, setorder] = useState(null);
  //   console.log(item);

  useEffect(() => {
    get(`${baseURL}/order/id/${item.order_id}`).then((res) => {
      if (res.data.message == 'success' && res.data.data[0]) {
        var result = res.data.data[0];
        setorder({ ...result, basket: JSON.parse(result.basket) });
      }
    });
  }, []);

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
        <Text style={[styles.text, { fontSize: 18 }]}>Order #{item.order_id}</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Tracker
          header="Your order was placed"
          subheader="We are picking the best items to pack your order"
          active={order.order_status == 1 ? true : false}
          time={order.placed_on && formatDate(order?.placed_on)}
        />
        <Tracker
          header="Order packed"
          subheader="We are currently packing your order on our fleet. We should take off soon."
          active={order.order_status == 2 ? true : false}
          time={order.completed_on && formatDate(order?.completed_on)}
        />
        <Tracker
          header="Driver on the way"
          subheader="Our driver is on his maximum speed to delivery your order, please be patient."
          active={order.order_status == 3 ? true : false}
          time={order.completed_on && formatDate(order?.completed_on)}
        />
        <Tracker
          header="Driver reached destination"
          subheader="Knock Knock! our driver is at the specified location, please receive your order."
          active={order.order_status == 4 ? true : false}
          time={order.completed_on && formatDate(order?.completed_on)}
        />
        <Tracker
          header="Order Completed"
          subheader="Thank you for using GreenBox, please remember to rate the service. Enjoy!"
          time={order.completed_on && formatDate(order?.completed_on)}
          active={order.order_status == 5 ? true : false}
        />

        {order.order_status < 3 && (
          <AppButton
            label="Cancel Order"
            style={{ marginHorizontal: 20, backgroundColor: colors.danger }}
          />
        )}

        {order.order_status == 5 && (
          <AppButton label="Rate and Review" style={{ marginHorizontal: 20 }} />
        )}
      </ScrollView>
    </AppScreen>
  );
}

export default Track;

import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from 'react-native';
import AppButton from '../../component/AppButton';
import AppScreen from '../../component/AppScreen';
import CartItem from '../../component/CartItem';
import NoData from '../../component/NoData';
import SearchInput from '../../component/SearchInput';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { emojis } from '../../constants/utils';
import { baseURL, get } from '../../utils/Api';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
});

function Cart() {
  const [cart, setCart] = useState(null);

  // useEffect(() => {
  //   // handleFetchTypes();
  // }, []);

  // // fetch categories
  // const handleFetchTypes = () => {
  //   get(`${baseURL}/vegetabletype`)
  //     .then((res) => {
  //       // setCart(res.data.data);
  //     })
  //     .catch((err) => {
  //       setError('Something went wrong!');
  //     });
  // };
  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>My Bag</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={cart}
          nestedScrollEnabled
          style={{ paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <NoData
                style={{ selfAlign: 'center' }}
                label="Oops! looks like your cart is Empty!"
                emoji={emojis.eyes}
              />
            );
          }}
          renderItem={({ item }) => {
            return <CartItem item={item} />;
          }}
        />
        {cart && (
          <View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginHorizontal: 15,
                marginVertical: 10,
              }}>
              <Text style={[styles.text, { fontSize: 18, color: colors.textGrey }]}>Subtotal</Text>
              <Text style={[styles.text, { fontSize: 18 }]}>RWF 3000</Text>
            </View>
            <AppButton label="Go to checkout" style={{ marginHorizontal: 15 }} />
          </View>
        )}
      </ScrollView>
    </AppScreen>
  );
}

export default Cart;

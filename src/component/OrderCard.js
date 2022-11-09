import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Feather } from '@expo/vector-icons';
import { emojis, formatDate, formatPrice } from '../constants/utils';
import AppButton from './AppButton';

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 17,
    flexDirection: 'row',
    marginTop: 10,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    marginHorizontal: 20,
  },
  text: {
    fontWeight: 'bold',
    textTransform: 'capitalize',
    fontFamily: fonts.medium,
    fontSize: 16,
  },
});

const OrderCard = ({ onPress, style, action, item }) => {
  return (
    <View style={[styles.container, { style }]}>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View style={{ flex: 1 }}>
            <Text style={[styles.text, { textTransform: 'none', marginRight: 10 }]}>
              Order #{item.order_id}
            </Text>
            {item.basket?.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: 5,
                  }}>
                  <View
                    style={{
                      height: 10,
                      width: 10,
                      borderRadius: 3,
                      backgroundColor: colors.lightGreen,
                    }}
                  />
                  <Text style={[styles.text, { fontSize: 15, marginLeft: 7 }]}>
                    {item.vegetable_name} - {item.quantity} {item.unit_short}
                  </Text>
                </View>
              );
            })}
          </View>
          {action && (
            <AppButton
              onPress={onPress}
              label="Start"
              style={{ height: 33, paddingHorizontal: 15, borderRadius: 8, marginTop: 0 }}
            />
          )}
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 10,
            borderTopColor: colors.backgroundGrey,
            borderTopWidth: 1,
            paddingTop: 5,
          }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={[styles.text, { fontSize: 14, color: colors.textGrey }]}>
              Order Destination
            </Text>
            <Text style={[styles.text, { fontSize: 14, color: colors.textDark }]}>
              {item.delivery_address}
            </Text>
          </View>
          <View
            style={{
              alignItems: 'flex-end',
            }}>
            <Text style={[styles.text, { fontSize: 14, color: colors.textGrey }]}>Date Placed</Text>
            <Text
              style={[
                styles.text,
                {
                  fontSize: 13,
                  fontFamily: fonts.bold,
                  textTransform: 'capitalize',
                  color: colors.orange,
                },
              ]}>
              {formatDate(item.placed_on)}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default OrderCard;

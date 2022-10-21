import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import { width } from '../constants/dimensions';
import fonts from '../constants/fonts';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    paddingVertical: 10,
    // paddingHorizontal: 15,
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    // alignItems: 'center',
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  text: {
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  topBtn: {
    height: 36.67,
    width: 36.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const CartItem = ({ item, style }) => {
  const [number, setNumber] = useState(1);
  return (
    <View style={[styles.container, style]}>
      <Image
        source={{ uri: item.vegetable_image }}
        style={{
          width: 99.11,
          height: 99.11,
          backgroundColor: 'red',
          borderRadius: 17,
        }}
      />
      <View
        style={{
          flex: 1,
          marginHorizontal: 10,
          justifyContent: 'space-between',
          paddingVertical: 5,
        }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <View>
            <Text style={[styles.text, { fontSize: 17 }]}>Product Name</Text>
            <Text style={[styles.text, { color: colors.textGrey, fontSize: 14 }]}>
              Product details
            </Text>
          </View>
          <TouchableOpacity>
            <Feather name="x" size={18} color={colors.iconGrey} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <TouchableOpacity onPress={() => controller('remove')} style={styles.topBtn}>
              <Feather name="minus" size={18} color={colors.iconGrey} />
            </TouchableOpacity>
            <View
              style={[
                styles.topBtn,
                {
                  borderColor: colors.backgroundGrey,
                  borderWidth: 1,
                  backgroundColor: 'transparent',
                },
              ]}>
              <Text style={{ fontFamily: fonts.medium }}>{number}</Text>
            </View>
            <TouchableOpacity onPress={() => controller('add')} style={styles.topBtn}>
              <Feather name="plus" size={18} color={colors.primary} />
            </TouchableOpacity>
          </View>
          <Text style={[styles.text, { fontSize: 17, textTransform: 'uppercase' }]}>RWF 300</Text>
        </View>
      </View>
    </View>
  );
};

export default CartItem;

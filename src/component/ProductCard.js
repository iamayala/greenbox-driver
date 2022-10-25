import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import styled from '../style/styles';
import { Feather } from '@expo/vector-icons';

const styles = StyleSheet.create({
  card: {
    height: 238.51,
    width: 173.32,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: colors.borderGrey,
    marginHorizontal: 7,
  },
  header: {
    fontSize: 16,
    color: colors.textDark,
    fontFamily: fonts.medium,
  },
  subHeader: {
    fonts: 14,
    color: colors.textGrey,
    fontFamily: fonts.regular,
  },
  button: {
    height: 45.67,
    width: 45.67,
    borderRadius: 17,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  price: {
    fontSize: 16,
    fontFamily: fonts.bold,
    color: colors.textDark,
    flex: 1,
  },
});

const ProductCard = ({ item, onPress, style, checked }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.card, style]}>
      <Image
        source={{
          uri: item.vegetable_image,
        }}
        style={{ height: 140, width: '100%', borderTopLeftRadius: 14, borderTopRightRadius: 14 }}
      />
      <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
        <Text numberOfLines={1} style={styles.header}>
          {item?.vegetable_name}
        </Text>
        <Text numberOfLines={1} style={styles.subHeader}>
          1 {item?.unit_short}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            height: 45.67,
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <Text style={styles.price}>RWF {item?.price}</Text>
          <TouchableOpacity
            style={[
              styles.button,
              { display: 'none', backgroundColor: checked ? colors.danger : colors.primary },
            ]}>
            <Feather name={checked ? 'x' : 'plus'} size={24} color={colors.white} />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ProductCard;

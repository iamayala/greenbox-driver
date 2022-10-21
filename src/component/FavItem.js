import React, { useState } from 'react';
import { Image, StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { AntDesign, Feather } from '@expo/vector-icons';

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

const FavItem = ({ item, style }) => {
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
            <AntDesign name="heart" size={18} color={colors.danger} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 15,
          }}>
          <Text style={[styles.text, { fontSize: 16, textTransform: 'uppercase' }]}>RWF 300</Text>
          <TouchableOpacity>
            <Text style={[styles.text, { fontSize: 14, color: colors.textGrey }]}>
              Add to basket
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default FavItem;

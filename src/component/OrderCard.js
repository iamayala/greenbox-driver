import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View, Image } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { Feather } from '@expo/vector-icons';
import { emojis } from '../constants/utils';

const styles = StyleSheet.create({
  container: {
    borderRadius: 13,
    // alignItems: 'center',
    padding: 15,
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

const OrderCard = ({ onPress, style, emoji }) => {
  return (
    <TouchableOpacity onPress={onPress} style={[styles.container, { style }]}>
      <View
        style={{
          height: 40,
          width: 40,
          borderRadius: 50,
          marginTop: 5,
          borderColor: colors.primary,
          borderWidth: 1.25,
          justifyContent: 'center',
          alignItems: 'center',
          marginRight: 15,
          backgroundColor: colors.lightGreen,
        }}>
        <Image source={{ uri: emoji }} style={{ height: 20, width: 20 }} />
      </View>
      <View style={{ flex: 1 }}>
        <View
          style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={styles.text}>Cheese and more...</Text>
          <Text
            style={[
              styles.text,
              { fontSize: 12, color: colors.textGrey, textTransform: 'uppercase' },
            ]}>
            ID: 124039242
          </Text>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={[styles.text, { fontSize: 14, color: colors.textGrey }]}>Status</Text>
            <Text style={[styles.text, { fontSize: 14, color: colors.orange }]}>Accepted</Text>
          </View>
          <View
            style={{
              flex: 1,
            }}>
            <Text style={[styles.text, { fontSize: 14, color: colors.textGrey }]}>
              Est. Arrival
            </Text>
            <Text style={[styles.text, { fontSize: 14, color: colors.textDark }]}>10 min</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default OrderCard;

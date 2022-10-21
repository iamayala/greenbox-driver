import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Feather } from '@expo/vector-icons';
import fonts from '../constants/fonts';
import colors from '../constants/colors';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    height: 60,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.textDark,
    fontSize: 16,
    flexDirection: 'row',
    flex: 1,
    marginHorizontal: 20,
    textTransform: 'capitalize',
  },
});

export const AccountItem = ({ icon, label, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, style]} onPress={onPress}>
      <Feather name={icon} size={20} color={colors.iconDark} />
      <Text style={styles.text}>{label}</Text>
      <Feather name="chevron-right" size={18} color={colors.iconDark} />
    </TouchableOpacity>
  );
};

export default AccountItem;

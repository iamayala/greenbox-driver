import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../constants/colors';
import fonts from '../constants/fonts';
import { emojis } from '../constants/utils';
// import styles from '../style/styles';

const styles = StyleSheet.create({
  modal: {
    borderRadius: 15,
    paddingHorizontal: 15,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
  },
  text: {
    fontFamily: fonts.medium,
    color: colors.textDark,
    color: colors.white,
    fontSize: 17,
    textAlign: 'center',
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 45,
    backgroundColor: colors.danger,
    borderRadius: 15,
    justifyContent: 'center',
    marginHorizontal: 5,
    marginBottom: 5,
    paddingHorizontal: 20,
  },
  bg: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: colors.textDark,
    opacity: 0,
  },
});

function PromptModal({ title, subtitle, yes, no, emoji, no_text, yes_text }) {
  return (
    <View style={{ flex: 1, justifyContent: 'center' }}>
      <View style={styles.bg}></View>
      <View style={[styles.modal, { marginHorizontal: 20 }]}>
        <Image source={{ uri: emoji }} style={{ height: 45, width: 45 }} />
        <Text
          style={[
            styles.text,
            {
              marginBottom: 5,
              marginTop: 10,
              color: colors.textDark,
              fontSize: 22,
              fontFamily: fonts.bold,
            },
          ]}>
          {title}
        </Text>
        <Text style={[styles.text, { marginBottom: 20, color: colors.textGrey }]}>{subtitle}</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <TouchableOpacity onPress={no} style={styles.btn}>
            <Text style={styles.text}>{no_text}</Text>
            <Image source={{ uri: emojis.no }} style={{ height: 18, width: 18, marginLeft: 10 }} />
          </TouchableOpacity>
          <TouchableOpacity onPress={yes} style={[styles.btn, { backgroundColor: colors.primary }]}>
            <Text style={styles.text}>{yes_text}</Text>
            <Image source={{ uri: emojis.yes }} style={{ height: 18, width: 18, marginLeft: 10 }} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

export default PromptModal;

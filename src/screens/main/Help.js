import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  KeyboardAvoidingView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  TextInput,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import styled from '../../style/styles';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import { height, width } from '../../constants/dimensions';

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
  messageView: {
    backgroundColor: colors.borderGrey,
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 10,
    // alignSelf: 'left',
    maxWidth: width * 0.7,
  },
  textMessage: {
    fontFamily: fonts.medium,
    fontSize: 15,
  },
  inputField: {
    height: 40.67,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.backgroundGrey,
    borderRadius: 14,
    marginRight: 10,
    paddingHorizontal: 15,
    fontFamily: fonts.medium,
  },
});

function Help({ route, navigation }) {
  const [alert, setAlert] = useState(null);
  const [selectedQuestion, setselectedQuestion] = useState(null);
  const [questions, setquestions] = useState([
    {
      senderId: 2,
      question: "I can't find my mayonnaise. And I can't eat my food without it.",
      answer: 'This is just an answer',
    },
    { senderId: 2, question: 'Please, help!', answer: 'This is just an answer' },
    {
      senderId: 0,
      question: 'We are working on that, please bare with us. Thank you!',
      answer: 'This is just an answer',
    },
  ]);

  const senderMessage = ({ item }) => {
    return (
      <View
        style={[
          styles.messageView,
          {
            backgroundColor: item.senderId == 0 ? colors.borderGrey : colors.primary,
            alignSelf: item.senderId == 0 ? 'left' : 'flex-end',
          },
        ]}>
        <Text
          style={[
            styles.textMessage,
            {
              color: item.senderId == 0 ? colors.textDark : colors.white,
            },
          ]}>
          {item.message}
        </Text>
        <Text
          style={[
            styles.textMessage,
            {
              fontSize: 11,
              color: colors.iconGrey,
              textAlign: 'right',
              marginTop: 3,
              color: item.senderId == 0 ? colors.textDark : colors.white,
            },
          ]}>
          now
        </Text>
      </View>
    );
  };

  const renderQuestion = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => setselectedQuestion(item)}
        style={{ paddingVertical: 20, borderBottomColor: colors.borderGrey, borderBottomWidth: 1 }}>
        <View
          style={{
            // height: 50,
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: 'row',
          }}>
          <Text
            style={{ fontFamily: fonts.medium, color: colors.textDark, flex: 1, marginRight: 5 }}>
            {item.question}
          </Text>
          <Feather
            name={item == selectedQuestion ? 'chevron-up' : 'chevron-down'}
            size={18}
            color={colors.iconDark}
          />
        </View>
        {item == selectedQuestion && (
          <Text style={{ fontFamily: fonts.regular, color: colors.textGrey, marginTop: 5 }}>
            {item.answer}
          </Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {alert && <ToastMessage label={alert} onPress={() => setAlert(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <Text style={[styles.text, { fontSize: 18 }]}>Support</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', display: 'none' }}>
            <View
              style={{
                height: 7,
                width: 7,
                borderRadius: 10,
                marginRight: 5,
                backgroundColor: colors.success,
              }}
            />
            <Text style={[styles.text, { fontSize: 11, color: colors.success }]}>Online</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={questions}
        contentContainerStyle={{ paddingHorizontal: 20, paddingTop: 5 }}
        renderItem={renderQuestion}
      />
    </AppScreen>
  );
}

export default Help;

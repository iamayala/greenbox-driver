import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
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
import { emojis } from '../../constants/utils';
import { width } from '../../constants/dimensions';

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

function Recover({ route, navigation }) {
  const [message, setMessage] = useState(null);
  const [location, setLocation] = useState([]);

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
        <Text style={[styles.text, { fontSize: 18 }]}>Recover account</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>

      <View
        style={{
          paddingHorizontal: 20,
          flex: 1,
        }}>
        <View style={{ alignItems: 'center', paddingTop: 50 }}>
          <Image source={{ uri: emojis.eyes }} style={{ height: 80, width: 80 }} />
          <Text style={[styles.text, { marginVertical: 15 }]}>Recover Account</Text>
          <Text style={[styles.subname, { marginVertical: 15, textAlign: 'center' }]}>
            Looks like this account was deleted, would you like to recover it?
          </Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <AppButton
            label="Create New"
            style={{ width: width * 0.43, backgroundColor: colors.borderGrey }}
            onPress={() => navigation.navigate('HomeNavigation')}
          />
          <AppButton
            label="Recover"
            style={{ width: width * 0.43 }}
            onPress={() =>
              this.props.navigation.reset({
                index: 0,
                routes: [{ name: 'HomeNavigation' }],
              })
            }
          />
        </View>
      </View>
    </AppScreen>
  );
}

export default Recover;

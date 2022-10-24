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
import styled from '../../style/styles';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import AddressItem from '../../component/AddressItem';
import Modal from 'react-native-modal';
import { sector } from '../../constants/location';

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

function Address({ route, navigation }) {
  const [profile, setprofile] = useState(route.params.profile);
  const [message, setMessage] = useState(null);
  const [location, setLocation] = useState([]);
  const [modalVisible, setmodalVisible] = useState(false);
  const [selectedSector, setselectedSector] = useState(null);

  const addLocation = () => {
    var locs = location;
    locs.push(profile.customer_sector);
    setLocation(locs);
  };

  useEffect(() => {
    // addLocation();
  }, []);

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
        <Text style={[styles.text, { fontSize: 18 }]}>Delivery Address</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.white} />
        </TouchableOpacity>
      </View>
      <Modal isVisible={modalVisible}>
        <View style={styled.modal}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginVertical: 15,
            }}>
            <Text style={[styled.header, { fontSize: 18 }]}>Select your Region</Text>
            <TouchableOpacity
              onPress={() => setmodalVisible(false)}
              style={{
                height: 35,
                width: 35,
                backgroundColor: colors.backgroundGrey,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 25,
              }}>
              <Feather name="x" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <ScrollView>
            {sector.map((item, index) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setselectedSector(item);
                    setmodalVisible(false);
                  }}
                  key={index}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    height: 45,
                    borderBottomColor: colors.backgroundGrey,
                    borderBottomWidth: 1,
                    justifyContent: 'space-between',
                    paddingHorizontal: 5,
                  }}>
                  <Text style={{ fontFamily: fonts.medium, color: colors.textDark }}>{item}</Text>
                  {/* {selectedSector == item && <Feather name="check" size={16} color={colors.primary} />} */}
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>
      </Modal>

      <AddressItem item={profile?.customer_sector} />

      <View style={{ marginBottom: 10 }}>
        <FlatList
          data={location}
          renderItem={({ item }) => {
            return <AddressItem item={item} />;
          }}
        />
      </View>
      {/* <AppButton
        label="add new location"
        style={{ margin: 20 }}
        onPress={() => setmodalVisible(true)}
      /> */}
    </AppScreen>
  );
}

export default Address;

import React, { useState, useEffect } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import AppButton from '../../component/AppButton';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';

const styles = StyleSheet.create({
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

function Details({ route, navigation }) {
  const { item } = route.params;
  const [number, setNumber] = useState(1);
  const [message, setMessage] = useState(null);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    // getFav();
  }, []);

  const controller = (e) => {
    if (e == 'add') {
      setNumber(number + 1);
    } else if (e == 'remove' && number > 1) {
      setNumber(number - 1);
    }
  };

  const addToFav = (item) => {
    setMessage(`${item.vegetable_name} was added to your favorites!`);
  };

  const addToCart = (item) => {
    setMessage(`${item.vegetable_name} was added to your basket!`);
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 15,
          position: 'absolute',
          zIndex: 1,
          top: 0,
          left: 0,
          right: 0,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="share" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
      </View>
      <ScrollView>
        <Image
          source={{
            uri: item.vegetable_image,
          }}
          style={{
            height: 351.44,
          }}
        />

        <View
          style={{
            marginHorizontal: 15,
            marginVertical: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <View>
            <Text style={[styles.name, { textTransform: 'capitalize' }]}>
              {item.vegetable_name}
            </Text>
            <Text style={[styles.subname, { textTransform: 'capitalize' }]}>{item.type_name}</Text>
          </View>
          <TouchableOpacity onPress={() => addToFav(item)} style={styles.topBtn}>
            <Feather name="heart" size={20} color={colors.iconGrey} />
          </TouchableOpacity>
        </View>
        <View
          style={{
            marginHorizontal: 15,
            justifyContent: 'space-between',
            flexDirection: 'row',
            marginVertical: 10,
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
          <Text style={[styles.name, { fontSize: 20 }]}>RWF {item.price}</Text>
        </View>
        <View style={{ marginHorizontal: 15, marginVertical: 15, height: 120 }}>
          <Text style={[styles.name, { fontSize: 17 }]}>Product Details</Text>
          <Text style={[styles.subname, { fontSize: 16 }]}>{item.description}</Text>
        </View>
        <AppButton
          label="Add to Basket"
          style={{ marginHorizontal: 15 }}
          onPress={() => addToCart(item)}
        />
      </ScrollView>
    </AppScreen>
  );
}

export default Details;

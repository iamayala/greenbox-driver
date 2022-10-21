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

function More({ route, navigation }) {
  const { products } = route.params;
  const [number, setNumber] = useState(1);
  const [message, setMessage] = useState(null);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    // getFav();
  }, []);

  //   handleFetch;

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
        <Text style={[styles.text, { fontSize: 18 }]}>Find Product</Text>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="more-vertical" size={20} color={colors.iconGrey} />
        </TouchableOpacity>
      </View>
      <FlatList
        data={products}
        numColumns={2}
        horizontal={false}
        style={{ paddingHorizontal: 10 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
        renderItem={({ item }) => {
          return (
            <ProductCard
              item={item}
              style={{
                marginBottom: 10,
                flex: 1,
              }}
            />
          );
        }}
      />
    </AppScreen>
  );
}

export default More;

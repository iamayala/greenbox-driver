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
import { baseURL, get } from '../../utils/Api';
import { width } from '../../constants/dimensions';
import NoData from '../../component/NoData';
import { emojis } from '../../constants/utils';

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

function Menu({ route, navigation }) {
  const [product, setproduct] = useState([]);
  const [message, setMessage] = useState(null);
  const [loading, setloading] = useState(true);

  useEffect(() => {
    // handleFetch(item.vegetable_type_id);
  }, []);

  const handleFetch = (id) => {
    get(`${baseURL}/vegetable/category/${id}`).then((res) => {
      if (res.data.status == 200) {
        setproduct(res.data.data);
        setloading(false);
      }
    });
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          paddingHorizontal: 15,
          backgroundColor: colors.white,
        }}>
        <Text style={[styles.text, { fontSize: 18, textTransform: 'capitalize' }]}>Menu</Text>
      </View>

      <FlatList
        data={product}
        numColumns={2}
        // refreshing={loading}
        // onRefresh={() => handleFetch(item.vegetable_type_id)}
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
                width: width * 0.5 - 25,
              }}
            />
          );
        }}
        ListEmptyComponent={() => {
          return <NoData label="" emoji={emojis.hide} />;
        }}
      />
    </AppScreen>
  );
}

export default Menu;

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
import { height, width } from '../../constants/dimensions';
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
  tab: {
    backgroundColor: colors.primary,
    height: 45,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});

const type_all = {
  type_emoji: emojis.confetti,
  type_name: 'all',
  vegetable_type_id: null,
};

function Menu({ route, navigation }) {
  const [product, setproduct] = useState([]);
  const [message, setMessage] = useState(null);
  const [type, settype] = useState([]);
  const [active, setactive] = useState(type_all);
  const [loading, setloading] = useState(true);
  const [error, seterror] = useState(null);
  const [all, setall] = useState(type_all);

  useEffect(() => {
    handleFetchProducts();
    handleFetchTypes();
  }, []);

  const handleFetchProducts = () => {
    get(`${baseURL}/vegetable`)
      .then((res) => {
        if (res.data.status == 200) {
          setproduct(res.data.data);
        }
      })
      .catch(() => {
        seterror('Somethin went wrong!');
      });
  };

  const handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        if (res.data.status == 200) {
          var types = [all];
          var results = types.concat(res.data.data);
          settype(results);
          setloading(false);
        }
      })
      .catch((err) => {
        seterror('Something went wrong!');
      });
  };

  const Tab = ({ active, onPress, item }) => {
    return (
      <TouchableOpacity
        onPress={onPress}
        style={[styles.tab, { backgroundColor: active ? colors.primary : colors.borderGrey }]}>
        <Image
          source={{ uri: item.type_emoji }}
          style={{ height: 20, width: 20, marginRight: 10 }}
        />
        <Text
          style={[
            styles.name,
            {
              fontSize: 15,
              color: active ? colors.white : colors.textDark,
              textTransform: 'capitalize',
            },
          ]}>
          {item.type_name}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
      <View
        style={{
          height: 65,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
          paddingHorizontal: 25,
          backgroundColor: colors.white,
        }}>
        <TouchableOpacity style={styles.topBtn}>
          <Feather name="arrow-left" size={20} color={colors.white} />
        </TouchableOpacity>
        <Text style={[styles.text, { fontSize: 18, textTransform: 'capitalize' }]}>Menu</Text>
        <TouchableOpacity
          onPress={() => navigation.navigate('New', { item: undefined })}
          style={[
            styles.topBtn,
            { backgroundColor: colors.primary, height: 30, width: 30, borderRadius: 10 },
          ]}>
          <Feather name="plus" size={18} color={colors.white} />
        </TouchableOpacity>
      </View>
      <View style={{ height: 55, marginTop: 10 }}>
        <FlatList
          data={type}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 20, paddingHorizontal: 15 }}
          renderItem={({ item }) => {
            return (
              <Tab
                active={item.vegetable_type_id == active?.vegetable_type_id}
                onPress={() => setactive(item)}
                item={item}
              />
            );
          }}
        />
      </View>

      <View style={{ flex: 1 }}>
        <FlatList
          data={
            active?.type_name !== 'all'
              ? product.filter((item) => item.vegetable_type_id == active?.vegetable_type_id)
              : product
          }
          numColumns={2}
          refreshing={loading}
          onRefresh={() => {}}
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
                onPress={() => navigation.navigate('New', { item })}
              />
            );
          }}
          ListEmptyComponent={() => {
            return <NoData emoji={emojis.hide} label="Oops! Category is empty" />;
          }}
        />
      </View>
    </AppScreen>
  );
}

export default Menu;

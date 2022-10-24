import React, { useEffect, useState } from 'react';
import { Image, ScrollView, Text, View, TextInput, TouchableOpacity, FlatList } from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import styled from '../../style/styles';
import colors from '../../constants/colors';
import SectionHeader from '../../component/SectionHeader';
import ProductCard from '../../component/ProductCard';
import { getLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, get } from '../../utils/Api';
import TypeTab from '../../component/TypeTab';
import { width } from '../../constants/dimensions';
import { emojis } from '../../constants/utils';
import fonts from '../../constants/fonts';
import NoData from '../../component/NoData';

function Home({ navigation }) {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState(null);
  const [types, setTypes] = useState(null);
  const [fetching, setfetching] = useState(true);

  // fetch local storage
  useEffect(() => {
    getLocalData('@USERDATA').then((res) => {
      var data = res[0];
      // console.log(res);
      setLocation(data.customer_sector);
    });
    handleFetchProducts();
    handleFetchTypes();
  }, []);

  // fetch products
  const handleFetchProducts = () => {
    get(`${baseURL}/vegetable`)
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch(() => {
        setError('Something went wrong!');
      });
  };

  // fetch categories
  const handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        setTypes(res.data.data);
        setfetching(false);
      })
      .catch((err) => {
        setError('Something went wrong!');
      });
  };

  if (fetching) {
    return <NoData label="harvesting..." emoji={emojis.tree} />;
  }

  return (
    <AppScreen style={{ backgroundColor: colors.white }}>
      {error && (
        <ToastMessage
          label={error}
          style={{ backgroundColor: colors.danger }}
          onPress={() => setError(null)}
        />
      )}
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ alignItems: 'center' }}>
          <Image
            source={require('../../assets/logo.png')}
            style={{ height: 70, width: 40, resizeMode: 'contain' }}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 5 }}>
            <Feather name="map-pin" size={18} color={colors.iconDark} style={{ marginRight: 10 }} />
            <Text style={styled.normalText}>Kigali, {location}</Text>
          </View>
        </View>
        <View style={{ marginHorizontal: 15, marginTop: 20 }}>
          <View
            style={{ height: 114.99, backgroundColor: colors.primary, borderRadius: 15 }}></View>
        </View>

        {types?.map((child, index) => {
          return (
            <View key={index}>
              <SectionHeader
                onPress={() => navigation.navigate('More', { item: child })}
                title={child.type_name}
                link="See all"
              />
              <FlatList
                nestedScrollEnabled
                data={products
                  ?.filter((item) => item.vegetable_type_id == child.vegetable_type_id)
                  .slice(0, 5)}
                horizontal
                keyExtractor={(item) => item.vegetable_id}
                contentContainerStyle={{ paddingHorizontal: 10 }}
                style={{ marginVertical: 15 }}
                showsHorizontalScrollIndicator={false}
                renderItem={({ item }) => {
                  return (
                    <ProductCard
                      item={item}
                      onPress={() => navigation.navigate('Details', { item })}
                    />
                  );
                }}
              />
            </View>
          );
        })}

        <View style={{ flexDirection: 'row', alignSelf: 'center' }}>
          <Text style={{ fontFamily: fonts.medium, color: colors.textGrey }}>
            End of the world!
          </Text>
          <Image source={{ uri: emojis.eyes }} style={{ height: 18, width: 18, marginLeft: 10 }} />
        </View>
        <View style={{ height: 100 }} />
      </ScrollView>
    </AppScreen>
  );
}

export default Home;

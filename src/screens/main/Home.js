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

function Home({ navigation }) {
  const [location, setLocation] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [products, setProducts] = useState(null);
  const [types, setTypes] = useState(null);

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
      })
      .catch((err) => {
        setError('Something went wrong!');
      });
  };

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

        <View>
          <SectionHeader
            onPress={() => navigation.navigate('More', { products })}
            title="Promoted"
            link="See all"
          />
          <FlatList
            nestedScrollEnabled
            data={products}
            horizontal
            keyExtractor={(item) => item.vegetable_id}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            style={{ marginVertical: 15 }}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => {
              return (
                <ProductCard item={item} onPress={() => navigation.navigate('Details', { item })} />
              );
            }}
          />
        </View>
        <View>
          <SectionHeader title="All Products" />
          <FlatList
            data={types}
            horizontal
            style={{ marginTop: 15 }}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            renderItem={({ item }) => {
              return <TypeTab item={item} onPress={() => {}} />;
            }}
          />
        </View>
        <FlatList
          data={products}
          numColumns={2}
          horizontal={false}
          style={{ paddingHorizontal: 10, marginTop: 15 }}
          showsVerticalScrollIndicator={false}
          nestedScrollEnabled
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
      </ScrollView>
    </AppScreen>
  );
}

export default Home;

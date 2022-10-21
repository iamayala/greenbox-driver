import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, Keyboard, FlatList } from 'react-native';
import AppScreen from '../../component/AppScreen';
import CategoryCard from '../../component/CategoryCard';
import SearchInput from '../../component/SearchInput';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { baseURL, get } from '../../utils/Api';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
});

function Search() {
  const [category, setCategory] = useState([1, 2, 3, 4]);

  useEffect(() => {
    handleFetchTypes();
  }, []);

  // fetch categories
  const handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        setCategory(res.data.data);
      })
      .catch((err) => {
        setError('Something went wrong!');
      });
  };
  return (
    <AppScreen style={{ backgroundColor: colors.white }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Find Product</Text>
      </View>
      <SearchInput />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <FlatList
          data={category}
          horizontal={false}
          numColumns={2}
          style={{ paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingTop: 10 }}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            return <CategoryCard item={item} />;
          }}
        />
      </TouchableWithoutFeedback>
    </AppScreen>
  );
}

export default Search;

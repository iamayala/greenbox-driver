import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard,
  FlatList,
  ScrollView,
} from 'react-native';
import AppButton from '../../component/AppButton';
import AppScreen from '../../component/AppScreen';
import CartItem from '../../component/CartItem';
import FavItem from '../../component/FavItem';
import NoData from '../../component/NoData';
import SearchInput from '../../component/SearchInput';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { emojis } from '../../constants/utils';
import { baseURL, get } from '../../utils/Api';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
});

function Fav() {
  const [fav, setCart] = useState(null);

  //   useEffect(() => {
  //     handleFetchTypes();
  //   }, []);

  //   // fetch categories
  //   const handleFetchTypes = () => {
  //     get(`${baseURL}/vegetabletype`)
  //       .then((res) => {
  //         setCart(res.data.data);
  //       })
  //       .catch((err) => {
  //         setError('Something went wrong!');
  //       });
  //   };
  return (
    <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
      <View
        style={{
          height: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={[styles.text, { fontSize: 18 }]}>Favorites</Text>
      </View>
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        showsVerticalScrollIndicator={false}>
        <FlatList
          data={fav}
          nestedScrollEnabled
          style={{ paddingHorizontal: 10 }}
          contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={() => {
            return (
              <NoData
                style={{ selfAlign: 'center' }}
                label="Oops! looks like your fav is Empty!"
                emoji={emojis.heartbroken}
              />
            );
          }}
          renderItem={({ item }) => {
            return <FavItem item={item} />;
          }}
        />
        {fav && <AppButton label="add all to basket" style={{ marginHorizontal: 15 }} />}
      </ScrollView>
    </AppScreen>
  );
}

export default Fav;

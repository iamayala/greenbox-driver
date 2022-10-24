import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Modal } from 'react-native';
import AppScreen from '../../component/AppScreen';
import FavItem from '../../component/FavItem';
import NoData from '../../component/NoData';
import PromptModal from '../../component/PromptModal';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { emojis } from '../../constants/utils';
import { getLocalData, storeLocalData } from '../../utils/Helpers';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
});

function Fav() {
  const [fav, setfav] = useState(null);
  const [modal, setmodal] = useState(false);
  const [selected, setselected] = useState(null);
  const [loading, setloading] = useState(false);

  useEffect(() => {
    handleFetchFav();
  });

  // fetch categories
  const handleFetchFav = () => {
    getLocalData('@FAV').then((res) => setfav(res));
  };

  const handleRemove = (id) => {
    setmodal(false);
    getLocalData('@FAV').then((res) => {
      var favitems = res.filter((item) => item.vegetable_id !== id);
      if (favitems.length > 0) {
        addToFav(favitems);
      }
    });
  };

  const addToFav = (fav) => {
    storeLocalData('@FAV', fav).then(() => {
      // setMessage(`An item was removed from your favorites!`);
      // setfav(true);
    });
  };

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
      <Modal visible={modal} transparent={true}>
        <PromptModal
          text="You are about to remove an item from your favs. Please comfirm this action."
          yes={() => handleRemove(selected)}
          no={() => setmodal(false)}
        />
      </Modal>
      <FlatList
        data={fav}
        refreshing={loading}
        onRefresh={() => {}}
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
          return (
            <FavItem
              item={item}
              onPress={() => {
                setselected(item.vegetable_id);
                setmodal(true);
              }}
            />
          );
        }}
      />
      <View style={{ height: 100 }} />
    </AppScreen>
  );
}

export default Fav;

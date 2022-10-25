import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ScrollView,
  Modal,
  Image,
  TouchableOpacity,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import NoData from '../../component/NoData';
import PromptModal from '../../component/PromptModal';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { Feather, AntDesign } from '@expo/vector-icons';
import { emojis } from '../../constants/utils';
import { getLocalData, storeLocalData } from '../../utils/Helpers';

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontFamily: fonts.bold,
    color: colors.textDark,
  },
  container: {
    paddingVertical: 10,
    borderBottomColor: colors.backgroundGrey,
    borderBottomWidth: 1,
    marginHorizontal: 5,
    flexDirection: 'row',
  },
  cardText: {
    fontFamily: fonts.medium,
    textTransform: 'capitalize',
    fontSize: 16,
  },
  topBtn: {
    height: 36.67,
    width: 36.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class Fav extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fav: null,
      modal: false,
      selected: null,
      loading: false,
      cart: [],
      toCart: false,
    };
  }

  componentDidMount() {
    this.handleFetchFav();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.handleFetchFav();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  // fetch categories
  handleFetchFav = () => {
    getLocalData('@FAV').then((res) => this.setState({ fav: res }));
    this.handleFetchCart();
  };

  handleFetchCart = () => {
    getLocalData('@CART').then((res) => {
      var value = res == null ? [] : res;
      this.setState({ cart: value });
    });
  };

  handleRemove = (item) => {
    var StorageFav = this.state.fav;
    var i;
    for (i = 0; i < StorageFav.length; i++) {
      if (StorageFav[i].vegetable_id == item.vegetable_id) {
        var index = StorageFav.indexOf(item);
        StorageFav.splice(index, 1);
      }
    }
    storeLocalData('@FAV', StorageFav).then(() => {
      this.setState({ fav: StorageFav, modal: false });
    });
  };

  checked = (item) => {
    var res = this.state.cart;
    var i;
    for (i = 0; i < res.length; i++) {
      if (res[i].vegetable_id == item.vegetable_id) {
        return true;
      }
    }
    return false;
  };

  addToCart = (item) => {
    var StorageCart = this.state.cart;
    var data = { ...item, quantity: 1 };
    StorageCart.push(data);
    storeLocalData('@CART', StorageCart).then(() => {
      this.checked(item);
      // this.setState({ cart: StorageCart, isincart: true });
      console.log('added to cart');
      // this.showMessage(`${item.vegetable_name} was added to your basket!`);
    });
  };

  render() {
    const { modal, fav, loading, selected, cart, render, toCart } = this.state;

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
            yes={() => this.handleRemove(selected)}
            no={() => this.setState({ modal: false })}
          />
        </Modal>
        <FlatList
          data={fav}
          refreshing={loading}
          onRefresh={() => {}}
          nestedScrollEnabled
          style={{ paddingHorizontal: 20 }}
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
              <View style={styles.container}>
                <Image
                  source={{ uri: item.vegetable_image }}
                  style={{
                    width: 99.11,
                    height: 99.11,
                    backgroundColor: 'red',
                    borderRadius: 17,
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    marginHorizontal: 10,
                    justifyContent: 'space-between',
                    paddingVertical: 5,
                  }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <View>
                      <Text style={[styles.cardText, { fontSize: 17 }]}>{item.vegetable_name}</Text>
                      <Text style={[styles.cardText, { color: colors.textGrey, fontSize: 14 }]}>
                        {item.type_name}
                      </Text>
                    </View>
                    <TouchableOpacity
                      onPress={() => this.setState({ selected: item, modal: true })}>
                      <AntDesign name="heart" size={18} color={colors.danger} />
                    </TouchableOpacity>
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginTop: 15,
                    }}>
                    <Text style={[styles.cardText, { fontSize: 16, textTransform: 'uppercase' }]}>
                      RWF {item.price}
                    </Text>
                    <TouchableOpacity
                      onPress={this.checked(item) ? () => {} : () => this.addToCart(item)}
                      style={{ flexDirection: 'row', alignItems: 'center' }}>
                      {this.checked(item) == true ? (
                        <Feather name="x" size={18} color={colors.danger} />
                      ) : (
                        <Feather name="check" size={18} color={colors.primary} />
                      )}
                      <Text
                        style={[
                          styles.cardText,
                          {
                            marginLeft: 5,
                            fontSize: 12,
                            color: this.checked(item) == true ? colors.danger : colors.primary,
                          },
                        ]}>
                        {this.checked(item) == true ? 'Remove From Cart' : 'Add to basket'}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            );
          }}
        />
        <View style={{ height: 100 }} />
      </AppScreen>
    );
  }
}

export default Fav;

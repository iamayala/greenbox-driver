import React, { Component } from 'react';
import { ScrollView, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather, AntDesign } from '@expo/vector-icons';
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
  view: {
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
  },
});

export class Details extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      item: null,
      number: 1,
      fav: [],
      isfav: null,
      cart: [],
      isincart: null,
    };
  }

  componentDidMount() {
    const { item } = this.props.route.params;
    this.setState({ item });
    this.handleCheckFav(item.vegetable_id);

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      const { item } = this.props.route.params;
      this.setState({ item });
      this.handleCheckFav(item.vegetable_id);
      this.handleCheckCart(item.vegetable_id);
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleCheckFav = (id) => {
    getLocalData('@FAV').then((res) => {
      this.setState({ fav: res });
      var likedStores = res.filter((item) => item.vegetable_id == id);
      if (likedStores.length > 0) {
        this.setState({ isfav: true });
      }
    });
  };

  addToFav = (item) => {
    var StorageFav = this.state.fav;
    StorageFav.push(item);
    storeLocalData('@FAV', StorageFav).then(() => {
      this.setState({ fav: StorageFav, isfav: true });
      this.showMessage('The item was add to your favorite!');
    });
  };

  rmvToFav = (id) => {
    var rmvd = this.state.fav.filter((item) => item.vegetable_id != id);
    storeLocalData('@FAV', rmvd).then(() => {
      this.setState({ fav: rmvd, isfav: false });
      this.showMessage('The item was removed from your favorite!');
    });
  };

  showMessage = (message) => {
    this.setState({ message: message });
    setTimeout(() => {
      this.setState({ message: null });
    }, 2000);
  };

  controller = (e) => {
    var no = this.state.number;
    if (e == 'add') {
      this.setState({ number: no + 1 });
    } else if (e == 'remove' && this.state.number > 1) {
      this.setState({ number: no - 1 });
    }
  };

  handleCheckCart = (id) => {
    getLocalData('@CART').then((res) => {
      this.setState({ cart: res });
      var Cart = res.filter((item) => item.vegetable_id == id);
      if (Cart.length > 0) {
        this.setState({ isincart: true });
      }
    });
  };

  addToCart = (item) => {
    var StorageCart = this.state.cart;
    var data = { ...item, quantity: this.state.number };
    StorageCart.push(data);
    storeLocalData('@CART', StorageCart).then(() => {
      this.setState({ cart: StorageCart, isincart: true });
      this.showMessage(`${item.vegetable_name} was added to your basket!`);
    });
  };

  removeToCart = (item) => {
    var StorageCart = this.state.cart;
    var i;
    for (i = 0; i < StorageCart.length; i++) {
      if (StorageCart[i].vegetable_id == item.vegetable_id) {
        var index = StorageCart.indexOf(item);
        StorageCart.splice(index, 1);
      }
    }
    storeLocalData('@CART', StorageCart).then(() => {
      this.setState({ cart: StorageCart, isincart: false });
      this.showMessage(`${item.vegetable_name} was removed from your basket!`);
    });
  };

  render() {
    const { item, isfav, number, message, isincart } = this.state;
    const { navigation } = this.props;

    return (
      <AppScreen style={{ backgroundColor: colors.white }}>
        {this.state.message && (
          <ToastMessage label={message} onPress={() => this.setState({ message: null })} />
        )}
        <View style={styles.view}>
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
              uri: item?.vegetable_image,
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
                {item?.vegetable_name}
              </Text>
              <Text style={[styles.subname, { textTransform: 'capitalize' }]}>
                {item?.type_name}
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => (isfav ? this.rmvToFav(item.vegetable_id) : this.addToFav(item))}
              style={styles.topBtn}>
              <AntDesign
                name={isfav ? 'heart' : 'hearto'}
                size={20}
                color={isfav ? colors.danger : colors.iconGrey}
              />
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
              <TouchableOpacity onPress={() => this.controller('remove')} style={styles.topBtn}>
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
              <TouchableOpacity onPress={() => this.controller('add')} style={styles.topBtn}>
                <Feather name="plus" size={18} color={colors.primary} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.name, { fontSize: 20 }]}>RWF {item?.price * number}</Text>
          </View>
          <View style={{ marginHorizontal: 15, marginVertical: 15, height: 120 }}>
            <Text style={[styles.name, { fontSize: 17 }]}>Product Details</Text>
            <Text style={[styles.subname, { fontSize: 16 }]}>{item?.description}</Text>
          </View>
          <AppButton
            label={isincart ? 'Remove from basket' : 'Add to Basket'}
            style={{
              marginHorizontal: 15,
              backgroundColor: isincart ? colors.danger : colors.primary,
            }}
            onPress={() => (isincart ? this.removeToCart(item) : this.addToCart(item))}
          />
        </ScrollView>
      </AppScreen>
    );
  }
}

export default Details;

import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons';
import AppButton from '../../component/AppButton';
import AppScreen from '../../component/AppScreen';
import NoData from '../../component/NoData';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { emojis, formatPrice } from '../../constants/utils';
import { baseURL, get } from '../../utils/Api';
import { getLocalData, storeLocalData } from '../../utils/Helpers';
import PromptModal from '../../component/PromptModal';

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
  topBtn: {
    height: 36.67,
    width: 36.67,
    borderRadius: 17,
    backgroundColor: colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export class Cart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cart: [],
      selected: null,
      modal: false,
    };
  }

  componentDidMount() {
    this.handleFetchCart();

    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.handleFetchCart();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleFetchCart = () => {
    getLocalData('@CART').then((res) => {
      var value = res == null ? [] : res;
      this.setState({ cart: value });
    });
  };

  rmv = (quantity, index) => {
    var cart = this.state.cart;
    if (quantity > 1) {
      cart[index].quantity = quantity - 1;
    }
    storeLocalData('@CART', cart);
    this.setState({ cart });
  };

  add = (quantity, index) => {
    var cart = this.state.cart;
    cart[index].quantity = quantity + 1;
    storeLocalData('@CART', cart);
    this.setState({ cart });
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
      this.setState({ cart: StorageCart, modal: false });
    });
  };

  render() {
    const { modal, selected, cart } = this.state;

    var tempCart = cart;
    var sumPrice = 0;

    for (let i = 0; i < tempCart.length; i++) {
      sumPrice += tempCart[i].price * tempCart[i].quantity;
    }

    return (
      <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
        <View
          style={{
            height: 50,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={[styles.text, { fontSize: 18 }]}>My Bag</Text>
        </View>
        <Modal visible={modal} transparent={true}>
          <PromptModal
            text="You are about to remove an item from your cart. Please comfirm this action."
            yes={() => this.removeToCart(selected)}
            no={() => this.setState({ modal: false })}
          />
        </Modal>
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 100,
            paddingTop: 10,
            paddingHorizontal: 20,
          }}
          showsVerticalScrollIndicator={false}>
          {cart.length == 0 ? (
            <NoData
              style={{ selfAlign: 'center' }}
              label="Oops! looks like your cart is Empty!"
              emoji={emojis.eyes}
            />
          ) : (
            cart.map((item, index) => {
              return (
                <View style={styles.container} key={index}>
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
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                      }}>
                      <View>
                        <Text style={[styles.text, { fontSize: 17 }]}>{item.vegetable_name}</Text>
                        <Text
                          style={[
                            styles.text,
                            { color: colors.textGrey, fontSize: 14, textTransform: 'capitalize' },
                          ]}>
                          {item.type_name}
                        </Text>
                      </View>
                      <TouchableOpacity
                        onPress={() => this.setState({ modal: true, selected: item })}>
                        <Feather name="x" size={18} color={colors.iconGrey} />
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        marginTop: 15,
                      }}>
                      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <TouchableOpacity
                          onPress={() => this.rmv(item.quantity, index)}
                          style={styles.topBtn}>
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
                          <Text style={{ fontFamily: fonts.medium }}>{item.quantity}</Text>
                        </View>
                        <TouchableOpacity
                          onPress={() => this.add(item.quantity, index)}
                          style={styles.topBtn}>
                          <Feather name="plus" size={18} color={colors.primary} />
                        </TouchableOpacity>
                      </View>
                      <Text style={[styles.text, { fontSize: 17, textTransform: 'uppercase' }]}>
                        RWF {formatPrice(item.price * item.quantity)}
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })
          )}

          {this.state.cart.length > 0 && (
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginVertical: 15,
                }}>
                <Text style={[styles.text, { fontSize: 18, color: colors.textGrey }]}>
                  Subtotal
                </Text>
                <Text style={[styles.text, { fontSize: 18 }]}>RWF {formatPrice(sumPrice)}</Text>
              </View>
              <AppButton label="Go to checkout" />
            </View>
          )}
        </ScrollView>
      </AppScreen>
    );
  }
}

export default Cart;

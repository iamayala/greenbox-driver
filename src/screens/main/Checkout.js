import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather, AntDesign } from '@expo/vector-icons';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import { getLocalData, removeLocalData, storeLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import { emojis, formatPrice } from '../../constants/utils';
import { width } from '../../constants/dimensions';
import AddressItem from '../../component/AddressItem';
import styled from '../../style/styles';
import { sector } from '../../constants/location';
import RBSheet from 'react-native-raw-bottom-sheet';
import AppButton from '../../component/AppButton';
import CircleButton from '../../component/CircleButton';
import PromptModal from '../../component/PromptModal';
import Modal from 'react-native-modal';
import { NavigationContainer } from '@react-navigation/native';
import { baseURL, post } from '../../utils/Api';

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
    fontFamily: fonts.medium,
    fontSize: 14,
    marginTop: 5,
    color: colors.textDark,
  },
  tabStyle: {
    alignItems: 'center',
  },
});

class Amount extends Component {
  render() {
    return (
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginVertical: 10,
        }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Text
            style={[
              styles.text,
              { fontSize: 16, color: colors.textGrey, fontFamily: fonts.medium },
            ]}>
            {this.props.title}
          </Text>
        </View>
        <Text style={[styles.text, { fontSize: 16 }]}>
          {this.props.coupon ? `- ` : ``}RWF {this.props.amount}
        </Text>
      </View>
    );
  }
}

export class Checkout extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      tab: 'address',
      address: null,
      phone: null,
      locationmodal: false,
      sector: sector,
      selectedaddress: false,
      newPhone: '',
      prompt: false,
      sumPrice: null,
      discount: null,
      customer_id: null,
      cart: [],
      order_id: null,
      order_id: null,
    };
  }

  componentDidMount() {
    const { sumPrice, discount, cart } = this.props.route.params;
    this.setState({ sumPrice, discount, cart });
    this.handleFetchAddress();
  }

  handleFetchAddress = () => {
    getLocalData('@USERDATA').then((res) => {
      this.setState({
        address: res[0].customer_sector,
        phone: res[0].customer_phone_number,
        customer_id: res[0].customer_id,
      });
    });
  };

  handlePlaceOrder = () => {
    this.setState({
      loading: true,
      placed_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
    });
    var data = {
      customer_id: this.state.customer_id,
      delivery_address: this.state.address,
      paid_amount: this.state.sumPrice * (1 - this.state.discount / 100),
      basket: JSON.stringify(this.state.cart),
      placed_on: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    post(`${baseURL}/order`, data)
      .then((res) => {
        if (res.data.message == 'success') {
          this.handlePayment(res.data.order_id);
        }
      })
      .catch((err) => {
        this.setState({ message: 'Something went wrong, Please try again later!' });
      });
  };

  handlePayment = (order_id) => {
    var data = {
      order_id,
      order_amount: this.state.sumPrice,
      discount_amount: this.state.discount,
      paid_amount: this.state.sumPrice * (1 - this.state.discount / 100),
      paid_by: this.state.customer_id,
      payment_date: new Date().toISOString().slice(0, 19).replace('T', ' '),
    };
    post(`${baseURL}/payment`, data)
      .then((res) => {
        if (res.data.message == 'success') {
          this.handleUpdatePayment(res.data.payment_id, res.data.order_id);
        }
      })
      .catch((err) => {
        this.setState({ message: `Payment Failed! Please try again later!` });
      });
  };

  handleUpdatePayment = (payment_id, order_id) => {
    var data = {
      payment_id,
      order_id,
    };
    post(`${baseURL}/updatepayment`, data)
      .then((res) => {
        if (res.data.message == 'success') {
          this.handleUpdateOrderStatus(1, order_id);
        }
      })
      .catch(() => {
        this.setState({ message: 'Something went wrong! Please try again later!' });
      });
  };

  handleUpdateOrderStatus = (order_status, order_id) => {
    var data = {
      order_status,
      order_id,
    };
    post(`${baseURL}/status`, data)
      .then((res) => {
        if (res.data.message == 'success') {
          this.setState({ loading: false, tab: 'party', order_id });
          removeLocalData('@CART');
        }
      })
      .catch(() => {
        this.setState({ message: 'Something went wrong! Please try again later!' });
      });
  };

  render() {
    const {
      message,
      tab,
      address,
      selectedaddress,
      phone,
      newPhone,
      prompt,
      loading,
      sumPrice,
      discount,
    } = this.state;
    const { navigation } = this.props;

    return (
      <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
        {message && (
          <ToastMessage label={message} onPress={() => this.setState({ message: null })} />
        )}

        <Modal isVisible={prompt} animationIn="bounce" animationOut="fadeOut">
          <PromptModal
            text="You are about to leave the checkout page. Please note that information provided will be lost."
            no={() => this.setState({ prompt: false })}
            yes={() => {
              this.setState({ prompt: false });
              navigation.navigate('Cart');
            }}
          />
        </Modal>

        <View
          style={{
            height: 65,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            backgroundColor: colors.white,
          }}>
          <TouchableOpacity onPress={() => this.setState({ prompt: true })} style={styles.topBtn}>
            <Feather name="arrow-left" size={20} color={colors.iconGrey} />
          </TouchableOpacity>
          <Text style={[styles.text, { fontSize: 18 }]}>Checkout</Text>
          <TouchableOpacity style={styles.topBtn}>
            <Feather name="more-vertical" size={20} color={colors.white} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 30 }}>
          <View style={[styles.tabStyle, { opacity: tab == 'address' ? 1 : 0.4 }]}>
            <Image source={{ uri: emojis.home }} style={{ height: 25, width: 25 }} />
            <Text style={styles.subname}>Address</Text>
          </View>
          <View style={[styles.tabStyle, { opacity: tab == 'payment' ? 1 : 0.4 }]}>
            <Image source={{ uri: emojis.free }} style={{ height: 25, width: 25 }} />
            <Text style={styles.subname}>Payment</Text>
          </View>
          <View style={[styles.tabStyle, { opacity: tab == 'party' ? 1 : 0.4 }]}>
            <Image source={{ uri: emojis.partyingFace }} style={{ height: 25, width: 25 }} />
            <Text style={styles.subname}>Party Time!</Text>
          </View>
        </View>
        {tab == 'address' ? (
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={[styles.text, { fontSize: 20, flex: 1, maxWidth: width * 0.5 }]}>
                Delivery Address
              </Text>
              <TouchableOpacity
                onPress={() => this.RBSheet.open()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="plus-circle" size={18} color={colors.primary} />
                <Text style={[styles.text, { fontSize: 14, marginLeft: 5, color: colors.primary }]}>
                  Use Different
                </Text>
              </TouchableOpacity>
            </View>
            <AddressItem
              style={{ marginHorizontal: 0 }}
              item={address}
              selected={selectedaddress}
              onPress={() => this.setState({ selectedaddress: true })}
            />

            <View style={{ position: 'absolute', bottom: 10, left: 20, right: 20 }}>
              <AppButton label="Continue" onPress={() => this.setState({ tab: 'payment' })} />
            </View>
          </View>
        ) : tab == 'payment' ? (
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <View
              style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <Text style={[styles.text, { fontSize: 20, flex: 1, maxWidth: width * 0.5 }]}>
                Payment Method
              </Text>
              <TouchableOpacity
                onPress={() => this.RBMOMO.open()}
                style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Feather name="plus-circle" size={18} color={colors.primary} />
                <Text style={[styles.text, { fontSize: 14, marginLeft: 5, color: colors.primary }]}>
                  Use Different
                </Text>
              </TouchableOpacity>
            </View>
            <AddressItem
              style={{ marginHorizontal: 0 }}
              item={phone}
              emoji={emojis.momoLogo}
              selected={selectedaddress}
              onPress={() => this.setState({ selectedaddress: true })}
            />

            <Amount amount={formatPrice(sumPrice)} title="Subtotal" />
            <Amount amount={formatPrice(0)} title="Delivery Fee" />
            <Amount amount={formatPrice((sumPrice * discount) / 100)} title="Discount" />
            <Amount amount={formatPrice(sumPrice * (1 - discount / 100))} title="Total" />

            <View style={{ position: 'absolute', bottom: 10, left: 20, right: 20 }}>
              <AppButton
                label="Proceed to Payment"
                onPress={loading ? () => {} : () => this.handlePlaceOrder()}
                loading={loading}
              />
            </View>
          </View>
        ) : tab == 'party' ? (
          <View
            style={{
              paddingHorizontal: 20,
              flex: 1,
            }}>
            <View style={{ alignItems: 'center', flex: 1, paddingTop: 50 }}>
              <Image source={{ uri: emojis.confetti }} style={{ height: 80, width: 80 }} />
              <Text style={[styles.text, { marginVertical: 15 }]}>Order Placed!</Text>
              <Text style={[styles.subname, { marginVertical: 15, textAlign: 'center' }]}>
                Your order was successfully placed! You can view the status of the order at any
                time.
              </Text>
              <View
                style={{
                  backgroundColor: colors.backgroundGrey,
                  width: width * 0.8,
                  padding: 20,
                  borderRadius: 10,
                }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.subname, { color: colors.textGrey }]}>Order ID</Text>
                    <Text style={styles.subname}>#{this.state.order_id}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.subname, { color: colors.textGrey }]}>Date</Text>
                    <Text style={styles.subname}>{this.state.placed_on}</Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderTopColor: colors.borderGrey,
                    borderTopWidth: 1,
                    marginTop: 15,
                    paddingTop: 10,
                  }}>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.subname, { color: colors.textGrey }]}>Delivery To</Text>
                    <Text style={styles.subname}>Kigali, {this.state.address}</Text>
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={[styles.subname, { color: colors.textGrey }]}>Payment</Text>
                    <Text style={styles.subname}>MTN Mobile Money</Text>
                  </View>
                </View>
              </View>
            </View>
            <View
              style={{
                position: 'absolute',
                bottom: 10,
                left: 20,
                right: 20,
                width: width - 40,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
              <AppButton
                label="Close"
                style={{ width: width * 0.43, backgroundColor: colors.borderGrey }}
                onPress={() => navigation.navigate('HomeNavigation')}
              />
              <AppButton
                label="Track Order"
                style={{ width: width * 0.43 }}
                onPress={() =>
                  this.props.navigation.reset({
                    index: 0,
                    routes: [{ name: 'HomeNavigation' }],
                  })
                }
              />
            </View>
          </View>
        ) : null}

        <RBSheet
          ref={(ref) => {
            this.RBSheet = ref;
          }}
          animationType="slide"
          openDuration={180}
          customStyles={{
            container: {
              flex: 1,
            },
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.bold,
                fontSize: 17,
                paddingVertical: 15,
              }}>
              Locations
            </Text>
            <FlatList
              data={sector}
              contentContainerStyle={{ paddingHorizontal: 20, paddingBottom: 100 }}
              renderItem={({ item }) => {
                return (
                  <TouchableOpacity
                    onPress={() => {
                      this.RBSheet.close();
                      this.setState({ address: item });
                    }}
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      paddingVertical: 15,
                    }}>
                    <Image source={{ uri: emojis.home }} style={{ height: 35, width: 35 }} />
                    <View style={{ marginLeft: 20, flex: 1 }}>
                      <Text style={[styles.text, { fontSize: 16, textTransform: 'capitalize' }]}>
                        {item}
                      </Text>
                    </View>
                    <View
                      style={{
                        backgroundColor: colors.lightGreen,
                        paddingHorizontal: 15,
                        height: 25,
                        borderRadius: 30,
                        justifyContent: 'center',
                        alignItems: 'center',
                      }}>
                      <Text
                        style={{
                          fontFamily: fonts.medium,
                          color: colors.textDark,
                          fontSize: 11,
                        }}>
                        Select Location
                      </Text>
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
            <View style={{ height: 50 }} />
          </View>
        </RBSheet>

        <RBSheet
          ref={(ref) => {
            this.RBMOMO = ref;
          }}
          animationType="slide"
          openDuration={180}
          customStyles={{
            container: {
              // flex: 1,
            },
          }}>
          <View>
            <Text
              style={{
                textAlign: 'center',
                fontFamily: fonts.bold,
                fontSize: 17,
                paddingVertical: 15,
              }}>
              New Payment Method
            </Text>
            <View style={{ marginHorizontal: 20 }}>
              <View style={[styled.inputField, { marginBottom: 10 }]}>
                <Text style={{ fontFamily: fonts.medium, marginRight: 10, fontSize: 16 }}>
                  +250
                </Text>
                <TextInput
                  style={styled.textInput}
                  placeholder="78*******"
                  value={newPhone}
                  placeholderTextColor={colors.borderGrey}
                  keyboardType="phone-pad"
                  onChangeText={(e) => this.setState({ newPhone: e })}
                  maxLength={9}
                />
              </View>
              <AppButton
                label="Verify"
                onPress={
                  newPhone.length < 9
                    ? () => {}
                    : () => {
                        this.setState({ phone: `+250${newPhone}` });
                        this.RBMOMO.close();
                      }
                }
                style={{
                  backgroundColor: newPhone.length < 9 ? colors.borderGrey : colors.primary,
                }}
              />
            </View>
          </View>
        </RBSheet>
      </AppScreen>
    );
  }
}

export default Checkout;

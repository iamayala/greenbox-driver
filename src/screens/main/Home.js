import React, { Component } from 'react';
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

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: null,
      location: '',
      success: null,
      products: [],
      types: [],
      fetching: true,
      cart: [],
    };
  }

  componentDidMount() {
    getLocalData('@USERDATA').then((res) => {
      var data = res[0];
      this.setState({ location: data?.customer_sector });
    });
    this.handleFetchProducts();
    this.handleFetchTypes();
    this.handleFetchCart();
  }

  handleFetchProducts = () => {
    get(`${baseURL}/vegetable`)
      .then((res) => {
        if (res.data.status == 200) {
          this.setState({ products: res.data.data });
        }
      })
      .catch(() => {
        this.setState({ error: 'Something went wrong!' });
      });
  };

  handleFetchTypes = () => {
    get(`${baseURL}/vegetabletype`)
      .then((res) => {
        if (res.data.status == 200) {
          this.setState({ types: res.data.data, fetching: false });
        }
      })
      .catch((err) => {
        this.setState({ error: 'Something went wrong!' });
      });
  };

  handleFetchCart = () => {
    getLocalData('@CART').then((res) => {
      var value = res == null ? [] : res;
      this.setState({ cart: value });
    });
  };

  checked = (veg) => {
    const res = this.state.cart;
    res.filter((item) => item.vegetable_id == veg.vegetable_id);
    if (res.length > 0) {
      return true;
    }
    return false;
  };

  render() {
    const { error, location, success, products, types, fetching, cart } = this.state;
    const { navigation } = this.props;

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
              <Feather
                name="map-pin"
                size={18}
                color={colors.iconDark}
                style={{ marginRight: 10 }}
              />
              <Text style={styled.normalText}>Kigali, {location}</Text>
            </View>
          </View>
          <View style={{ marginHorizontal: 15, marginTop: 20 }}>
            <View
              style={{
                height: 114.99,
                backgroundColor: colors.primary,
                borderRadius: 15,
              }}></View>
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
                    .filter((item) => item.vegetable_type_id == child.vegetable_type_id)
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
                        checked={this.checked(item)}
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
            <Image
              source={{ uri: emojis.eyes }}
              style={{ height: 18, width: 18, marginLeft: 10 }}
            />
          </View>
          <View style={{ height: 100 }} />
        </ScrollView>
      </AppScreen>
    );
  }
}

export default Home;

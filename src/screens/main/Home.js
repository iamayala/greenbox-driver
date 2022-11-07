import React, { Component } from 'react';
import {
  Image,
  ScrollView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  Switch,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import styled from '../../style/styles';
import colors from '../../constants/colors';
import { getLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, get } from '../../utils/Api';
import { emojis } from '../../constants/utils';
import fonts from '../../constants/fonts';
import NoData from '../../component/NoData';
import Tab from '../../component/Tab';
import OrderCard from '../../component/OrderCard';

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
    fontFamily: fonts.regular,
    fontSize: 16,
    color: colors.textGrey,
  },
  tab: {
    backgroundColor: colors.primary,
    height: 45,
    marginRight: 7,
    marginTop: 7,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
  },
});

export class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offline: false,
      orders: [],
      error: null,
      tab: 1,
      loading: false,
    };
  }

  componentDidMount() {
    getLocalData('@USERDATA').then((res) => {
      var data = res[0];
      this.setState({ location: data?.customer_sector });
    });
    this.handleFetchOrders();
  }

  handleFetchOrders = () => {
    get(`${baseURL}/orders`)
      .then((res) => {
        if (res.data.status == 200) {
          var result = res.data.data;
          for (const i in result) {
            result[i] = { ...result[i], basket: JSON.parse(result[i].basket) };
          }
          this.setState({ orders: result });
        }
      })
      .catch(() => {
        this.setState({ error: 'Something went wrong!' });
      });
  };

  render() {
    const { error, tab, fetching, offline, orders, loading } = this.state;
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
        <View
          style={{
            height: 65,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
            paddingHorizontal: 15,
            backgroundColor: colors.white,
          }}>
          <Text style={[styles.text, { fontSize: 18 }]}>Hello James,</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Text style={[styles.text, { fontSize: 13, marginRight: 10, color: colors.textGrey }]}>
              Status
            </Text>
            <View
              style={{
                height: 17,
                width: 17,
                borderRadius: 10,
                backgroundColor: colors.success,
              }}
            />
          </View>
        </View>
      </AppScreen>
    );
  }
}

export default Home;

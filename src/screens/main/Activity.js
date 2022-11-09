import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import AppScreen from '../../component/AppScreen';
import colors from '../../constants/colors';
import fonts from '../../constants/fonts';
import ToastMessage from '../../component/ToastMessage';
import NoData from '../../component/NoData';
import { emojis } from '../../constants/utils';
import Tab from '../../component/Tab';
import OrderCard from '../../component/OrderCard';
import { baseURL, get } from '../../utils/Api';

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
});

export class Activity extends Component {
  constructor(props) {
    super(props);

    this.state = {
      message: null,
      tab: 1,
      loading: false,
      orders: [],
    };
  }

  componentDidMount() {
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
    const { message, tab, loading, orders } = this.state;
    return (
      <AppScreen style={{ backgroundColor: colors.white, flex: 1 }}>
        {message && <ToastMessage label={message} onPress={() => setMessage(null)} />}
        <View
          style={{
            height: 65,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 15,
            backgroundColor: colors.white,
          }}>
          <Text style={[styles.text, { fontSize: 18 }]}>Deliveries</Text>
        </View>
        <View style={{ flexDirection: 'row', marginHorizontal: 12 }}>
          <Tab label="Activity" active={tab == 1} onPress={() => this.setState({ tab: 1 })} />
          <Tab label="History" active={tab == 2} onPress={() => this.setState({ tab: 2 })} />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <FlatList
            refreshing={loading}
            onRefresh={() => {}}
            data={orders}
            renderItem={({ item }) => {
              return <OrderCard item={item} action={tab == 1 ? true : false} />;
            }}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{ selfAlign: 'center' }}
                  label="Oops! you don't have any notifications!"
                  emoji={emojis.noNotifications}
                />
              );
            }}
          />
        </View>
      </AppScreen>
    );
  }
}

export default Activity;

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
import { getLocalData } from '../../utils/Helpers';

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
      profile: null,
      admins: [],
    };
  }

  componentDidMount() {
    this.handleFetchProfile();
    this.fetchAdmin();
    this._unsubscribe = this.props.navigation.addListener('focus', () => {
      this.handleFetchProfile();
    });
  }

  componentWillUnmount() {
    this._unsubscribe();
  }

  handleFetchProfile = () => {
    this.setState({ refreshing: true });
    getLocalData('@DRIVERDATA').then((res) => {
      var data = res[0];
      this.setState({ profile: data });
      this.handleFetchOrders(data.admin_id);
    });
  };

  handleFetchOrders = (id) => {
    get(`${baseURL}/order/driver/${id}`)
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

  fetchAdmin = () => {
    get(`${baseURL}/fetch/support`).then((res) => {
      var data = res.data;
      if (data.status == 200) {
        this.setState({ admins: data.data });
      }
    });
  };

  render() {
    const { message, tab, loading, orders, admins } = this.state;
    const { navigation } = this.props;
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
          <Tab label="Assigned" active={tab == 1} onPress={() => this.setState({ tab: 1 })} />
          <Tab label="At Destination" active={tab == 2} onPress={() => this.setState({ tab: 2 })} />
          <Tab label="Completed" active={tab == 3} onPress={() => this.setState({ tab: 3 })} />
        </View>
        <View style={{ marginBottom: 10, flex: 1 }}>
          <FlatList
            refreshing={loading}
            onRefresh={() => this.handleFetchProfile()}
            data={
              tab == 1
                ? orders.filter((item) => item.order_status == 3)
                : tab == 2
                ? orders.filter((item) => item.order_status == 4)
                : tab == 3
                ? orders.filter((item) => item.order_status == 5)
                : orders
            }
            renderItem={({ item }) => {
              return (
                <OrderCard
                  item={item}
                  action={tab == 1 ? true : false}
                  onPress={() => navigation.navigate('Track', { item })}
                  assigned={admins.filter((x) => x.admin_id == item.processed_by)[0]}
                />
              );
            }}
            ListEmptyComponent={() => {
              return (
                <NoData
                  style={{ selfAlign: 'center' }}
                  label="Woo! you don't have any orders here!"
                  emoji={emojis.hide}
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

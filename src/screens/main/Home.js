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
  Platform,
} from 'react-native';
import AppScreen from '../../component/AppScreen';
import { Feather } from '@expo/vector-icons';
import colors from '../../constants/colors';
import { getLocalData } from '../../utils/Helpers';
import ToastMessage from '../../component/ToastMessage';
import { baseURL, get } from '../../utils/Api';
import { emojis } from '../../constants/utils';
import fonts from '../../constants/fonts';
import NoData from '../../component/NoData';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AppButton from '../../component/AppButton';
import Modal from 'react-native-modal';
import PromptModal from '../../component/PromptModal';

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
      region: {
        latitude: -1.9553882223780152,
        longitude: 30.096933084257067,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.05,
      },
      showModal: false,
    };
  }

  componentDidMount() {
    getLocalData('@USERDATA').then((res) => {
      var data = res[0];
      this.setState({ location: data?.customer_sector });
    });
    this.handleFetchOrders();
    this.fetchLocation();
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

  // fetching location
  fetchLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      this.setState({ error: 'Permission to access location was denied' });
      return;
    }
    let location = await Location.getCurrentPositionAsync({});
    let region = {
      ...this.state.region,
      latitude: location.coords.latitude,
      longitude: location.coords.longitude,
    };
    this.setState({ region });
  };

  render() {
    const { error, tab, fetching, offline, orders, loading, region, showModal } = this.state;
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
        <Modal isVisible={showModal}>
          <PromptModal
            emoji={emojis.confetti}
            title="New Order!"
            subtitle="You have been assigned a new order."
            no_text="Ignore"
            yes_text="Deliver"
            yes={() => this.setState({ showModal: false })}
            no={() => this.setState({ showModal: false })}
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
        <MapView
          region={this.state.region}
          // onRegionChange={this.fetchLocation()}
          style={{ backgroundColor: 'red', flex: 1 }}>
          <Marker
            coordinate={{ latitude: region.latitude, longitude: region.longitude }}
            title="This is the way"
            description="this is the way also"
            // image={{ uri: emojis.bell }}
          />
        </MapView>
        <View
          style={{
            bottom: 50,
            paddingTop: 15,
            paddingBottom: 25,
            backgroundColor: colors.white,
            paddingHorizontal: 15,
            flexDirection: 'row',
          }}>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              height: 60,
              alignItems: 'center',
            }}>
            <Image source={{ uri: emojis.confetti }} style={{ height: 30, width: 30 }} />
            <View style={{ flex: 1, marginLeft: 15 }}>
              <Text style={[styles.text, { fontSize: 20 }]}>New order!</Text>
              <Text
                style={[
                  styles.text,
                  { fontSize: 16, fontFamily: fonts.medium, color: colors.iconGrey },
                ]}>
                Destination >> <Text style={{ color: colors.primary }}>Kabeza</Text>
              </Text>
            </View>
            <AppButton
              label="Start"
              style={{ flex: 0.4, marginTop: 0, height: 45, borderRadius: 10 }}
            />
          </View>
        </View>
      </AppScreen>
    );
  }
}

export default Home;

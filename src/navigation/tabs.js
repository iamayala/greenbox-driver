import 'react-native-gesture-handler';

import * as React from 'react';
import { Text, View, StyleSheet, Platform } from 'react-native';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {
  AccountStackScreen,
  CartStackScreen,
  FavStackScreen,
  HomeStackScreen,
  SearchStackScreen,
} from './stack';
import { Feather } from '@expo/vector-icons';
import colors from '../constants/colors';

const Tab = createBottomTabNavigator();

const styles = StyleSheet.create({
  tabBarStyle: {
    backgroundColor: '#fff',
    height: Platform.OS == 'ios' ? 90 : 80,
    position: 'absolute',
    borderTopColor: 'transparent',
    justifyContent: 'center',
    borderWidth: 0,
    elevation: 0,
  },
});

export const MainTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeNavigation"
      screenOptions={{
        tabBarStyle: styles.tabBarStyle,
        tabBarHideOnKeyboard: true,
        tabBarShowLabel: false,
        headerShown: false,
      }}>
      <Tab.Screen
        name="HomeNavigation"
        component={HomeStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="home" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="SearchNavigation"
        component={SearchStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="search" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="CartStackScreen"
        component={CartStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather
                name="shopping-bag"
                size={24}
                color={focused ? colors.primary : colors.textGrey}
              />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="FavStackScreen"
        component={FavStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="heart" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />

      <Tab.Screen
        name="AccountStackScreen"
        component={AccountStackScreen}
        options={{
          tabBarIcon: ({ focused }) => (
            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
              <Feather name="user" size={24} color={focused ? colors.primary : colors.textGrey} />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

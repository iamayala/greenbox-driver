import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/main/Home';
import Account from '../screens/main/Account';
import Login from '../screens/authentication/Login';
import OTP from '../screens/authentication/OTP';
import Splash from '../screens/authentication/Splash';
import Notification from '../screens/main/Notification';
import Profile from '../screens/main/Profile';
import Help from '../screens/main/Help';
import Settings from '../screens/main/Settings';
import Payment from '../screens/main/Payment';
import Analytics from '../screens/main/Analytics';
import Activity from '../screens/main/Activity';
import Track from '../screens/main/Track';

const Stack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}

export function NotificationStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Activity" component={Activity} />
      <Stack.Screen name="Track" component={Track} />
    </Stack.Navigator>
  );
}

export function AccountStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen name="Analytics" component={Analytics} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="Settings" component={Settings} />
    </Stack.Navigator>
  );
}

export function AuthenticationStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
    </Stack.Navigator>
  );
}

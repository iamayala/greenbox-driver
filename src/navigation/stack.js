import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/main/Home';
import Account from '../screens/main/Account';
import Signup from '../screens/authentication/Signup';
import Login from '../screens/authentication/Login';
import OTP from '../screens/authentication/OTP';
import Location from '../screens/authentication/Location';
import Search from '../screens/main/Search';
import Details from '../screens/main/Details';
import Splash from '../screens/authentication/Splash';
import More from '../screens/main/More';
import Cart from '../screens/main/Cart';
import Fav from '../screens/main/Fav';
import Address from '../screens/main/Address';
import Notification from '../screens/main/Notification';
import Orders from '../screens/main/Orders';
import Profile from '../screens/main/Profile';
import Help from '../screens/main/Help';
import About from '../screens/main/About';
import Checkout from '../screens/main/Checkout';

const Stack = createStackNavigator();

export function HomeStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Details" component={Details} />
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
}

export function SearchStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="More" component={More} />
    </Stack.Navigator>
  );
}

export function CartStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        gestureEnabled: false,
      }}>
      <Stack.Screen name="Cart" component={Cart} />
      <Stack.Screen name="Checkout" component={Checkout} />
    </Stack.Navigator>
  );
}

export function FavStackScreen() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Fav" component={Fav} />
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
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="Notification" component={Notification} />
      <Stack.Screen name="Orders" component={Orders} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Help" component={Help} />
      <Stack.Screen name="About" component={About} />
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
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="Location" component={Location} />
    </Stack.Navigator>
  );
}

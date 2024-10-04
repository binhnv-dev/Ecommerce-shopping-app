import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import store from './src/store';
import Login from './src/containers/Login';
import Signup from './src/containers/Signup';
import AccountDetails from './src/screens/AccountDetails';
import FlashMessage from 'react-native-flash-message';
import ForgotPassword from './src/containers/ForgotPassword';
import Shop from './src/containers/Shop';
import CategoryShop from './src/containers/CategoryShop';
import BrandShop from './src/containers/BrandShop';
import Page404 from './src/components/Common/Page404';
import ProductPage from './src/containers/ProductPage';
import Cart from './src/containers/Cart';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import { navigationRef } from './src/helpers/navigation';
import Profile from './src/containers/Profile';
import List from './src/containers/Order';
import OrderPage from './src/containers/OrderPage';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export type RootStackParamList = {
  Product: { slug: string };
};

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        switch (route.name) {
          case 'Home':
            iconName = 'home';
            break;
          case 'Cart':
            iconName = 'cart';
            break;
          case 'My Order':
            iconName = 'list';
            break;
          case 'Profile':
            iconName = 'person';
            break;
          default:
            iconName = 'home';
        }

        return <Icon name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: 'tomato',
      tabBarInactiveTintColor: 'gray',
      headerShown: false,
    })}
  >
    <Tab.Screen name="Home" component={Shop as any} />
    <Tab.Screen name="Cart" component={Cart as any} />
    <Tab.Screen name="My Order" component={List as any} />
    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

const App: React.FC = () => (
  <Provider store={store}>
    <View style={styles.container}>
      <NavigationContainer ref={navigationRef}>
        <Stack.Navigator>
          <Stack.Screen
            name="MainTabs"
            component={MainTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Signup}
          />
          <Stack.Screen
            name="Account Details"
            component={AccountDetails}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Forgot Password"
            component={ForgotPassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Product" component={ProductPage} />
          <Stack.Screen
            name="Shop"
            component={Shop as any}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Category Shop"
            component={CategoryShop}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Brands Shop"
            component={BrandShop}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Cart" component={Cart as any} />
          <Stack.Screen name="Orders" component={List as any} />
          <Stack.Screen name="OrderDetails" component={OrderPage as any} />
          <Stack.Screen
            name="*"
            component={Page404}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
        <FlashMessage position="top" />
      </NavigationContainer>
    </View>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
  },
});

export default App;
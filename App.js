import React, { Component } from 'react';
import { StyleSheet, Text, View, StatusBar, TouchableOpacity, Button, Alert, ScrollView, SafeAreaView, Dimensions, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator, createBottomTabNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import {createMaterialTopTabNavigator} from 'react-navigation-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import WelcomeScreen from './src/pages/WelcomeScreen';
import Login from './src/pages/Login';
import Signup from './src/pages/Signup';
import Forgot from './src/pages/Forgot';
import Verification from './src/pages/Verification';
import Reset from './src/pages/Reset';
import Dashboard from './src/pages/Dashboard';
import AuthLoadingScreen from './src/pages/AuthLoadingScreen';
import ShowUsername from './src/pages/ShowUsername';
import Support from './src/pages/Support';
import CustomerWallet from './src/pages/CustomerWallet';
import CustomerPurchase from './src/pages/CustomerPurchase';
import CorporatePurchase from './src/pages/CorporatePurchase';
import Rewards from './src/pages/Rewards';
import VoucherHistory from './src/pages/VoucherHistory';
import SuccessReg from './src/pages/SuccessReg';
import SuccessLoad from './src/pages/SuccessLoad';
import CustomerRewards from './src/pages/CustomerRewards';
import SuccessPoints from './src/pages/SuccessPoints';
import SuccessPoints2 from './src/pages/SuccessPoints2';
import ChangePassword from './src/pages/ChangePassword';
import AsyncStorage from '@react-native-community/async-storage';
import LoadCard from './src/pages/LoadCard';
import AcceptVoucher from './src/pages/AcceptVoucher';
import SuccessVoucher from './src/pages/SuccessVoucher';
import 'react-native-gesture-handler';

const AuthStackNavigator = createStackNavigator({
    Welcome: WelcomeScreen,
    Login: Login,
    Forgot: Forgot,
    Verification: Verification,
    Reset:Reset,
    ChangePassword:ChangePassword
});

const TabScreen = createMaterialTopTabNavigator(
  {
    CustomerPurchase: {
      screen: CustomerPurchase,
      navigationOptions: {
        tabBarLabel: 'Individual',
      } },
    CorporatePurchase: {
      screen: CorporatePurchase,
      navigationOptions: {
        tabBarLabel: 'Corporate',
      } },
  },
  {
    tabBarPosition: 'top',
    swipeEnabled: true,
    animationEnabled: true,
    tabBarOptions: {
      upperCaseLabel: false,
      activeTintColor: '#FFFFFF',
      inactiveTintColor: '#A9A9A9',
      style: {
        backgroundColor: '#CD2626',
        margin: 5,
      },
      labelStyle: {
        textAlign: 'center',
        fontSize: 16,
        fontWeight: 'bold'
      },
      indicatorStyle: {
        borderBottomColor: '#228B22',
        borderBottomWidth: 5,
      },
    },
  }
);

const AppStackNavigatorH = createStackNavigator({
  AppTabNavigator:{
    screen: Dashboard,
    navigationOptions: ({navigation}) => ({
      title: 'Dashboard',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator1 = createStackNavigator({
  AppTabNavigator:{
    screen: CustomerWallet,
    navigationOptions: ({navigation}) => ({
      title: 'Customer Wallet',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator = createStackNavigator({
  AppTabNavigator:{
    screen: TabScreen,
    navigationOptions: ({navigation}) => ({
      title: 'Customer Purchase',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator2 = createStackNavigator({
  AppTabNavigator:{
    screen: Rewards,
    navigationOptions: ({navigation}) => ({
      title: 'Card History',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator3 = createStackNavigator({
  AppTabNavigator:{
    screen: Support,
    navigationOptions: ({navigation}) => ({
      title: 'Change Password',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator4 = createStackNavigator({
  AppTabNavigator:{
    screen: Signup,
    navigationOptions: ({navigation}) => ({
      title: 'Register Customer',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator5 = createStackNavigator({
  AppTabNavigator:{
    screen: AcceptVoucher,
    navigationOptions: ({navigation}) => ({
      title: 'Accept Voucher',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppStackNavigator6 = createStackNavigator({
  AppTabNavigator:{
    screen: VoucherHistory,
    navigationOptions: ({navigation}) => ({
      title: 'Voucher History',
    headerStyle: {
      backgroundColor: '#CD2626',
    },
    headerTintColor: '#ffffff',
    headerTitleStyle: {
      fontWeight: 'bold',
      },
      headerLeft: (
        <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <View style={{paddingHorizontal: 10}}>
        <Icon name="md-menu" color="#ffffff" size={24}/>
        </View>
        </TouchableOpacity>
      )
    })
  }
})

const AppDrawerNavigator = createDrawerNavigator(
  {
    Dashboard: {screen: AppStackNavigatorH,
      navigationOptions: {
        drawerLabel: 'Dashboard',
        drawerIcon: ({tintColor}) => (
          <Icon name="ios-home" style={{fontSize: 24, color: tintColor}} />
        )
      }
    },
    Signup: {screen: AppStackNavigator4,
      navigationOptions: {
         drawerLabel: 'Register Customer',
         drawerIcon: ({tintColor}) => (
           <Icon name="md-person-add" style={{fontSize: 24, color: tintColor}} />
         )
      }
    },
    AcceptVoucher: {screen: AppStackNavigator5,
      navigationOptions: {
         drawerLabel: 'Accept Voucher',
         drawerIcon: ({tintColor}) => (
           <Icon name="md-card" style={{fontSize: 24, color: tintColor}} />
         )
      }
    },
      CustomerPurchase: {screen: AppStackNavigator,
        navigationOptions: {
           drawerLabel: 'Customer Purchase',
           drawerIcon: ({tintColor}) => (
             <Icon name="md-cash" style={{fontSize: 24, color: tintColor}} />
           )
        }
      },
      CustomerWallet: {screen: AppStackNavigator1,
        navigationOptions: {
           drawerLabel: 'Customer Wallet',
           drawerIcon: ({tintColor}) => (
             <Icon name="md-wallet" style={{fontSize: 24, color: tintColor}} />
           )
        }
      },
      VoucherHistory: {screen: AppStackNavigator6,
        navigationOptions: {
           drawerLabel: 'Voucher History',
           drawerIcon: ({tintColor}) => (
             <Icon name="ios-timer" style={{fontSize: 24, color: tintColor}} />
           )
        }
      },
      Rewards: {screen: AppStackNavigator2,
        navigationOptions: {
           drawerLabel: 'Card History',
           drawerIcon: ({tintColor}) => (
             <Icon name="ios-timer" style={{fontSize: 24, color: tintColor}} />
           )
        }
      },
      Support: {screen: AppStackNavigator3,
        navigationOptions: {
           drawerLabel: 'Change Password',
           drawerIcon: ({tintColor}) => (
             <Icon name="ios-construct" style={{fontSize: 24, color: tintColor}} />
           )
        }
      },
  },
  {
    contentComponent:(props) => (
    <ScrollView>
    <View style={{flex:1}}>
        <SafeAreaView forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style = {{height: 70, backgroundColor: '#CD2626', alignItems: 'center', justifyContent: 'center'}}>
        <ShowUsername/>
        </View>
          <DrawerItems {...props} />
          <TouchableOpacity onPress={()=>
            Alert.alert(
              'Log out',
              'Do you want to logout?',
              [
                {text: 'Cancel', onPress: () => {return null}},
                {text: 'Confirm', onPress: () => {
                  AsyncStorage.clear();
                  props.navigation.navigate('AuthLoading')
                }},
              ],
              { cancelable: false }
            )
          }>
            <Text style={{margin: 18, fontWeight: 'bold'}}> <Icon name='ios-power' style={{fontSize: 24}}/>&nbsp; Logout</Text>
          </TouchableOpacity>
        </SafeAreaView>
    </View>
    </ScrollView>
  ),

    contentOptions: {
      activeTintColor: '#134E13'
    },

  drawerOpenRoute: 'DrawerOpen',
  drawerCloseRoute: 'DrawerClose',
  drawerToggleRoute: 'DrawerToggle'
})

const FullApp = createStackNavigator({
  AppDrawerNavigator: { screen: AppDrawerNavigator, navigationOptions: { header: null } },
  SuccessReg: {
    screen: SuccessReg,
    navigationOptions: {
        title: 'Successful Customer Registration',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
  SuccessPoints: {
    screen: SuccessPoints,
    navigationOptions: {
        title: 'Success',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
  SuccessPoints2: {
    screen: SuccessPoints2,
    navigationOptions: {
        title: 'Success',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
  CustomerRewards: {
    screen: CustomerRewards,
    navigationOptions: {
        title: 'Customer History/Rewards',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
  LoadCard: {
    screen: LoadCard,
    navigationOptions: {
        title: 'Load Customer Card',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
  SuccessLoad: {
    screen: SuccessLoad,
    navigationOptions: {
        title: 'Success',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
  SuccessVoucher: {
    screen: SuccessVoucher,
    navigationOptions: {
        title: 'Success',
        headerStyle: {
          backgroundColor: '#134E13',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }
    },
  },
});

export default createAppContainer(
 createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Auth: AuthStackNavigator,
  App: FullApp
})
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#CD2626',
    justifyContent: 'center'
  }
});

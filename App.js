import React, {useEffect} from 'react';
import {connect} from 'react-redux';

import Login from './screens/Login';
import Splash from './screens/Splash';
import Home from './screens/Home';
import CreateAccount from './screens/CreateAccount';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {loginUser, loading, loadUser} from './action';

const Stack = createStackNavigator();
const App = ({state, loadUser}) => {
  useEffect(() => {
    loadUser();
  }, []);
  return (
    <NavigationContainer>
      {console.log('Line 20 ---', state.user)}
      {state.loading ? (
        <Stack.Navigator>
          <Stack.Screen name="Splash" component={Splash} />
        </Stack.Navigator>
      ) : state.user ? (
        <Stack.Navigator>
          <Stack.Screen name="Home" component={Home} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="NewUser" component={CreateAccount} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

const mapStateToProps = state => ({
  state: state.user,
});
const mapDispatchToProps = dispatch => ({
  loading: () => dispatch(loading()),
  loadUser: () => dispatch(loadUser()),
});
export default connect(mapStateToProps, mapDispatchToProps)(App);

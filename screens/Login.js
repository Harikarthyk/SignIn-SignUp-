import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {loading, loadUser, loginUser} from '../action';

export const Login = ({navigation, state, loading, loginUser, loadUser}) => {
  useEffect(() => {
    loadUser();
  }, []);
  const [input, setInput] = useState({
    email: 'john@gmail.com',
    password: 'password',
  });

  const loginHandler = () => {
    loading();
    // setTimeout(() => {
    loginUser(input);
    // }, 2000);
    // console.log(state);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.logo}>HeyAPP</Text>
      <View style={styles.inputView}>
        <TextInput
          style={styles.inputText}
          placeholder="Email..."
          value={input.email}
          placeholderTextColor="#003f5c"
          onChangeText={text => setInput({...input, email: text})}
        />
      </View>
      <View style={styles.inputView}>
        <TextInput
          secureTextEntry
          style={styles.inputText}
          value={input.password}
          placeholder="Password..."
          placeholderTextColor="#003f5c"
          onChangeText={text => setInput({...input, password: text})}
        />
      </View>
      <TouchableOpacity>
        <Text style={styles.forgot}>Forgot Password?</Text>
      </TouchableOpacity>
      {state.user.loading ? (
        <Text
          style={{
            fontWeight: 'bold',
            color: '#fb5b5a',
            textDecorationLine: 'underline',
          }}>
          Loading ...
        </Text>
      ) : (
        <TouchableOpacity
          onPress={() => loginHandler()}
          style={styles.loginBtn}>
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
      )}
      <TouchableOpacity onPress={() => navigation.navigate('NewUser')}>
        <Text
          style={{
            fontWeight: 'bold',
            color: '#fb5b5a',
            textDecorationLine: 'underline',
          }}>
          Signup
        </Text>
      </TouchableOpacity>
      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-around',
        }}>
        <TouchableOpacity
          style={[styles.loginBtn, {width: '45%', backgroundColor: '#D51010'}]}>
          <Text style={[styles.loginText, {fontWeight: 'bold'}]}>Google</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.loginBtn, {width: '45%', backgroundColor: '#007ACC'}]}>
          <Text style={[styles.loginText, {fontWeight: 'bold'}]}>Facebook</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  state: state,
});
const mapDispatchToProps = dispatch => ({
  loading: () => dispatch(loading()),
  loginUser: input => dispatch(loginUser(input)),
  loadUser: () => dispatch(loadUser()),
});
const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#F1F1F1',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    fontWeight: 'bold',
    fontSize: 50,
    color: '#fb5b5a',
    marginBottom: 40,
  },
  inputView: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 9,
    height: 50,
    marginBottom: 20,
    justifyContent: 'center',
    padding: 20,
    elevation: 1,
  },
  inputText: {
    height: 50,
    color: 'black',
    fontWeight: 'bold',
  },
  forgot: {
    color: '#fb5b5a',
    fontSize: 11,
    fontWeight: 'bold',
  },
  loginBtn: {
    width: '80%',
    backgroundColor: '#fb5b5a',
    borderRadius: 25,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 40,
    marginBottom: 10,
  },
  loginText: {
    color: 'white',
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);

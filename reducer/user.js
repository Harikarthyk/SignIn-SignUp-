import AsyncStorage from '@react-native-async-storage/async-storage';
import {login, createAccount} from './helper/auth';

const initialState = {
  user: null,
  loading: true,
  error: null,
  message: '',
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case 'LOADING': {
      return {...state, loading: true};
    }

    case 'LOAD_USER': {
      const getUser = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@storage_Key');
          if (jsonValue != null) {
            let parse = JSON.parse(jsonValue);
            return {
              ...state,
              user: parse,
              loading: false,
            };
          } else return {...state, loading: false};
        } catch (e) {
          return {...state, error: e, loading: false};
        }
      };
      let states = getUser();
      console.log(states);
      return states;
    }

    case 'LOGIN_USER': {
      login(action.playload.input)
        .then(response => {
          const storeData = async () => {
            try {
              const jsonValue = JSON.stringify(response.user);
              await AsyncStorage.setItem('@storage_Key', jsonValue);
              let newState = {
                ...state,
                user: response.user,
                loading: false,
                message: response.message,
                error: null,
              };
              return newState;
            } catch (e) {
              return {
                ...state,
                user: null,
                message: '',
                error: error,
                loading: false,
              };
            }
          };
          if (response.error) {
            return {...state, error: response.message, loading: false};
          } else return storeData();
        })
        .catch(error => {
          return {...state, error: response.message, loading: false};
        });
    }

    case 'REGISTER_NEW_USER': {
      //API Call and get a response
      // createAccount(state.input)
      //   .then(response => {
      //     console.log(response);
      //     const storeData = async () => {
      //       try {
      //         const jsonValue = JSON.stringify(response.user);
      //         await AsyncStorage.setItem('@storage_Key', jsonValue);
      //         return {
      //           ...state,
      //           user: null,
      //           loading: false,
      //           error: null,
      //           message: response.message,
      //         };
      //       } catch (e) {
      //         return {...state, error: e, loading: false};
      //       }
      //     };
      //     return storeData();
      //   })
      //   .catch(error => {
      //     return {...state, error: error, loading: false};
      //   });
    }

    case 'LOGOUT': {
      // console.log('Logout Invoked .. 000');
      const storeData = async () => {
        try {
          const jsonValue = null;
          await AsyncStorage.setItem('@storage_Key', jsonValue);
        } catch (e) {
          return state;
        }
      };
      storeData();
      return {
        ...state,
        loading: false,
        user: null,
        error: null,
      };
    }
    default:
      return state;
  }
};

export default user;

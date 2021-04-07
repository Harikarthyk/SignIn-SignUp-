const LOGIN_USER = 'LOGIN_USER';
const REGISTER_NEW_USER = 'REGISTER_NEW_USER';
const LOGOUT = 'LOGOUT';
const LOAD_USER = 'LOAD_USER';
const LOADING = 'LOADING';

export const logout = () => {
  return {
    type: LOGOUT,
  };
};

export const loading = () => {
  return {
    type: LOADING,
  };
};

export const loadUser = () => {
  return {
    type: LOAD_USER,
  };
};

export const loginUser = input => {
  return {
    type: LOGIN_USER,
    playload: {
      input,
    },
  };
};

export const registerNewUser = input => {
  return {
    type: REGISTER_NEW_USER,
    playload: {
      input,
    },
  };
};

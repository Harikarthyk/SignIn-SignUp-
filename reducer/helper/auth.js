import axios from 'axios';

export const API = `http://99b849aabdca.ngrok.io/api`;

export const login = input => {
  return fetch(`${API}/auth/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(input),
  })
    .then(response => {
      return response.json();
    })
    .catch(error => console.log(error));
};

// export const createAccount = input => {
//   return axios
//     .post(`${API}/auth/createAccount`, input)
//     .then(function (response) {
//       console.log(response);
//       return response.json();
//     })
//     .catch(function (error) {
//       console.log(error);
//     });
// };

import axios from 'axios';

const http = axios.create({
  baseURL: "https://hyper-annotator.herokuapp.com/api",
});

export const setAuthToken = (token) => {
  if (token) {
    http.defaults.headers.common['Authorization'] = token;
  } else {
    delete http.defaults.headers.common['Authorization'];
  }
};

export default http;

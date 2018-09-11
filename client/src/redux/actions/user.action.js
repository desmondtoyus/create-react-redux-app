import axios from 'axios';
import { FETCH_USERS, USER_LOGIN_MODAL, CLOSE_USER_MODAL, USER_INPUT,
  USER_SIGNUP_MODAL,  FETCH_USERS_ERROR, USER_LOGIN, USER_SIGNUP, USER_SIGNUP_ERROR, USER_LOGIN_ERROR   } from "./action.types";

// Authenticated Routes
  export const listUsers = (value) => dispatch => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get(`http://localhost:5000/api/user`)
        .then(response => {
          dispatch({type: FETCH_USERS, payload: response.data});
        })
        .catch(err => {
          console.log(err);
        })

  }

  export const changeInput = ({ prop, value }) => dispatch => {
    dispatch({ type: USER_INPUT, prop, value });
  };

  export const signInModal  = () => dispatch => {
    dispatch({type: USER_LOGIN_MODAL});
  }

  export const signIn  = (data) => dispatch => {
    axios.post(`http://localhost:5000/api/auth/login`, data) 
      .then(response => {
        localStorage.setItem('jwtToken', response.data.token);
        dispatch({type: USER_LOGIN, payload: response.data});
      })
      .catch(err => {
        console.log(err);
        dispatch({type: USER_LOGIN_ERROR, payload:'Sign In Error' });
      })
  }
  export const logOut  = () => {
  localStorage.removeItem('jwtToken');
  window.location.reload();
  }

  export const  signUpModal = () => dispatch => {
    dispatch({type: USER_SIGNUP_MODAL});
  }

  export const  closeUserModal = () => dispatch => {
    dispatch({type: CLOSE_USER_MODAL});
  }
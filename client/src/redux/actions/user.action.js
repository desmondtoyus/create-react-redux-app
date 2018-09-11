import axios from 'axios';
import { FETCH_USERS, USER_LOGIN_MODAL, CLOSE_USER_MODAL,
  USER_SIGNUP_MODAL,  FETCH_USERS_ERROR, USER_LOGIN, USER_SIGNUP, USER_SIGNUP_ERROR, USER_LOGIN_ERROR   } from "./action.types";
  import createHistory from 'history/createBrowserHistory'
  const history = createHistory()

  export const listUsers = (value) => dispatch => {
    axios.defaults.headers.common['Authorization'] = localStorage.getItem('jwtToken');
      axios.get(`http://localhost:5000/api/user`)
        .then(response => {
          dispatch({type: FETCH_USERS, payload: response.data, tabIndex: value});
        })
        .catch(err => {
          console.log(err);
        //   dispatch({type: FETCH_USERS_ERROR });
        history.push("/go");
        })

  }

  // logout = () => {
  //   localStorage.removeItem('jwtToken');
  //   window.location.reload();
  // }

  export const signInModal  = () => dispatch => {
    dispatch({type: USER_LOGIN_MODAL});
  }

  export const  signUpModal = () => dispatch => {
    dispatch({type: USER_SIGNUP_MODAL});
  }

  export const  closeUserModal = () => dispatch => {
    dispatch({type: CLOSE_USER_MODAL});
  }
import {FETCH_USERS, USER_LOGIN_MODAL, CLOSE_USER_MODAL,
  USER_SIGNUP_MODAL,  FETCH_USERS_ERROR, USER_LOGIN, USER_SIGNUP,USER_SIGNUP_ERROR, USER_LOGIN_ERROR   } from "../actions/action.types";

const  INITIAL_STATE ={
    users :[],
    tabIndex :0,
    isSignUp: false,
    email:'',
    password:'',
    name:'',
    loader: false,
    modalOpen:false
}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_USERS:
        if (action.tabIndex === 1) {
          return { ...state, users: action.payload, tabIndex:action.tabIndex };
        }
        return { ...state, tabIndex:action.tabIndex };
      case FETCH_USERS_ERROR :
      case USER_LOGIN_ERROR :
      case USER_SIGNUP_ERROR :
        return { ...INITIAL_STATE};
        case USER_LOGIN:
        return { ...INITIAL_STATE};
        case USER_SIGNUP :
        return { ...INITIAL_STATE};
        case USER_SIGNUP_MODAL:
        return { ...INITIAL_STATE, isSignUp: true, modalOpen:true  };
        case USER_LOGIN_MODAL:
        return { ...INITIAL_STATE, isSignUp: false, modalOpen:true };
        case CLOSE_USER_MODAL:
        return { ...INITIAL_STATE, isSignUp: false, modalOpen:false };
      default:
        return state;
    }
  }
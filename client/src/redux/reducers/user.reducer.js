import {FETCH_USERS, USER_LOGIN_MODAL, CLOSE_USER_MODAL, USER_INPUT, VERIFY_USER,
  VERIFY_USER_ERROR,
  USER_SIGNUP_MODAL,  FETCH_USERS_ERROR, USER_LOGIN, USER_SIGNUP,USER_SIGNUP_ERROR, USER_LOGIN_ERROR   } from "../actions/action.types";

const  INITIAL_STATE ={
    user :[],
    tabIndex :0,
    isSignUp: false,
    email:'',
    password:'',
    name:'',
    loader: false,
    modalOpen:false,
    errorMsg:'',
    password:'',

}

export default function(state = INITIAL_STATE, action) {
    switch(action.type) {
        case FETCH_USERS:
        if (action.tabIndex === 1) {
          return { ...state, user: action.payload, tabIndex:action.tabIndex };
        }
        return { ...state, tabIndex:action.tabIndex };
      case FETCH_USERS_ERROR :
      case USER_LOGIN_ERROR :
      case USER_SIGNUP_ERROR :
      case VERIFY_USER_ERROR:
        return { ...INITIAL_STATE, errorMsg:action.errorMsg, loader: false,};
        case USER_LOGIN:
        return { ...state, user:action.payload.user,loader: false};
        case VERIFY_USER:
        return { ...state, user:action.payload.user};
        case USER_INPUT:
        return { ...state, [action.prop]: action.value};
        case USER_SIGNUP :
        return { ...state};
        case USER_SIGNUP_MODAL:
        return { ...state, isSignUp: true, modalOpen:true  };
        case USER_LOGIN_MODAL:
        return { ...state, isSignUp: false, modalOpen:true };
        case CLOSE_USER_MODAL:
        return { ...state, isSignUp: false, modalOpen:false };
      default:
        return state;
    }
  }
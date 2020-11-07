import { handleActions } from 'redux-actions';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import * as actions from '../actions';

const defaultState = {
  isAuth: false,
  errorEmail: '',
  errorPassword: '',
  isValid: true,
};

export default handleActions({
  [actions.authUserSucceeded](state, { auth }) {
    const { refresh, access } = auth;
    sessionStorage.setItem('accessToken', access);
    sessionStorage.setItem('refreshToken', refresh);
    return { ...state, isValid: true, errorEmail: '', errorPassword: '', isAuth: true };
  },
  [actions.authUserFailed](state) {
    return { ...state, errorEmail: 'Неверный email или пароль', isValid: false };
  },
  [actions.setPasswordErrorText](state, { payload: { msg, isValid } }) {
    return { ...state, errorPassword: msg, isValid };
  },
  [actions.setEmailErrorText](state, { payload: { msg, isValid } }) {
    return { ...state, errorEmail: msg, isValid };
  },
  [actions.resetErrorAuth](state) {
    return { ...state, errorEmail: '', errorPassword: '', isValid: true };
  },
  [actions.checkAuthTokenSucceded](state, { auth }) {
    const { refresh, access } = auth;
    // sessionStorage.setItem('accessToken', access);
    // sessionStorage.setItem('refreshToken', refresh);
    return { ...state, isAuth: true };
  },
  [actions.checkAuthTokenFailed](state, { auth }) {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    return { ...state, isAuth: false };
  },
  [actions.exitApp](state, { auth }) {
    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('refreshToken');
    return { ...state, isAuth: false };
  },
}, defaultState);


import { handleActions } from 'redux-actions';
import map from 'lodash/map';
import isEmpty from 'lodash/isEmpty';
import * as actions from '../actions';

const defaultState = {
  isAuth: false,
  isValid: true,
  msgError: '',
};

export default handleActions({
  [actions.authUserSucceeded](state, { auth }) {
    const { refresh, access } = auth;
    sessionStorage.setItem('accessToken', access);
    sessionStorage.setItem('refreshToken', refresh);
    return { ...state, isValid: true, msgError: '', isAuth: true };
  },
  [actions.authUserFailed](state) {
    return { ...state, msgError: 'Неверный email или пароль', isValid: false };
  },
  [actions.resetErrorAuth](state) {
    return { ...state, msgError: '', isValid: true };
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


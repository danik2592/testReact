import { combineReducers } from 'redux';

import auth from './auth';
import clients from './clients';

export default combineReducers({
  auth,
  clients,
});

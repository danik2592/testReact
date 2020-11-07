import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import isEmpty from 'lodash/isEmpty';
import { checkAuthToken } from '../actions/index';
import App from '../components/App';

function mapStateToProps(state) {
  return {
    isAuth: !isEmpty(sessionStorage.getItem('accessToken')),
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ checkAuthToken }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

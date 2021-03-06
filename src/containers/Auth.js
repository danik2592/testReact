import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { authUser, setEmailErrorText, setPasswordErrorText, resetErrorAuth } from '../actions/index';
import Auth from '../components/Auth';

function mapStateToProps(state) {
  return {
    msgError: state.auth.msgError,
    isValid: state.auth.isValid,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ authUser, resetErrorAuth, setEmailErrorText, setPasswordErrorText }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);

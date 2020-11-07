import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCompanyDetail, updateActiveCompany, updateCompany, resetUpdate } from '../actions/index';
import FormClient from '../components/FormClient';

function mapStateToProps(state) {
  return {
    errorEmail: state.auth.errorEmail,
    errorPassword: state.auth.errorPassword,
    isValid: state.auth.isValid,
    activeCompanyId: state.clients.activeCompanyId,
    activeCompany: state.clients.activeCompany,
    isLoadActiveCompany: state.clients.isLoadActiveCompany,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompanyDetail, updateActiveCompany, updateCompany, resetUpdate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(FormClient);

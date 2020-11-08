import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getCompanies, addCompany, exitApp,  resetUpdate } from '../actions/index';
import Clients from '../components/Clients';

function mapStateToProps(state) {
  return {
    isAuth: state.auth.isAuth,
    activeCompanyId: state.clients.activeCompanyId,
    activeCompany: state.clients.activeCompany,
    initialValues: {
      ...state.clients.activeCompany,
    },
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ getCompanies, addCompany, exitApp, resetUpdate }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Clients);

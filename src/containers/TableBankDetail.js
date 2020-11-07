import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { addCompanyBankDetail, updateCompanyBankDetail, deleteCompanyBankDetail } from '../actions/index';
import TableBankDetail from '../components/TableBankDetail';

function mapStateToProps(state) {
  return {
    data: state.clients.activeCompany.bank_details,
    activeCompanyId: state.clients.activeCompanyId,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ addCompanyBankDetail, updateCompanyBankDetail, deleteCompanyBankDetail }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableBankDetail);

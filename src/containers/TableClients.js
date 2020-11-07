import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { deleteCompanies, tableChangeFilter, refreshFilter, activeCompany, tableChangePage, tableChangeRowsToPage } from '../actions/index';
import TableClients from '../components/TableClients';

function mapStateToProps(state) {
  return {
    rows: state.clients.isFiltred ? state.clients.filterData : state.clients.data,
    page: state.clients.page,
    rowsPerPage: state.clients.rowsPerPage,
    regions: state.clients.regions,
    types: state.clients.types,
    activeCompanyId: state.clients.activeCompanyId,
    filterColName: state.clients.filterColName,
    filterColType: state.clients.filterColType,
    filterColRegion: state.clients.filterColRegion,
    filterColCity: state.clients.filterColCity,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ refreshFilter, tableChangeFilter, deleteCompanies, activeCompany, tableChangePage, tableChangeRowsToPage }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(TableClients);

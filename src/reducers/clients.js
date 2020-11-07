import { handleActions } from 'redux-actions';
import map from 'lodash/map';
import uniq from 'lodash/uniq';
import filter from 'lodash/filter';
import isEmpty from 'lodash/isEmpty';
import forEach from 'lodash/forEach';
import includes from 'lodash/includes';
import lowerCase from 'lodash/lowerCase';
import * as actions from '../actions';


const defaultState = {
  data: [],
  regions: [],
  types: [],
  activeCompanyId: '',
  activeCompany: {
    address: '',
    bank_details: [],
    bin_iin: '',
    city: '',
    contacts: [],
    description: '',
    email: '',
    id: '',
    is_client: true,
    is_contractor: false,
    is_owner: false,
    is_partner: false,
    is_provider: false,
    kbe: '',
    leader: '',
    leader_position: '',
    name: '',
    phone: '',
    region: '',
    registered_address: '',
    registered_name: '',
    registered_size: '',
    registered_type: '',
    shortname: '',
    tax_payer: '',
    type: '',
    workscope: '',
  },
  isLoadActiveCompany: false,
  numSelected: 0,
  order: 'asc',
  orderBy: 'calories',
  page: 0,
  rowsPerPage: 5,
  filterColName: '',
  filterColType: '',
  filterColRegion: '',
  filterColCity: '',
  filterData: [],
  isFiltred: false,
};

export default handleActions({
  [actions.refreshFilter](state) {
    return { ...state, isFiltred: false, filterData: [], filterColName: '', filterColRegion: '', filterColType: '', filterColCity: '' };
  },
  [actions.tableChangeFilter](state, { payload: { name, value } }) {
    const { data } = state;
    let filterData = [...data];
    console.log('tableChangeFilter', name, value);
    let isFiltred = false;
    if (!isEmpty(value) && name === 'filterColType') {
      filterData = filter(filterData, row => lowerCase(row.registered_type) === lowerCase(value));
      isFiltred = true;
    }
    if (!isEmpty(value) && name === 'filterColRegion') {
      filterData = filter(filterData, row => lowerCase(row.region) === lowerCase(value));
      isFiltred = true;
    }
    if (!isEmpty(value) && name === 'filterColName') {
      filterData = filter(filterData, row => includes(lowerCase(row.name), lowerCase(value)));
      isFiltred = true;
    }
    if (!isEmpty(value) && name === 'filterColCity') {
      filterData = filter(filterData, row => includes(lowerCase(row.city), lowerCase(value)));
      isFiltred = true;
    }
    return { ...state, filterData, isFiltred, [name]: value, page: 0 };
  },
  [actions.tableChangePage](state, { payload: { page } }) {
    return { ...state, page };
  },
  [actions.tableChangeRowsToPage](state, { payload: { rows } }) {
    return { ...state, rowsPerPage: rows, page: 0 };
  },
  [actions.getCompaniesSucceeded](state, { companies }) {
    const { results } = companies;
    const types = ['TOO', 'AO', 'ИП'];
    const newResult = map(results, (row, index) => {
      const idx = index % 3;
      return { ...row, registered_type: types[idx] };
    });
    const regions = map(results, row => row.region);
    const newRegions = filter(regions, row => !isEmpty(row));
    const regTypes = map(results, row => row.registered_type);
    const newTypes = filter(regTypes, row => !isEmpty(row));
    return {
      ...state, data: newResult, regions: uniq(newRegions), types: uniq(newTypes),
    };
  },
  [actions.getCompaniesFailed](state) {
    return { ...state, data: [] };
  },
  [actions.activeCompany](state, { payload: { id } }) {
    return { ...state, activeCompanyId: id };
  },
  [actions.deleteCompanies](state, { payload: { id } }) {
    const { data } = state;
    const newData = filter(data, row => row.id !== id);
    return { ...state, data: newData };
  },
  [actions.updateActiveCompany](state, { payload: { activeCompany } }) {
    return { ...state, activeCompany };
  },
  [actions.resetUpdate](state) {
    return { ...state, activeCompanyId: '' };
  },
  [actions.deleteCompaniesSucceeded](state, { companies, action }) {
    return { ...state };
  },
  [actions.deleteCompaniesFailed](state) {
    return { ...state };
  },
  [actions.addCompanySucceeded](state, { companies, action }) {
    console.log('addCompanySucceeded', companies, action);
    const { data } = state;
    const newData = [...data];
    newData.push(companies);
    const regions = map(newData, row => row.region);
    const newRegions = filter(regions, row => !isEmpty(row));
    const regTypes = map(newData, row => row.registered_type);
    const newTypes = filter(regTypes, row => !isEmpty(row));
    return {
      ...state, data: newData, regions: uniq(newRegions), types: uniq(newTypes),
    };
  },
  [actions.updateCompanySucceeded](state, { companies, action }) {
    const { data } = state;
    const newData = filter(data, row => row.id !== companies.id);
    newData.push(companies);
    const regions = map(newData, row => row.region);
    const newRegions = filter(regions, row => !isEmpty(row));
    const regTypes = map(newData, row => row.registered_type);
    const newTypes = filter(regTypes, row => !isEmpty(row));
    return {
      ...state, data: newData, regions: uniq(newRegions), types: uniq(newTypes),
    };
  },
  [actions.addCompanyFailed](state) {
    return { ...state };
  },
  [actions.getCompanyDetailSucceeded](state, { client, action }) {
    return { ...state, activeCompany: client, isLoadActiveCompany: true };
  },
  [actions.getCompanyDetailFailed](state) {
    return { ...state, isLoadActiveCompany: false };
  },
  [actions.addCompanyBankDetailSucceeded](state, { data, action }) {
    const { activeCompany } = state;
    const { bank_details } = activeCompany;
    const newDet = [...bank_details];
    newDet.push(data);
    const newActiveCompany = { ...activeCompany, bank_details: newDet };
    return { ...state, activeCompany: newActiveCompany };
  },
  [actions.updateCompanyBankDetailSucceeded](state, { data, action }) {
    const { activeCompany } = state;
    const { bank_details } = activeCompany;
    const newDetail = filter(bank_details, row => row.id !== action.id);
    newDetail.push(data);
    const newActiveCompany = { ...activeCompany, bank_details: newDetail };
    return { ...state, activeCompany: newActiveCompany };
  },
  [actions.deleteCompanyBankDetailSucceeded](state, { data, action }) {
    const { activeCompany } = state;
    const newDet = filter(activeCompany.bank_details, row => row.id !== action.id);
    const newActiveCompany = { ...activeCompany, bank_details: newDet };
    return { ...state, activeCompany: newActiveCompany };
  },
}, defaultState);


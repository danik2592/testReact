import { call, put, takeLatest, all, fork } from 'redux-saga/effects';
import * as a from '../constants/action-constants';
import * as Api from '../services/api';


function* requestEntity(entity, apiCall, action) {
  try {
    const response = yield call(apiCall, action.payload);
    console.log('ok: ', action, response.data);
    yield put({ type: `${action.type}_SUCCEEDED`, [entity]: response.data, action: action.payload });
  } catch (e) {
    yield put({ type: `${action.type}_FAILED` });
  }
}

const authUser = requestEntity.bind(null, 'auth', Api.authUser);
const getCompanies = requestEntity.bind(null, 'companies', Api.getCompanies);
const updateCompany = requestEntity.bind(null, 'companies', Api.updateCompany);
const deleteCompany = requestEntity.bind(null, 'companies', Api.deleteCompany);
const addCompany = requestEntity.bind(null, 'companies', Api.addCompany);
const verifyToken = requestEntity.bind(null, 'auth', Api.verifyToken);
const getCompanyInfo = requestEntity.bind(null, 'client', Api.getProviderByCompany);
const getCompanyBankDetail = requestEntity.bind(null, 'data', Api.getCompanyBankDetail);
const addCompanyBankDetail = requestEntity.bind(null, 'data', Api.addCompanyBankDetail);
const deleteCompanyBankDetail = requestEntity.bind(null, 'data', Api.deleteCompanyBankDetail);
const updateCompanyBankDetail = requestEntity.bind(null, 'data', Api.updateCompanyBankDetail);


function* watchAuthUser() {
  yield takeLatest(a.ACTION_AUTH_USER, authUser);
}
function* watchGetCompanies() {
  yield takeLatest(a.ACTION_GET_COMPANIES, getCompanies);
}
function* watchDeleteCompanies() {
  yield takeLatest(a.ACTION_DELETE_COMPANIES, deleteCompany);
}
function* watchVerifyToken() {
  yield takeLatest(a.ACTION_CHECK_AUTH_TOKEN, verifyToken);
}
function* watchFetchCompanyInfo() {
  yield takeLatest(a.ACTION_GET_COMPANY_DETAIL, getCompanyInfo);
}
function* watchAddCompany() {
  yield takeLatest(a.ACTION_ADD_COMPANIES, addCompany);
}
function* watchUpdateCompany() {
  yield takeLatest(a.ACTION_UPDATE_COMPANIES, updateCompany);
}
function* watchUpdateCompanyBankDetail() {
  yield takeLatest(a.ACTION_UPDATE_COMPANY_BANK_DETAIL, updateCompanyBankDetail);
}
function* watchDeleteCompanyBankDetail() {
  yield takeLatest(a.ACTION_DELETE_COMPANY_BANK_DETAIL, deleteCompanyBankDetail);
}
function* watchAddCompanyBankDetail() {
  yield takeLatest(a.ACTION_ADD_COMPANY_BANK_DETAIL, addCompanyBankDetail);
}
function* watchGetCompanyBankDetail() {
  yield takeLatest(a.ACTION_GET_COMPANY_BANK_DETAIL, getCompanyBankDetail);
}
export default function* rootSaga() {
  yield all([
    fork(watchAuthUser),
    fork(watchGetCompanies),
    fork(watchVerifyToken),
    fork(watchDeleteCompanies),
    fork(watchFetchCompanyInfo),
    fork(watchAddCompany),
    fork(watchUpdateCompany),
    fork(watchUpdateCompanyBankDetail),
    fork(watchDeleteCompanyBankDetail),
    fork(watchAddCompanyBankDetail),
    fork(watchGetCompanyBankDetail),
  ]);
}

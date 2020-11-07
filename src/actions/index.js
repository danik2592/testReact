import { createAction } from 'redux-actions';
import * as names from '../constants/action-constants';

export const checkAuthUser = createAction(names.ACTION_CHECK_AUTH_USER);
export const exitApp = createAction(names.ACTION_EXIT_APP);
export const refreshFilter = createAction(names.ACTION_RESET_FILTER_TABLE);
export const tableChangeFilter = createAction(names.ACTION_TABLE_FILTER_INPUT, (name, value) => ({ name, value }));
export const tableChangePage = createAction(names.ACTION_TABLE_CHANGE_PAGE, page => ({ page }));
export const tableChangeRowsToPage = createAction(names.ACTION_TABLE_CHANGE_ROWS_PER_PAGE, rows => ({ rows }));
export const resetUpdate = createAction(names.ACTION_RESET_UPDATE);
export const activeCompany = createAction(names.ACTION_ACTIVE_COMPANY, id => ({id}));
export const updateActiveCompany = createAction(names.ACTION_UPDATE_ACTIVE_COMPANY, activeCompany => ({activeCompany}));
export const checkAuthToken = createAction(names.ACTION_CHECK_AUTH_TOKEN, token => ({ token }));
export const checkAuthTokenSucceded = createAction(names.ACTION_CHECK_AUTH_TOKEN_SUCCEEDED, (auth) => ({ auth }));
export const checkAuthTokenFailed = createAction(names.ACTION_CHECK_AUTH_TOKEN_FAILED);
export const resetErrorAuth = createAction(names.ACTION_RESET_ERROR_AUTH);
export const setEmailErrorText = createAction(names.ACTION_SET_EMAIL_ERROR_TEXT, (msg, isValid) => ({ msg, isValid }));
export const setPasswordErrorText = createAction(names.ACTION_SET_PASSWORD_ERROR_TEXT, (msg, isValid) => ({ msg, isValid }));
export const authUser = createAction(names.ACTION_AUTH_USER, (email, password) => ({ email, password }));
export const authUserSucceeded = createAction(names.ACTION_AUTH_USER_SUCCEEDED, (auth) => ({ auth }));
export const authUserFailed = createAction(names.ACTION_AUTH_USER_FAILED);
export const getCompanies = createAction(names.ACTION_GET_COMPANIES);
export const getCompaniesSucceeded = createAction(names.ACTION_GET_COMPANIES_SUCCEEDED, (companies) => ({ companies }));
export const getCompaniesFailed = createAction(names.ACTION_GET_COMPANIES_FAILED);

export const deleteCompanies = createAction(names.ACTION_DELETE_COMPANIES, (id) => ({ id }));
export const deleteCompaniesSucceeded = createAction(names.ACTION_DELETE_COMPANIES_SUCCEEDED, (companies, action) => ({ companies, action }));
export const deleteCompaniesFailed = createAction(names.ACTION_DELETE_COMPANIES_FAILED);

export const getCompanyDetail = createAction(names.ACTION_GET_COMPANY_DETAIL, (id) => ({ id }));
export const getCompanyDetailSucceeded = createAction(names.ACTION_GET_COMPANY_DETAIL_SUCCEEDED, (client, action) => ({ client, action }));
export const getCompanyDetailFailed = createAction(names.ACTION_GET_COMPANY_DETAIL_FAILED);

export const addCompany = createAction(names.ACTION_ADD_COMPANIES, (form) => ({form}));
export const addCompanySucceeded = createAction(names.ACTION_ADD_COMPANIES_SUCCEEDED, (companies, action) => ({ companies, action }));
export const addCompanyFailed = createAction(names.ACTION_ADD_COMPANIES_FAILED);

export const updateCompany = createAction(names.ACTION_UPDATE_COMPANIES, (activeCompany) => ({activeCompany}));
export const updateCompanySucceeded = createAction(names.ACTION_UPDATE_COMPANIES_SUCCEEDED, (companies, action) => ({ companies, action }));
export const updateCompanyFailed = createAction(names.ACTION_UPDATE_COMPANIES_FAILED);

export const getCompanyBankDetail = createAction(names.ACTION_GET_COMPANY_BANK_DETAIL, (companyId, id) => ({ companyId, id }));
export const getCompanyBankDetailSucceeded = createAction(names.ACTION_GET_COMPANY_BANK_DETAIL_SUCCEEDED, (data, action) => ({ data, action }));
export const getCompanyBankDetailFailed = createAction(names.ACTION_GET_COMPANY_BANK_DETAIL_FAILED);

export const deleteCompanyBankDetail = createAction(names.ACTION_DELETE_COMPANY_BANK_DETAIL, (companyId, id) => ({ companyId, id }));
export const deleteCompanyBankDetailSucceeded = createAction(names.ACTION_DELETE_COMPANY_BANK_DETAIL_SUCCEEDED, (data, action) => ({ data, action }));
export const deleteCompanyBankDetailFailed = createAction(names.ACTION_DELETE_COMPANY_BANK_DETAIL_FAILED);

export const addCompanyBankDetail = createAction(names.ACTION_ADD_COMPANY_BANK_DETAIL, (companyId, data) => ({ companyId, data }));
export const addCompanyBankDetailSucceeded = createAction(names.ACTION_ADD_COMPANY_BANK_DETAIL_SUCCEEDED, (data, action) => ({ data, action }));
export const addCompanyBankDetailFailed = createAction(names.ACTION_ADD_COMPANY_BANK_DETAIL_FAILED);

export const updateCompanyBankDetail = createAction(names.ACTION_UPDATE_COMPANY_BANK_DETAIL, (companyId, id, data) => ({ companyId, id, data }));
export const updateCompanyBankDetailSucceeded = createAction(names.ACTION_UPDATE_COMPANY_BANK_DETAIL_SUCCEEDED, (data, action) => ({ data, action }));
export const updateCompanyBankDetailFailed = createAction(names.ACTION_UPDATE_COMPANY_BANK_DETAIL_FAILED);
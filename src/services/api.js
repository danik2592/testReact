import axios from 'axios';

export const authUser = ({ email, password }) => {
  return axios.post('http://194.67.90.67/api/v1/token/', { email, password });
};
export const verifyToken = ({ token }) => {
  return axios.post('http://194.67.90.67/api/v1/token/verify/', { token });
};
export const getCompanies = () => {
  const token = sessionStorage.getItem('accessToken');
  return axios.get('http://194.67.90.67/api/v1/companies/', {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const deleteCompany = ({ id }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.delete(`http://194.67.90.67/api/v1/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const getBankDetailByCompany = ({ id }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.get(`http://194.67.90.67/api/v1/companies/${id}/bank_details`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const getProviderByCompany = ({ id }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.get(`http://194.67.90.67/api/v1/companies/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },

  });
};
export const updateCompany = ({ activeCompany }) => {
  const { id } =  activeCompany;
  const token = sessionStorage.getItem('accessToken');
  return axios.put(`http://194.67.90.67/api/v1/companies/${id}/`, {
    ...activeCompany,
  },{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const addCompany = ({ form }) => {
  const { name, region, city, phone, email, shortName, registered_type, workscope, addition } = form;
  const token = sessionStorage.getItem('accessToken');
  return axios.post('http://194.67.90.67/api/v1/companies/', {
    city,
    is_client: true,
    is_contractor: false,
    is_owner: false,
    is_partner: false,
    is_provider: false,
    name,
    region,
    phone,
    email,
    description: addition,
    shortname: shortName,
    registered_type,
    workscope,
  },{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const addCompanyBankDetail = ({ companyId, data }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.post(`http://194.67.90.67/api/v1/companies/${companyId}/bank_details/`, {...data, company: companyId},{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const updateCompanyBankDetail = ({ companyId, id, data }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.put(`http://194.67.90.67/api/v1/companies/${companyId}/bank_details/${id}/`, {...data},{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const deleteCompanyBankDetail = ({ companyId, id }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.delete(`http://194.67.90.67/api/v1/companies/${companyId}/bank_details/${id}/`,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
export const getCompanyBankDetail = ({ companyId, data }) => {
  const token = sessionStorage.getItem('accessToken');
  return axios.get(`http://194.67.90.67/api/v1/companies/${companyId}/bank_details/`,{
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });
};
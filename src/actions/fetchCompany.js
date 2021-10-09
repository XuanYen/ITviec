import {
    FETCH_COMPANY,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILED
} from '../constants/ActionTypes';

import { fetchCompanySerivce } from '../services';
export default (page) => {
    return dispatch => {
        dispatch(fetchCompany(page));
        fetchCompanySerivce(page)
            .then(listCompanies => dispatch(fetchCompanySuccess(listCompanies)))
            .catch(error => dispatch(fetchCompanyFailed(error)))
    }
}

const fetchCompany = (page) => ({
    type: FETCH_COMPANY
})

const fetchCompanySuccess = listCompanies => ({
    type: FETCH_COMPANY_SUCCESS,
    payload: { listCompanies }
})

const fetchCompanyFailed = error => ({
    type: FETCH_COMPANY_FAILED,
    payload: { error }
})
import {
    FETCH_COMPANY_DETAIL,
    FETCH_COMPANY_DETAIL_SUCCESS,
    FETCH_COMPANY_DETAIL_FAILED
} from '../constants/ActionTypes';

import { fetchCompanyDetailService } from '../services';
export default (id) => {
    return dispatch => {
        dispatch(fetchCompanyDetail(id));
        fetchCompanyDetailService(id)
            .then(companyDetail => dispatch(fetchCompanyDetailSuccess(companyDetail)))
            .catch(error => dispatch(fetchCompanyDetailFailed(error)))
    }
}

const fetchCompanyDetail = (id) => ({
    type: FETCH_COMPANY_DETAIL
})

const fetchCompanyDetailSuccess = companyDetail => ({
    type: FETCH_COMPANY_DETAIL_SUCCESS,
    payload: { companyDetail }
})

const fetchCompanyDetailFailed = error => ({
    type: FETCH_COMPANY_DETAIL_FAILED,
    payload: { error }
})
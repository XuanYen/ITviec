import {
    FETCH_JOB_DETAIL,
    FETCH_JOB_DETAIL_SUCCESS,
    FETCH_JOB_DETAIL_FAILED
} from '../constants/ActionTypes';

import { fetchJobDetailService } from '../services';
export default (id) => {
    return dispatch => {
        dispatch(fetchJobDetail(id));
        fetchJobDetailService(id)
            .then(jobDetail => dispatch(fetchJobDetailSuccess(jobDetail)))
            .catch(error => dispatch(fetchJobDetailFailed(error)))
    }
}

const fetchJobDetail = (id) => ({
    type: FETCH_JOB_DETAIL
})

const fetchJobDetailSuccess = jobDetail => ({
    type: FETCH_JOB_DETAIL_SUCCESS,
    payload: { jobDetail }
})

const fetchJobDetailFailed = error => ({
    type: FETCH_JOB_DETAIL_FAILED,
    payload: { error }
})
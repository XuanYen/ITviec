import {
    FETCH_JOB_DETAIL,
    FETCH_JOB_DETAIL_SUCCESS,
    FETCH_JOB_DETAIL_FAILED
} from '../constants/ActionTypes';

import { fetchJobDetailSerivce } from '../services';
export default () => {
    return dispatch => {
        dispatch(fetchJobDetail());
        fetchJobDetailSerivce(id)
            .then(jobDetail => dispatch(fetchJobDetailSuccess(jobDetail)))
            .catch(error => dispatch(fetchJobDetailFailed(error)))
    }
}

const fetchJobDetail = () => ({
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
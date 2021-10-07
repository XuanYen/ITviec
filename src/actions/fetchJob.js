import {
    FETCH_JOB,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILED
} from '../constants/ActionTypes';

import { fetchJobSerivce } from '../services';
export default () => {
    return dispatch => {
        dispatch(fetchJob());
        fetchJobSerivce()
            .then(listJobs => dispatch(fetchJobSuccess(listJobs)))
            .catch(error => dispatch(fetchJobFailed(error)))
    }
}

const fetchJob = () => ({
    type: FETCH_JOB
})

const fetchJobSuccess = listJobs => ({
    type: FETCH_JOB_SUCCESS,
    payload: { listJobs }
})

const fetchJobFailed = error => ({
    type: FETCH_JOB_FAILED,
    payload: { error }
})
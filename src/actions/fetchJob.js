import {
    FETCH_JOB,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILED
} from '../constants/ActionTypes';

import { fetchJobSerivce } from '../services';
export default (page) => {
    return dispatch => {
        dispatch(fetchJob(page));
        fetchJobSerivce(page)
            .then(listJobs => dispatch(fetchJobSuccess(listJobs)))
            .catch(error => dispatch(fetchJobFailed(error)))
    }
}

const fetchJob = (page) => ({
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
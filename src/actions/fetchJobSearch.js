import {
    FETCH_JOB_SEARCH,
    FETCH_JOB_SEARCH_SUCCESS,
    FETCH_JOB_SEARCH_FAILED
} from '../constants/ActionTypes';

import { fetchJobSearchSerivce } from '../services';
export default (searchQuery) => {
    return dispatch => {
        dispatch(fetchJobSearch(searchQuery));
        fetchJobSearchSerivce(searchQuery)
            .then(listSearchJobs => dispatch(fetchJobSearchSuccess(listSearchJobs)))
            .catch(error => dispatch(fetchJobSearchFailed(error)))
    }
}

const fetchJobSearch = (searchQuery) => ({
    type: FETCH_JOB_SEARCH
})

const fetchJobSearchSuccess = listSearchJobs => ({
    type: FETCH_JOB_SEARCH_SUCCESS,
    payload: { listSearchJobs }
})

const fetchJobSearchFailed = error => ({
    type: FETCH_JOB_SEARCH_FAILED,
    payload: { error }
})
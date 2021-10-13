import {
    FETCH_JOB,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILED,
    FETCH_JOB_DETAIL,
    FETCH_JOB_DETAIL_SUCCESS,
    FETCH_JOB_DETAIL_FAILED,
    FETCH_JOB_SEARCH,
    FETCH_JOB_SEARCH_SUCCESS,
    FETCH_JOB_SEARCH_FAILED
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    listJobs: {},
    jobDetail: {},
    listSearchJobs: {}
}

var rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOB:
            return {
                loading: true,
                listJobs: {},
                error: null
            };
        case FETCH_JOB_SUCCESS:
            return {
                loading: false,
                listJobs: action.payload.listJobs,
                error: null
            };
        case FETCH_JOB_FAILED:
            return {
                loading: false,
                listJobs: {},
                error: action.payload.error
            }
        case FETCH_JOB_DETAIL:
            return {
                loading: true,
                jobDetail: {},
                error: null
            };
        case FETCH_JOB_DETAIL_SUCCESS:
            return {
                loading: false,
                jobDetail: action.payload.jobDetail,
                error: null
            };
        case FETCH_JOB_DETAIL_FAILED:
            return {
                loading: false,
                jobDetail: {},
                error: action.payload.error
            }
        case FETCH_JOB_SEARCH:
            return {
                loading: true,
                listSearchJobs: {},
                error: null
            }
        case FETCH_JOB_SEARCH_SUCCESS:
            return {
                loading: false,
                listSearchJobs: action.payload.listSearchJobs,
                error: null
            }
        case FETCH_JOB_SEARCH_FAILED:
            return {
                loading: false,
                listSearchJob: {},
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default rootReducer;

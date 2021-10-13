import {
    FETCH_JOB_SEARCH,
    FETCH_JOB_SEARCH_SUCCESS,
    FETCH_JOB_SEARCH_FAILED
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    listSearchJobs: {}
}

var rootReducer = (state = initialState, action) => {
    switch (action.type) {
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

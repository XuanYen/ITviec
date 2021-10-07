import {
    FETCH_JOB,
    FETCH_JOB_SUCCESS,
    FETCH_JOB_FAILED
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    listJobs: []
}

var rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_JOB:
            return {
                loading: true,
                listJobs: [],
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
                listJobs: [],
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default rootReducer;

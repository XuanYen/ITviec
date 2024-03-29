import {
    FETCH_JOB_DETAIL,
    FETCH_JOB_DETAIL_SUCCESS,
    FETCH_JOB_DETAIL_FAILED,
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    jobDetail: {},
}

var rootReducer = (state = initialState, action) => {
    switch (action.type) {
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
        default:
            return state;
    }
}
export default rootReducer;

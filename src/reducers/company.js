import {
    FETCH_COMPANY_DETAIL,
    FETCH_COMPANY_DETAIL_SUCCESS,
    FETCH_COMPANY_DETAIL_FAILED
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    companyDetail: {}
}

var rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPANY_DETAIL:
            return {
                loading: true,
                companyDetail: {},
                error: null
            };
        case FETCH_COMPANY_DETAIL_SUCCESS:
            return {
                loading: false,
                companyDetail: action.payload.companyDetail,
                error: null
            };
        case FETCH_COMPANY_DETAIL_FAILED:
            return {
                loading: false,
                companyDetail: {},
                error: action.payload.error
            }
        default:
            return state;
    }
}
export default rootReducer;

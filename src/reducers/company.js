import {
    FETCH_COMPANY,
    FETCH_COMPANY_SUCCESS,
    FETCH_COMPANY_FAILED,
    FETCH_COMPANY_DETAIL,
    FETCH_COMPANY_DETAIL_SUCCESS,
    FETCH_COMPANY_DETAIL_FAILED
} from '../constants/ActionTypes'

const initialState = {
    loading: false,
    error: null,
    listCompanies: {},
    companyDetail: {}
}

var rootReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_COMPANY:
            return {
                loading: true,
                listCompanies: {},
                error: null
            };
        case FETCH_COMPANY_SUCCESS:
            return {
                loading: false,
                listCompanies: action.payload.listCompanies,
                error: null
            };
        case FETCH_COMPANY_FAILED:
            return {
                loading: false,
                listCompanies: {},
                error: action.payload.error
            }
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

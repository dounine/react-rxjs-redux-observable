import ApiCode from "../cons/ApiCode";
import actionTypes from "../actions/types";
const initState = {items:[]};
const reducers = (state = initState,action)=>{
    let nextState = {...state};
    switch (action.type){
        case actionTypes.USER_QUERY_SUCCESS:
            nextState = {...action.payload};
            break;
        case actionTypes.USER_CHANGE_INPUT:
            nextState.username = action.username;
            break;
        case actionTypes.USER_QUERY_FAILED:
            nextState.error = action.error.code;
            break;
        default:
            break;
    }
    return nextState;
};

export default reducers;
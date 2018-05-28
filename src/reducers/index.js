import ApiCode from "../cons/ApiCode";
import actionTypes from "../actions/types";
const initState = {};
const reducers = (state = initState,action)=>{
    let nextState = {...state};
    switch (action.type){
        case actionTypes.USER_QUERY_SUCCESS:
            nextState.github = {...nextState.github};
            nextState.github.items = action.payload.items;
            break;
        case actionTypes.USER_CHANGE_INPUT:
            nextState.search_username = action.username;
            break;
        case actionTypes.USER_QUERY_FAILED:
            nextState.error = action.error.code;
            break;
        default:
            nextState={...nextState,...action.payload}
            break;
    }
    return nextState;
};

export default reducers;
import actionTypes from "../actions/types";
let count = 1;
const middleware = store => next => action => {
    let result = null;
    switch (action.type) {
        case actionTypes.PERSIST_REHYDRATE://ready persist cache data
            result = next(action);

            return result;
        default:
            return next(action);
    };
};
export default middleware;
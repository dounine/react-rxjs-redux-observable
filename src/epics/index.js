import {Observable} from 'rxjs/Rx';
import '../rx/extends';
import Apis from '../api/index';
import actionTypes from '../actions/types';
import actions from '../actions';

const userQueryEpic = action$ =>
        action$.ofType(actionTypes.USER_QUERY_REQUEST)
            .mergeMap(action =>
                Observable.fromPromise(Apis.queryUserByUsername(action.username))
                    .map(response => actions.userQuerySuccess(response.data))
                    .catch(error => Observable.of(actions.userQueryFailed(error)))
            );

export default [
    userQueryEpic,
];

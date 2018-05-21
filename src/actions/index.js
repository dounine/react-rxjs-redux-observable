import actionTypes from './types';

export default {
    userQueryRequest:(username)=>({type:actionTypes.USER_QUERY_REQUEST,username}),
    userQuerySuccess:(data)=>({type:actionTypes.USER_QUERY_SUCCESS,payload:data}),
    userQueryFailed:(error)=>({type:actionTypes.USER_QUERY_FAILED,error}),
    changeSearch:(username)=>({type:actionTypes.USER_CHANGE_INPUT,username}),
};

import axios from 'axios';
import {connect} from "react-redux";

export default {
    queryUserByUsername: (username) => axios({
        method: 'GET',
        timeout:Math.random(1000),
        url: `https://api.github.com/search/users?q=${username}`,
    })
};
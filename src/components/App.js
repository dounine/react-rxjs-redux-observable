import React from 'react'
import {connect} from "react-redux";
import actions from "../actions";
import UserList from './UserList';

class User extends React.Component {
    render() {
        const { username,error,changeUsername,userQueryByUserName,userQueryStop } = this.props;
        return (
            <div>
                <input id="username" onChange={(el)=>changeUsername(el.target.value)} value={username} />
                <button onClick={()=>userQueryByUserName(document.querySelector('#username').value)}>Search</button>
                <span style={{marginLeft:10,color:'red'}}>{JSON.stringify(error)}</span>
                <UserList />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        username:state.search_username
    }
}

function mapDispatchToProps(dispatch) {
    return {
        userQueryByUserName: (username) => dispatch(actions.userQueryRequest(username)),
        changeUsername:(username)=> dispatch(actions.changeSearch(username)),
    }
}


const App = connect(
    mapStateToProps,
    mapDispatchToProps
)(User);
export default App;
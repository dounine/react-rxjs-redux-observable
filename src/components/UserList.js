import React from "react";
import {connect} from "react-redux";

class UserList extends React.Component {
    render() {
        const { items} = this.props;
        return (
            <div>
                {
                    items.map((data,index)=>{
                        return (
                            <div key={index} style={{width:'100%',float:'left',lineHeight:'40px',margin:6}}>
                                {/*{JSON.stringify(data)}*/}
                                <li style={{float:'left',listStyle:'none'}}>{data.id}</li>
                                <img style={{float:'left',width:40,height:40,marginLeft:20,marginRight:20,borderRadius:20}} src={data.avatar_url} />
                                <a href={data.html_url} target="_blank"><li style={{float:'left',listStyle:'none'}}>{data.html_url}</li></a>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        ...state.github
    }
}

const UserListConnect = connect(
    mapStateToProps,
)(UserList);
export default UserListConnect;
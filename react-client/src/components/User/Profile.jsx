import React from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import $ from 'jquery';

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user:[]
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData(){
    var that = this;
    $.ajax({
      url: `/api/user`,
      method: 'GET',
    })
    .done (function (data) {
      that.setState({
        user:data.user
      })
    })
    .fail(function( jqXHR, textStatus ) {
      alert(`Error in retrive, ${textStatus}`);
    })
  }

  render(){
    if (this.state.user.length === 0) {
      return (<h3> Please Login </h3>)
    }
    return(
      <div className="container-fluid">
        {this.state.user.fullName}
      </div>
    )
  }
}
export default Profile;

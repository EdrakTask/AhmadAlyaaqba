import React from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import $ from 'jquery';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      message: '',
      error: false
    }
    this.onChange = this.onChange.bind(this);
    this.login = this.login.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  login(){
    var that = this;
    $.ajax({
      url: `/api/user/login`,
      method: 'POST',
      data:this.state
    })
    .done (function (data) {
      if (data.success === false) {
        that.setState({
          error: true,
          message: data.message
        })
      } else {
        window.location.href = "/";
      }
    })
    .fail(function( jqXHR, textStatus ) {
      alert(`Error in login, ${textStatus}`);
    })
  }

  render(){
    return(
      <div className="container-fluid">
        <div className="jumbotron">
          <h2 className="display-4">Login</h2>
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input type="text" className="form-control" id="userName" placeholder="Enter Username" name="userName" value={this.userName} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={this.password} onChange={this.onChange}/>
          </div>
          <button className="btn btn-primary" onClick={this.login}>Submit</button>
          <p>Dont have Account ?<Link to = {`/user/signup`}> Create new account </Link></p>
        </div> 
      </div>
    )
  }
}
export default Login;

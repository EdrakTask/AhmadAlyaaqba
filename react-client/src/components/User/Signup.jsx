import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import $ from 'jquery';

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: '',
      password: '',
      fullName:'',
      gender:'Male',
      message: '',
      error: false
    }
    this.onChange = this.onChange.bind(this);
    this.Signup = this.Signup.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
    console.log(this.state)
  }

  Signup(){
    var that = this;
    $.ajax({
      url: `/api/user/create`,
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
        window.location.href = "/user/login";
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
          <h2 className="display-4">Sign up</h2>
          {this.state.error && (
            <div className="alert alert-danger" role="alert">
              {this.state.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="userName">Username</label>
            <input type="text" className="form-control" id="userName" placeholder="Enter Username" name="userName" value={this.state.userName} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Enter Password" name="password" value={this.state.password} onChange={this.onChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="fullName">Fullname</label>
            <input type="text" className="form-control" id="fullName" placeholder="Enter fullName" name="fullName" value={this.state.fullName} onChange={this.onChange}/>
          </div>
          <div class="form-group">
            <label htmlFor="Gender">Gender</label>
            <select class="form-control" id="Gender" name="gender" value={this.state.gender} onChange={this.onChange}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <button className="btn btn-primary" onClick={this.Signup}>Submit</button>
          <p>Dont have Account ?<Link to = {`/user/create`}> Create new account </Link></p>
        </div> 
      </div>
    )
  }
}
export default Signup;

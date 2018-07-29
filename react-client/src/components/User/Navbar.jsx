import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import $ from 'jquery';

class Navbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false,
      anchorEl: null,
      user: [],
    }; 
    this.onChange = this.onChange.bind(this);
    // this.getUserData = this.getUserData.bind(this);
  }

  onChange(e){
    this.setState({
      [e.target.name]:e.target.value
    });
  }

  componentWillMount() {
    var that = this
    $.ajax({
      url:'/api/user/isLogin',
      type:'GET',
      success:function(data){
        that.setState({
          auth: data
        })
      },
      error:function(err){
        console.log(err);
      }
    });
  }

  // getUserData() {
  //   var that = this
  //   $.ajax({
  //     url:'/api/userController/getLogin',
  //     type:'GET',
  //     success:function(data){
  //       that.setState({
  //         user: data
  //       })
  //     },
  //     error:function(err){
  //       console.log(err);
  //     }
  //   });
  // }

  render() {
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor": "#7193b8"}}>
          <a className="navbar-brand" href="#">Edrak-Course</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav mr-auto">
              <li className="nav-item">
                <Link className="btn btn-outline-light" to = {`/user/AllCourses`} >
                  All Courses
                </Link>
              </li>
            </ul>
            {!auth && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="btn btn-outline-light" to = {`/user/login`} >
                    Login
                  </Link>
                </li>
              </ul>
            )}
            {auth && (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown">
                  <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                    Menu
                  </a>
                  <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                    <Link className="dropdown-item" to = {`/user/profile`} >
                      Profile
                    </Link>
                    <Link className="dropdown-item" to = {`/user/login`} >
                      Add course
                    </Link>
                    <div className="dropdown-divider"></div>
                    <a className="dropdown-item" href="/api/user/logout">Logout</a>
                  </div>
                </li>
              </ul>
            )}
          </div>
        </nav>
      </div>
    );
  }
}

export default Navbar;
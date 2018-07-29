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
    console.log(auth)
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light" style={{"backgroundColor": "#7193b8"}}>
          <a className="navbar-brand" href="#">Edrak-Course</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            
              {!auth && (
                <ul className="navbar-nav">
                  <li className="nav-item">
                    <Link className="nav-link" to = {`/user/login`} >
                      Login
                    </Link>
                  </li>
                </ul>
              )}
              {auth && (
                <ul className="navbar-nav">
                  <li className="nav-item dropdown">
                    <a className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                      Menu
                    </a>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                      <Link className="dropdown-item" to = {`/user/login`} >
                        Profile
                      </Link>
                      <Link className="dropdown-item" to = {`/user/login`} >
                        Add course
                      </Link>
                      <div className="dropdown-divider"></div>
                      <Link className="dropdown-item" to = {`/user/login`} >
                      Logout
                      </Link>
                    </div>
                  </li>
                  <li className="nav-item">
                    <Link className="nav-link" to = {`/user/login`} >
                      Logout
                    </Link>
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
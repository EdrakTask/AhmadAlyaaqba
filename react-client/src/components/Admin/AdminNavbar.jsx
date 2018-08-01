import React from 'react';
import {NavLink, Link} from 'react-router-dom';
import $ from 'jquery';

class AdminNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      auth: false
    }; 
  }

  componentWillMount() {
    var that = this
    $.ajax({
      url:'/api/user/isAdmin',
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

  render() {
    const { auth } = this.state;
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark" style={{"backgroundColor": "#7193b8"}}>
          <a className="navbar-brand" href="#">Edrak-Course</a>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
            {!auth && (
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link className="btn btn-outline-light" to = {`/user/login`} >
                      Login
                    </Link>
                  </li>
                </ul>
              </div>
            )}
            {auth && (
              <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <a className="btn btn-outline-light" href="/api/user/logout">Logout</a>
                  </li>
                </ul>
              </div>
            )}
        </nav>
      </div>
    );
  }
}

export default AdminNavbar;
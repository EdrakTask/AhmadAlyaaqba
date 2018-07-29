import React from 'react';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import { browserHistory, Route, BrowserRouter as Router, Link } from 'react-router-dom';

class Main extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <Navbar/>
      <br/>
        <Route exact path="/" component={Home} />
        <Route path="/user/Login" component={Login} />
        <Route path="/user/Signup" component={Signup} />
        <Route path="/user/Profile" component={Profile} />
      </div>
    )
  }
}
export default Main;
import React from 'react';
import Navbar from './Navbar.jsx';
import Home from './Home.jsx';
import Login from './Login.jsx';
import Signup from './Signup.jsx';
import Profile from './Profile.jsx';
import ShowAllCourses from './ShowAllCourses.jsx';
import NewCourse from './AddNewCourse.jsx';
import EditCourse from './EditCourse.jsx';
import CourseDetails from './CourseDetails.jsx';
import DisplayByCategory from './DisplayByCategory.jsx';
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
        <Route path="/user/AllCourses" component={ShowAllCourses} />
        <Route path="/user/AddNewCourse" component={NewCourse} />
        <Route path="/user/EditCourse/:id" component={EditCourse} />
        <Route path="/user/course/:id" component={CourseDetails} />
        <Route path="/user/DisplayByCategory" component={DisplayByCategory} />
      </div>
    )
  }
}
export default Main;
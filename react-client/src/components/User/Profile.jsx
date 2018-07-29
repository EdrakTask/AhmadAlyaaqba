import React from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import DisplayCourseProfile from './DisplayCourseProfile.jsx';

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
    const user = this.state.user
    if (this.state.user.length === 0) {
      return (<h3> Please Login </h3>)
    }
    let arr = [];
    {user.Courses.forEach(function(course, i) {
      arr.push(<DisplayCourseProfile id={course} key={i}/>)
    })}
    return(
      <div className="container-fluid">
        <div className="card w-100">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                <img src={user.personalImgUrl} className="img-thumbnail" style={{height: "250px"}} />
              </div>
              <div className="col-9">
                <h3 className="card-title">Welcome {user.fullName}</h3>
                <p className="card-text">You can find in your profile all courses added by you, you can edit or delete them.</p>
              </div>
            </div>
          </div>
        </div>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Course Name</th>
              <th scope="col">Course Category</th>
              <th scope="col">Course created at</th>
              <th scope="col">Course start at</th>
              <th scope="col">Course Details</th>
              <th scope="col">Course edit</th>
              <th scope="col">Course Delete</th>
            </tr>
          </thead>
          <tbody>
            {arr}
          </tbody>
        </table>
      </div>
    )
  }
}
export default Profile;

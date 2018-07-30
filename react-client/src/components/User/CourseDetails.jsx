import React from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import DisplayCourseProfile from './DisplayCourseProfile.jsx';

class CourseDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course:{}
    }
    this.getData = this.getData.bind(this);
  }

  componentWillMount() {
    this.getData();
  }

  getData(){
    let id = this.props.match.params.id;
    var that = this;
    $.ajax({
      url: `/api/course/${id}`,
      method: 'GET',
    })
    .done (function (data) {
      that.setState({
        course:data[0]
      })
      console.log(data)
    })
    .fail(function( jqXHR, textStatus ) {
      alert(`Error in retrive, ${textStatus}`);
    })
  }

  render(){
    const user = this.state.user
    if (this.state.course.courseName === undefined) {
      return (<h3> Course not found </h3>)
    }
    return(
      <div className="container-fluid">
        <div className="card w-100">
          <div className="card-body">
            <div className="row">
              <div className="col-3">
                img here if needed
              </div>
              <div className="col-9">
                <h3 className="card-title">course title</h3>
                <p className="card-text">bla bla bla bla</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default CourseDetails;

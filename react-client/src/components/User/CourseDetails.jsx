import React from 'react';
import {NavLink, Link, Redirect} from 'react-router-dom';
import $ from 'jquery';
import DisplayCourseProfile from './DisplayCourseProfile.jsx';
import ReactPlayer from 'react-player';
import moment from 'moment';

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
    let dateOfCreation = moment(this.state.course.dateOfCreation).calendar()
    return(
      <div className="container-fluid">
        <div className="card w-100">
          <div className="card-body">
              <h3 className="card-titlee text-center">{this.state.course.courseName}</h3>
              <p className="card-text">Description: {this.state.course.description}</p>
              <div style={{margin:'auto'}}>
                <ReactPlayer url={this.state.course.videoURL} playing controls='true' />
              </div>
          </div>
          <div className="card-footer">
          <div className="row">
            <div className="col-3">
              Created at : {dateOfCreation}
            </div>
            <div className="col-3">
              Category: {this.state.course.category.categoryName}
            </div>
            <div className="col-3">
              Posted by : {this.state.course.userId.fullName}
            </div>
          </div>
          </div>
        </div>
      </div>
    )
  }
}
export default CourseDetails;

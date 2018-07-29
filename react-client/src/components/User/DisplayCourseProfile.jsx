import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';

class DisplayCourseProfile extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      course : []
    }
  }

  componentWillMount() {
    var that = this;
    let id = this.props.id;
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
    const course = this.state.course;
    let id = this.props.id;
    if (this.state.course.courseName === undefined) {
      return (
        <tr>
          <th scope="row">loading</th>
          <th scope="row">loading</th>
          <th scope="row">loading</th>
          <th scope="row">loading</th>
          <th scope="row">loading</th>
          <th scope="row">loading</th>
          <th scope="row">loading</th>
        </tr>
      )
    }
    return(
      <tr>
        <th scope="row">{course.courseName}</th>
        <th scope="row">{course.category.categoryName}</th>
        <th scope="row">{moment(course.dateOfCreation).calendar()}</th>
        <th scope="row">{moment(course.dateOfStart).calendar()}</th>
        <th scope="row"><button type="button" className="btn btn-outline-primary">Details</button></th>
        <th scope="row"><button type="button" className="btn btn-outline-warning">Edit</button></th>
        <th scope="row"><button type="button" className="btn btn-outline-danger">Delete</button></th>
      </tr>
    )
  }
}

export default DisplayCourseProfile;
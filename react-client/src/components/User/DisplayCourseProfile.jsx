import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import { Redirect } from 'react-router';

class DisplayCourseProfile extends React.Component{
  constructor(props){
    super(props);
    this.state={
      edit:false,
      details:false
    }
    this.delete = this.delete.bind(this);
    this.edit = this.edit.bind(this);
    this.details = this.details.bind(this);
  }

  delete(){
    var id=this.props.course._id;
    var that = this;
    $.ajax({
      url:`/api/course`,
      method:'DELETE',
      data:{id:id},
    })
    .done(function(){
      alert('Deleted successfully');
      that.props.refresh();
    })
    .fail(function(){
      console.log('something wrong');
    })
  }

  edit(){
    this.setState({
      edit:true
    })
  }

  details(){
    this.setState({
      details:true
    })
  }

  render(){
    const course = this.props.course;
    if (this.state.edit) {
      return <Redirect to={ "/user/EditCourse/" + course._id }/>;
    }
    if (this.state.details) {
      return <Redirect to={ "/user/course/" + course._id }/>;
    }
    return(
      <tr>
        <th scope="row">{course.courseName}</th>
        <th scope="row">{course.category.categoryName}</th>
        <th scope="row">{moment(course.dateOfCreation).calendar()}</th>
        <th scope="row">{moment(course.dateOfStart).calendar()}</th>
        <th scope="row"><button type="button" className="btn btn-outline-primary" onClick={this.details}>Details</button></th>
        <th scope="row"><button type="button" className="btn btn-outline-warning" onClick={this.edit}>Edit</button></th>
        <th scope="row"><button type="button" className="btn btn-outline-danger" onClick={this.delete}>Delete</button></th>
      </tr>
    )
  }
}

export default DisplayCourseProfile;
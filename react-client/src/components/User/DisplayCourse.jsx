import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import { Link } from 'react-router-dom';

class DisplayCourse extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const course = this.props.course;
    console.log(course)
    let catColor = course.category.color;
    let dateOfStart = moment(course.dateOfStart).calendar();
    return(
      <div className="card mb-4" style={{borderColor:catColor}} key={this.props.keyC}>
        <div className="card-header">
          <h5><Link className="card-title" style={{color:catColor}} to = {`/user/course/${course._id}`}> {course.courseName} </Link></h5>
          <small>Posted by: {course.userId.fullName} </small>            
        </div>
        <div className="card-body " style={{color:'black'}}>
          <p className="card-text">{course.description}</p>
        </div>
        <div className="card-footer text-muted">
          <span className="text" style={{color:catColor}}>Category:{course.category.categoryName}</span> | <span className="text-right">start at: {dateOfStart}</span>
        </div>
      </div>
    )
  }
}

export default DisplayCourse;
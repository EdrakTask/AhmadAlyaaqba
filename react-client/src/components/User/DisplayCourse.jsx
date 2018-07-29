import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';

class DisplayCourse extends React.Component{
  constructor(props){
    super(props);
  }

  render(){
    const course = this.props.course;
    let catColor = course.category.color;
    let courseName = course.courseName;
    let discription = course.description;
    let dateOfStart = moment(course.dateOfStart).calendar();
    let catName = course.category.categoryName;
    return(
      <div className='col-3' key={this.props.keyC}>
        <div className="card mb-3" style={{borderColor:catColor,margin:'10px'}}>
          <div className="card-header">
            <h5 className="card-title" style={{color:catColor}}>{courseName}</h5>            
          </div>
          <div className="card-body " style={{color:'black'}}>
            <p className="card-text">{discription}</p>
          </div>
          <div className="card-footer text-muted">
            <span className="text" style={{color:catColor}}>Category:{catName}</span> | <span className="text-right">start at: {dateOfStart}</span>
          </div>
        </div>
      </div>
    )
  }
}

export default DisplayCourse;
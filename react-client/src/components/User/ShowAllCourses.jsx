import React from 'react';
import ReactDOM from 'react-dom';
import {Card} from 'react-router-dom';
import $ from 'jquery';
import moment from 'moment';
import DisplayCourse from './DisplayCourse.jsx';

class ShowAllCourses extends React.Component{
  constructor(props){
    super(props);
    this.state={
      courses:[]
    }
  }

  componentWillMount(){
    //get the courses data 
    var that=this;
    $.ajax({
      url:'/api/course',
      method:'get',
      success:function(data){
        that.setState({
          courses:data
        })
      }
    })
  }

  render(){
    //define courses variable to be used in map function to show the courses  
    const courses=this.state.courses;
    let arr = [];
    courses.forEach(function(course,i) {
      arr.push(<DisplayCourse course={course} key= {i} />)
    })
    return(
      <div>
        <div className='row'>
          {arr}
        </div>
      </div>
    )
  }
}

export default ShowAllCourses;
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
    const courses=this.state.courses;
    let arr = [];
    courses.forEach(function(course,i) {
      if (i % 2 === 0 && i%4 !== 0) {
        arr.push(<div class="w-100 d-none d-sm-block d-md-none"></div>)
      } else if (i % 3 === 0) {
        arr.push(<div class="w-100 d-none d-md-block d-lg-none"></div>)
      } else if ( i % 4 === 0 ) {
        arr.push(<div class="w-100 d-none d-lg-block d-xl-none"></div>)
      } else if (i % 5 === 0) {
        arr.push(<div class="w-100 d-none d-xl-block"></div>)
      }
      arr.push(<DisplayCourse course={course} key= {i} />)
    })
    return(
      <div>
        <div className='card-deck' style={{margin:'10px'}}>
          {arr}
        </div>
      </div>
    )
  }
}

export default ShowAllCourses;
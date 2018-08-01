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
      courses:[],
      sort:'courseName'
    }
    this.handleChange = this.handleChange.bind(this);
    this.getData=this.getData.bind(this);
  }

  componentWillMount(){
    //get the courses data 
    this.getData();
  }

  getData() {
    var that=this;
    var obj = {
      sort: this.state.sort
    }
    $.ajax({
      url:'/api/course/retrive',
      method:'POST',
      data: obj,
      success:function(data){
        console.log(data)
        that.setState({
          courses:data
        })
      }
    })
  }

  handleChange(t){
    this.setState({
      [t.target.name]: t.target.value 
    })
  }

  render(){  
    const courses=this.state.courses;
    let arr = [];
    courses.forEach(function(course,i) {
      if (i % 2 === 0 && i%4 !== 0) {
        arr.push(<div className="w-100 d-none d-sm-block d-md-none"></div>)
      } else if (i % 3 === 0) {
        arr.push(<div className="w-100 d-none d-md-block d-lg-none"></div>)
      } else if ( i % 4 === 0 ) {
        arr.push(<div className="w-100 d-none d-lg-block d-xl-none"></div>)
      } else if (i % 5 === 0) {
        arr.push(<div className="w-100 d-none d-xl-block"></div>)
      }
      arr.push(<DisplayCourse course={course} key= {i} />)
    })
    return(
      <div>
        <div className="row">
          <div className="col-1"></div>
          <div className="col-9">
            <select className="form-control" name='sort' onChange={this.handleChange}>
              <option value = 'courseName'>Course Name</option>
              <option value = 'dateOfCreation'>Date of Create</option>
              <option value = 'dateOfStart'>Date of Start</option>
            </select>
          </div>
          <div className="col-2">
            <button className="btn btn-primary" onClick={this.getData}>Show</button>
          </div>
        </div>
        <div className='card-deck' style={{margin:'10px'}}>
          {arr}
        </div>
      </div>
    )
  }
}

export default ShowAllCourses;
import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';
import DisplayCourse from './DisplayCourse.jsx';

class DisplayByCategory extends React.Component{
  constructor(){
    super();
    this.state={
      categorys:[],
      arr: [],
      category: 'All',
      courses: []
    }
    this.handleChange=this.handleChange.bind(this);
    this.getCourses = this.getCourses.bind(this);
  }
  

  componentDidMount(){
    let that = this;
    $.ajax({
      url: '/api/category',
      method:'GET',
      success:function(data){
        that.setState({
          categorys:data,
        })
      },    
    });
  }


  handleChange(t){
    this.setState({
      [t.target.name]: t.target.value 
    })
  }

  getCourses() {
    let that = this;
    let obj = {
      category: this.state.category
    }
    console.log(obj)
    $.ajax({
      url: `/api/course/filterByCategory`,
      method: 'POST',
      data:obj
    })
    .done (function (data) {
      that.setState({
          courses:data,
        })
    })
    .fail(function( jqXHR, textStatus ) {
      alert(`Error in loading courses, ${textStatus}`);
    })
  }

  render(){
    let cat = this.state.categorys;
    let courses = this.state.courses;
    let CoursesArr = [];
    if (courses.length === 0) {
     CoursesArr.push(<div> <h2> Please Select Category </h2> </div>)
    } else {
      courses.forEach(function (course, i) {
        if (i % 2 === 0 && i%4 !== 0) {
        CoursesArr.push(<div class="w-100 d-none d-sm-block d-md-none"></div>)
      } else if (i % 3 === 0) {
        CoursesArr.push(<div class="w-100 d-none d-md-block d-lg-none"></div>)
      } else if ( i % 4 === 0 ) {
        CoursesArr.push(<div class="w-100 d-none d-lg-block d-xl-none"></div>)
      } else if (i % 5 === 0) {
        CoursesArr.push(<div class="w-100 d-none d-xl-block"></div>)
      }
        CoursesArr.push(<DisplayCourse course={course} key= {i} />)
      })
    }
    return(
      <div className="container-fluid">
        <div className="jumbotron">
          <div>
            <h3> Select Category </h3>
          </div>
          <div className="row">
            <div className="col-10">
              <div className="form-group">
                <select className="form-control" id="sel1" name='category' onChange={this.handleChange}>
                <option value = 'All'>All Category</option>
                  {cat.map(function(cate,i){
                    return(
                      <option value={cate._id} key={i}>{cate.categoryName}</option>
                    )})
                  }
                </select>
              </div>
            </div>
            <div className="col-2">
              <button className="btn btn-primary" onClick={this.getCourses}>Show</button>
            </div>
          </div>
        </div>
        <div className='card-deck' style={{margin:'10px'}}>
          {CoursesArr}
        </div>
      </div>
    )
  }

}

module.exports = DisplayByCategory;
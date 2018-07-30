import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom';

class NewCourse extends React.Component{
  constructor(){
    super();
    this.state={
      categorys:[],
      dateOfStart:'',
      desc:'',
      cName:'',
      userId:'',
      category:'',
      alert: false,
      message: ''
    }
    this.handleChange=this.handleChange.bind(this);
    this.send=this.send.bind(this);    
  }
  

  componentDidMount(){
    //get the category names for droplist
    var that = this;
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
  
  send(){
    var courseData={
      courseName:this.state.cName,
      description:this.state.desc,
      dateOfStart:this.state.dateOfStart,
      category:this.state.category
    }
    let that = this;
   //send the data
    $.ajax({
      url:'/api/course',
      method:'post',
      data:courseData,
      success:function(){
        that.setState({
          alert:true,
          message: 'Course created successfully'
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
    var cat = this.state.categorys;
    return(
      <div className="container-fluid">
        <div className="jumbotron">
          {this.state.alert && (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="courseName">course name</label>
            <input type="text" className="form-control" id="cName" placeholder="Enter Course Name" 
            name="cName" value={this.state.cName} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="desc">description</label>
            <input type="text" className="form-control" id="desc" placeholder="Enter course discription" 
            name="desc" value={this.state.desc} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="desc">date of start:</label>
            <input name="dateOfStart" type="datetime-local" value={this.state.dateOfStart} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Select list:</label>
            <select className="form-control" id="sel1" name='category' onChange={this.handleChange}>
              <option>select category</option>
              {cat.map(function(cate,i){
                return(
                  <option value={cate._id} key={i}>{cate.categoryName}</option>
                )})
              }
            </select>
          </div>
          <button className="btn btn-primary" onClick={this.send}>Submit</button>
        </div> 
      </div>
    )
  }

}

module.exports = NewCourse;
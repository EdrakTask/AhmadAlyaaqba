import React from 'react';
import $ from 'jquery';

class NewCourse extends React.Component{
  constructor(){
    super();
    this.state={
      categorys:[],
      dateOfStart:'',
      desc:'',
      cName:'',
      videoURL:'',
      category:'',
      alert: false,
      message: '',
      alertYoutube: false,
      messageUpload:'',
      location: '',
    }
    this.handleChange=this.handleChange.bind(this);
    this.send=this.send.bind(this);    
    this.uploadYoutube = this.uploadYoutube.bind(this);
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
    if (this.state.cName === '' || this.state.desc === '' || this.state.category === '') {
      this.setState({
        alert: true,
        message: 'Please enter all fileds'
      })
    } else if (this.state.videoURL === '') {
      this.setState({
        alert: true,
        message: 'please upload video or insert youtube link'
      })
    } else {
      var courseData={
        courseName:this.state.cName,
        description:this.state.desc,
        dateOfStart:this.state.dateOfStart,
        category:this.state.category,
        videoURL: this.state.videoURL
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
            message: 'Course created successfully',
            dateOfStart:'',
            desc:'',
            cName:'',
            videoURL:'',
            category:'',
            videoURL:''
          })
        }
      })
    }
  }

  uploadYoutube(){
    if (this.state.location === '') {
      this.setState({
        alertYoutube: true,
        messageUpload:'Please insert video location',
      })
    } else {
      this.setState({
        alertYoutube: true,
        messageUpload:'Start Uploading, please wait',
      })
      let that = this;
      let data = {
        cName: this.state.cName,
        desc: this.state.desc,
        location: this.state.location
      }
     //send the data
      $.ajax({
        url: `/api/youtube`,
        method: 'POST',
        data: data
      })
      .done (function (data) {
        that.setState({
          messageUpload: 'Uploaded successfully',
          videoURL: "http://youtu.be/"+data.id
        });
      })
      .fail(function( jqXHR, textStatus ) {
        alert("somthing went wrong");
      });
    }
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
          
          <div className="form-group">
            <label htmlFor="courseName">Course name</label>
            <input type="text" className="form-control" id="cName" placeholder="Enter Course Name" 
            name="cName" value={this.state.cName} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="desc">Description</label>
            <input type="text" className="form-control" id="desc" placeholder="Enter course discription" 
            name="desc"  value={this.state.desc} onChange={this.handleChange} />
          </div>
          <div>
            <label htmlFor="date">Date of start:</label>
            <input name="dateOfStart" type="datetime-local" value={this.state.dateOfStart} onChange={this.handleChange} />
          </div>
          <div className="form-group">
            <label htmlFor="sel1">Select Category:</label>
            <select className="form-control" id="sel1" name='category' onChange={this.handleChange}>
              <option>select category</option>
              {cat.map(function(cate,i){
                return(
                  <option value={cate._id} key={i}>{cate.categoryName}</option>
                )})
              }
            </select>
          </div>
          <div className="alert alert-info" role="alert">
            if you already have courses uploaded to youtube, please enter its link 
          </div>
          <div className="form-group">
            <label htmlFor="upload">Youtube course Link:</label>
            <input className="form-control" type='text' accept="video/*" name="videoURL" onChange={this.handleChange} />
          </div>
          <div className="alert alert-info" role="alert">
            If you dont have your course in youtube yet, you can upload it by past the location where its in your computer 
          </div>
          <div className="form-group">
            <label htmlFor="upload">Course file location:</label>
            <div className="row">
              <div className="col-10">
                <input className="form-control" type='text' accept="video/*" name="location" onChange={this.handleChange} />
              </div>
              <div className="col-2">
                <button className="btn btn-info" onClick={this.uploadYoutube}>Upload</button>
              </div>
            </div>
            < br/>
            {this.state.alertYoutube && (
              <div className="alert alert-warning" role="alert">
                {this.state.messageUpload}
              </div>
            )}
          </div>
          <button className="btn btn-primary" onClick={this.send}>Submit</button>
          <br />
          {this.state.alert && (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          )}
        </div> 
      </div>
    )
  }
}

module.exports = NewCourse;
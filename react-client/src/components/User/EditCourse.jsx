import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import { Link } from 'react-router-dom'; 
import { Redirect } from 'react-router';

class EditCourse extends React.Component{
  constructor(){
    super();
    this.state={
      id:'',
      courseName:'',
      description:'',
      dateOfStart:'',
      alert:false,
      message:''
    }
    this.handleChange=this.handleChange.bind(this);
    this.edit=this.edit.bind(this);
    this.getData=this.getData.bind(this);
  }

  handleChange(t){
    this.setState({
      [t.target.name]:t.target.value
    })
  }

  edit(){
    var obj={
      id: this.state.id,
      courseName: this.state.courseName,
      description: this.state.description,
      dateOfStart: this.state.dateOfStart
    };
    var that = this;
    $.ajax({
      url: `/api/course/`,
      method: 'PUT',
      data:obj
    })
    .done (function (data) {
      that.setState({
        alert:true,
        message:'Course has been edited successfully'
      })
    })
    .fail(function(err) {
      alert('something went wrong');
    })
  }

  componentDidMount(){
    this.getData()
  }

  getData(){
    let id = this.props.match.params.id;
    this.setState({
      id:id
    })
    var that = this;
    $.ajax({
      url: `/api/course/`+id,
      method: 'GET',
    })
    .done (function (data) {
      var courseName = data[0].courseName;
      var description = data[0].description;
      var dateOfStart = data[0].dateOfStart.slice(0,22);
      that.setState({
        courseName:courseName,
        description:description,
        dateOfStart:dateOfStart
      })
    })
    .fail(function() {
      alert('something wrong happen');
    })
  }

  render(){
    let id = this.props.match.params.id
    return(
        <div className="container-fluid">
        <h1>edit course</h1>
        <div className="jumbotron">
          {this.state.alert && (
            <div className="alert alert-success" role="alert">
              {this.state.message}
            </div>
          )}
          <div className="form-group">
            <label htmlFor="userName">Course Name</label>
            <input type="text" className="form-control" id="courseName" name="courseName" value={this.state.courseName} onChange={this.handleChange}/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Course Discription</label>
            <input type="text" className="form-control" id="desc" name="description" value={this.state.description} onChange={this.handleChange}/>
          </div>
          <div>
            <label htmlFor="userName">Date Of Start</label>
            <input name="dateOfStart" type="datetime-local" value={this.state.dateOfStart} onChange={this.handleChange}/>
          </div>
          <div className='row'>
            <div className='col-md-3'></div>
            <div className='col-md-3' align='center'>
              <button className="btn btn-primary" onClick={this.edit}>EDIT</button>
            </div>
            <div className='col-md-3' align='center'>          
              <button className="btn btn-primary" onClick={this.getData}>RESET</button>
            </div>
            <div className='col-md-3'></div>
          </div>
        </div> 
      </div>
    )
  }
}

export default EditCourse; 
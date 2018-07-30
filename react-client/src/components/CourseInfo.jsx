import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';

class CourseInfo extends React.Component{
  constructor(props){
    super(props);
    this.state={
        course:[]
    }
  }

  componentDidMount(){
    var that=this;  
    var id=this.props.id;  
    // var id='5b5d9ced1459bb03ae417020';
    $.ajax({
      url:`/api/course/`+id,
      method:'get',
      success:function(data){
        that.setState({
          course:data
        })
      }
    })    
  }

  render(){
    return(
      <h1>CourseInfo</h1>
      
    )
  }
}

export default CourseInfo;
import React from 'react';
import $ from 'jquery';

class AddCategory extends React.Component{
  constructor(){
    super();
    this.state={
      categoryName:'',
      color:'',
      isAdmin: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
  }

  handleChange(e){
    this.setState({
      [e.target.name]:e.target.value
    })    
  }

  componentDidMount() {
    var that = this
    $.ajax({
      url:'/api/user/isadmin',
      type:'GET',
      success:function(data){
        that.setState({
          isAdmin: data
        })
      },
      error:function(err){
        console.log(err);
      }
    });
  }

  add(){
    var that = this;
    $.ajax({
      url: `/api/category`,
      method: 'POST',
      data:this.state
    })
    .done (function (data) {
      alert('Category Added')
    })
    .fail(function( jqXHR, textStatus ) {
      alert(`Error, ${textStatus}`);
    })
    
  }
    
  render(){
    if (!this.state.isAdmin) {
      return (
        <div>
          <h1> This page only available for admin </h1>
          <h2> please login from admin account</h2>
        </div>
      )
    }
    return(
      <div>
        <div className="container-fluid">
        <div className="jumbotron">
          <div className="form-group">
            <label htmlFor="userName">Category Name</label>
            <input type="text" className="form-control" id="categoryName" 
            name="categoryName" value={this.state.categoryName} 
            placeholder='Category Name' onChange={this.handleChange}/>
          </div>
          <div className="form-group">
          <label htmlFor="color">Category Color</label>
       
          <input type='color' name='color' id='color' 
          value={this.state.color} 
          onChange={this.handleChange}/>
          </div>
          <div>
          <button className="btn btn-primary" onClick={this.add}>Submit</button>
          </div>
        </div> 
      </div>

      </div>
    )
  }

}

export default AddCategory;
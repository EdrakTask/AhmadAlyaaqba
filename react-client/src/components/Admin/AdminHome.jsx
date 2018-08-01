import React from 'react';
import $ from 'jquery';

class AdminHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAdmin: false,
      admin: []
    }
  }

  componentWillMount() {
    var that = this
    $.ajax({
      url:'/api/user/isAdmin',
      type:'GET',
      success:function(data){
        that.setState({
          auth: data
        })
      },
      error:function(err){
        console.log(err);
      }
    });
  }

  render(){
    if (!this.state.isAdmin) {
      return (
        <div>
          <h1> This page only available for admin </h1>
        </div>
      )
    }
    return (
      <div>
        <h1> Admin Main page (not completed)</h1> 
      </div>
    )
  }
}
export default AdminHome;

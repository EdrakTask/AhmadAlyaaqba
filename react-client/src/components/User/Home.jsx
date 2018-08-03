import React from 'react';
import DisplayCourse from './DisplayCourse.jsx';
import $ from 'jquery';

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courses:[]
    }
  }

  componentWillMount(){
    //get the courses data 
    this.getData();
  }

  getData() {
    var that=this;
    $.ajax({
      url:'/api/course/newest',
      method:'GET',
      success:function(data){
        that.setState({
          courses: data
        })
      }
    })
  }

  render(){
    let arrOfCourses = []
    const courses=this.state.courses;
    courses.forEach(function(course,i) {
      if (i % 2 === 0 && i%4 !== 0) {
        arrOfCourses.push(<div className="w-100 d-none d-sm-block d-md-none"></div>)
      } else if (i % 3 === 0) {
        arrOfCourses.push(<div className="w-100 d-none d-md-block d-lg-none"></div>)
      } else if ( i % 4 === 0 ) {
        arrOfCourses.push(<div className="w-100 d-none d-lg-block d-xl-none"></div>)
      } else if (i % 5 === 0) {
        arrOfCourses.push(<div className="w-100 d-none d-xl-block d-xl-none"></div>)
      }
      arrOfCourses.push(<DisplayCourse course={course} keyc= {i} />)
    })
    return(
      <div className='container'>
        <div className ='row my-4'>
          <div className='col-7'>
            <img src='/img/4.jpg' className="img-fluid img-thumbnail" style={{width: "100%"}} /> 
          </div>
          <div className='col-5'>
            <h2> Welcome to Edrak online courses</h2>
            <p>you can find a lot of material from different category</p>
          </div>
        </div>
        <div className="row">
          <div className="alert alert-dark text-center" role="alert" style={{width: "100%"}}>
            Its 100% and there is no hidding payment, you can use and browse as much as you need
          </div>  
        </div>
        <div className="row">
          <div className="col-lg-8 col-md-8 mx-auto text-center">
              <h2 className="mb-3 text-uppercase font-weight-bold">Our last <span className="orange">Courses</span></h2>
              <hr style={{color:'#8547b5'}}/>
          </div>
          <div className='card-deck'>
            {arrOfCourses}
          </div>
        </div>
      </div>
    )
  }
}
export default Home;
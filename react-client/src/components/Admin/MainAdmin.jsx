import React from 'react';
import AddCategory from './AddCategory.jsx';
import AdminNavbar from './AdminNavbar.jsx';
import { browserHistory, Route, BrowserRouter as Router, Link } from 'react-router-dom';

class Admin extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
      <AdminNavbar />
      <br/>
        <Route exact path="/admin" component={AddCategory} />
      </div>
    )
  }
}
export default Admin;  

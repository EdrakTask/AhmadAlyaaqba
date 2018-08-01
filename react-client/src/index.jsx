import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {browserHistory, Route, BrowserRouter as Router} from 'react-router-dom';
import Main from './components/User/Main.jsx';
import Admin from './components/Admin/MainAdmin.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (

    <Router history={browserHistory}>
      <div>
      <Route exact path="/" component={Main}/>
      <Route exact path="/Admin" component={Admin}/>
      <Route path="/user" render={()=><Main />}/>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

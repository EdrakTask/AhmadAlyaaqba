import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {browserHistory, Route, BrowserRouter as Router} from 'react-router-dom';
import Main from './components/Home.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (
    <Router history={browserHistory}>
      <div className="container-fluid">

      <Route exact path="/" component={Main}/>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

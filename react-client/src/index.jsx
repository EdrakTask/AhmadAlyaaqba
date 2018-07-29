import React from 'react';
import ReactDOM from 'react-dom';
import $ from 'jquery';
import {browserHistory, Route, BrowserRouter as Router} from 'react-router-dom';
import Main from './components/User/Main.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render () {
    return (

    <Router history={browserHistory}>
      <div>
      <Route exact path="/" component={Main}/>
      <Route path="/user" render={()=><Main />}/>
      </div>
    </Router>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('app'));

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './components/Login';
import Home from './components/Home';
import StationDetail from "./components/StationDetail";
import NoMatch from "./components/NoMatch"
import './index.css';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
   <Router history={browserHistory}>
	    <Route path="/" component={Home}/>
	    <Route path="/station/:stationId" component={StationDetail}/>    
	   	<Route path="signup" component={Login}/>
		<Route path="*" component={NoMatch}/>
  </Router>
  , document.getElementById('root')
);

import React from 'react';
import ReactDOM from 'react-dom';
import Login from './PAGES/Login';
import Home from './PAGES/Home';
import StationDetail from "./PAGES/StationDetail";
import NoMatch from "./PAGES/NoMatch"
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

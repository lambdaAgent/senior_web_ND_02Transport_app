import React from 'react';
import ReactDOM from 'react-dom';
import Login from './component_pages/Login.js';
import Home from './component_pages/Home';
import StationDetail from "./component_pages/StationDetail";
import SelectStation from "./component_pages/SelectStation";
import ShowStationSelection from "./component_pages/ShowStationSelection";
import NoMatch from "./component_pages/NoMatch";
import "./bootstrap/css/bootstrap.css";
import './index.css';
import { Router, Route, browserHistory } from 'react-router'

ReactDOM.render(
   <Router history={browserHistory} >
	    <Route path="/" component={Home}/>
   	    <Route path="/selectStation" component={SelectStation}/>
   	    <Route path="/showSelected" component={ShowStationSelection}/>    
	    <Route path="/station/:stationId" component={StationDetail}/>    
	   	<Route path="signup" component={Login}/>
		<Route path="*" component={NoMatch}/>
  </Router>
  , document.getElementById('root')
);

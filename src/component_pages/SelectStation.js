import React from 'react';
import Navbar from "../components_utils/Navbar";
import StationList from "../stations/stations.js";
import StationTable from "../components_utils/StationTable";
import {browserHistory} from "react-router";
import {Cookie, Query, FetchAPI} from "../helper/helper";
import Station from "../stations/stations";

class SelectStation extends React.Component {
    constructor(props) {
        super(props);
        this.state = {height: undefined}
    }
    componentDidMount() {
        this.setState({height: window.screen.innerHeight})
        FetchAPI.fetchStationsInterval(this);     
    }
    componentWillMount() {
        FetchAPI.fetchStationsFromServer();
    }
    backHistory(){
        window.history.back();
    }
    cellClick(id, name){
    	var key = window.location.href.split("?")[1];
    	localStorage.setItem(key, id+","+name);
    	history.back();
    }
    componentWillUnmount() {
        FetchAPI.stopFetching();         
    }
    render() {
    	var height = this.state.height || 0
        return (
        	<div className="container">
        		<Navbar />
        		<button className="btn btn-primary" 
                        style={{marginBottom: 40 }}
                        onClick={ this.backHistory.bind(this) }>{"< Back"}</button>
                <StationTable 
                		stations={StationList.getAll()}
                		onCellClick={ this.cellClick.bind(this) }
                        />
        	</div>
        )
    }
}

export default SelectStation;

import React from 'react';
import Navbar from "../components_utils/Navbar";
import Station from "../stations/stations"
import NavButton from "../components_utils/NavButton";
import Card from "../components_utils/Card";
import {FetchAPI} from "../helper/helper";
import { browserHistory } from "react-router";
import { convertUnixToTime, convertScheduleToUnix, findNextFromUnixSchedule } from "../helper/unixifySchedule.js";
import moment from "moment";

class StationDetail extends React.Component {
	constructor(props) {
        super(props);
		this.state = {width: "", height: "", url: ""};
		this._station = {}
	}
	update(){
		var height = window.innerHeight;
		var width = window.innerWidth;
		this.setState({width, height})
	}
	componentDidMount() {
		window.addEventListener("resize", this.update.bind(this));  
		this.setState({url: window.location.href})
        this.update.call(this);
        FetchAPI.fetchStationsInterval(this);         
	}
	componentWillMount() {
        FetchAPI.fetchStationsFromServer();
    }
    componentWillUnmount() {
        FetchAPI.stopFetching();         
    }
	nextButton(){
 		browserHistory.push('/station/' + this._station.next);
	}
	prevButton(){
		browserHistory.push('/station/' + this._station.prev);
	}
	render(){
		const stationId = this.props.params.stationId;
		this._station = Station.getById(stationId);
		const _station = this._station;
		if(!_station){
			return <EmptyPage height={this.state.height} width={this.state.width} url={this.state.url}/>
		}
		const extras = [
			{name:"Southbound complete schedule", content:_station.Southbound},
			{name:"Northbound complete schedule", content:_station.Northbound},
			{name:"Vendors", content:_station.vendors},
		]

		const Southbound_unix = convertScheduleToUnix(_station.Southbound);
		const findNextSB = findNextFromUnixSchedule(Southbound_unix);
		const Northbound_unix = convertScheduleToUnix(_station.Northbound);
		const findNextNB = findNextFromUnixSchedule(Northbound_unix);
		return(
	    	<div>
	    		<Navbar />

	    	    {/* navigation button to next and prev station*/}
	    		<NavButton  content=">" position="right" 
				    		screenHeight={this.state.height} screenWidth={this.state.width} 
				    		url={this.state.url}
				    		onClick={this.nextButton.bind(this) }/>
		    	<NavButton  content="<" position="left" 				    		
		    	            screenHeight={this.state.height} screenWidth={this.state.width} 
   				    		url={this.state.url}
						    onClick={this.prevButton.bind(this) }/>	    
	    		
	    		{/*mobile view only*/}
		    	<div className="container">
		    		<Card 
		    			title={_station.name}
		    			zone={_station.zone}
		    			image={_station.image}
		    			extras={extras}
		    			bicycle={_station.amnesties.bicycle}
		    			luggage={_station.amnesties.luggage}
		    			wheelchair={_station.amnesties.wheelchair}
		    			nextSouthBound={findNextSB}
		    			nextNorthBound={findNextNB}
		    			/>
				</div>


			</div>
	    )
	}
}


const EmptyPage = (props) => (
	<div>
		<Navbar />
		{/* navigation button to next and prev station*/}
		<NavButton  content=">" position="right" 
		    		screenHeight={props.height} screenWidth={props.width} 
		    		url={props.url} />
    	<NavButton  content="<" position="left" 				    		
    	            screenHeight={props.height} screenWidth={props.width} 
			    		url={props.url} />
		<div className="container"> 
			<Card />
		</div>
	</div>
)

export default StationDetail;

import React from 'react';
import Navbar from "../components_utils/Navbar";
import Card from "../components_utils/Card"
import Stations from "../stations/stations";
import { convertScheduleToUnix, findNextFromUnixSchedule } from "../helper/unixifySchedule.js";
import { FetchAPI } from "../helper/helper";
import Station from "../stations/stations";
const $ = require("jquery");

class ShowStationSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	width: 0,
        	showDeparture: true,
        	showArrival: true
        }
    }
    updateDimensions(){
        var screenWidth = window.innerWidth;
        //if desktop screen, show both departure and arrival card
        if(screenWidth > 770 && (!this.state.showDeparture || !this.state.showArrival )){
        	this.setState({width: screenWidth, showDeparture: true, showArrival: true})	
        } else if (screenWidth < 770){ 
        	//on mobile, show departure first, hide arrival
        	this.setState({width: screenWidth, showDeparture: true, showArrival: false})
        } else {
        	this.setState({width: screenWidth});
        }
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));  
        this.updateDimensions.call(this);
        FetchAPI.fetchStationsInterval(this);     
    }
    componentWillUnmount() {
        FetchAPI.stopFetching();         
    }
    render() {
    	if(Stations.getAll().length === 0){
    		setTimeout(() => {
    			return this.render()
    		},1000)
    		return <div></div>;
    	}
    	const departure = Stations.getById(localStorage['Departure'].split(",")[0])
    	const departureExtras = [
    		{name:"Southbound complete schedule", content:departure.Southbound},
			{name:"Northbound complete schedule", content:departure.Northbound},
			{name:"Vendors", content:departure.vendors},
    	]
    	const arrival = Stations.getById(localStorage['Arrival'].split(",")[0]);
		const arrivalExtras = [
			{name:"Southbound complete schedule", content:arrival.Southbound},
			{name:"Northbound complete schedule", content:arrival.Northbound},
			{name:"Vendors", content:arrival.vendors},
		];
		const nextTrain = determinePathAndNextTrain(departure, arrival);
		const path = ("path" in nextTrain["Northbound"]) ? "Northbound" : "Southbound";
		const index = nextTrain[path][index];
		const ETA = findETA(departure, arrival, path, index);

		return(
        	<div>
        		<Navbar />
        		{ (this.state.width < 770) ? //SHOW on MOBILE
    				<div><TabButton 
        					onClickOne={ () => this.setState({showDeparture: true, showArrival: false})}
        					onClickTwo={ () => this.setState({showDeparture: false, showArrival: true})}
        					showDeparture={this.state.showDeparture} showArrival={this.state.showArrival}
        				  /></div> : ""
				}
				{ (this.state.width < 770) ? //SHOW on MOBILE
        				<div>
	        				<TabButton 
	        					onClickOne={ () => this.setState({showDeparture: true, showArrival: false})}
	        					onClickTwo={ () => this.setState({showDeparture: false, showArrival: true})}
	        					showDeparture={this.state.showDeparture} showArrival={this.state.showArrival}
	        				  />
        					
        				</div>
        				: ""
				}
        		<div className="container">
        			{(this.state.width >= 770) ? <Labels/> : ""	}
        			{(this.state.width >= 770) ? <Labels/> : ""	}
        			
					<div className="row" style={{marginTop: 30}}>
  						<div className="col-md-6 col-sm-6 col-xs-12">
	        			<Card style={{display: this.state.showDeparture ? "inherit" : "none"}}
	        				title={departure.name}
	        				image={departure.image}
	        				zone={departure.zone}
	        				bicycle={departure.amnesties.bicycle}
	        				wheelchair={departure.amnesties.wheelchair}
	        				luggage={departure.amnesties.luggage}
	        				extras={departureExtras}
	        				nextSouthBound={nextTrain.Southbound.nextSBDeparture}
		    				nextNorthBound={nextTrain.Northbound.nextNBDeparture}
	        				/>
	        			</div>
	        			<div className="col-md-6 col-sm-6 col-xs-12">
	        			<Card style={{display: this.state.showArrival ? "inherit" : "none"}}
	        				title={arrival.name}
	        				image={arrival.image}
	        				zone={arrival.zone}
	        				bicycle={arrival.amnesties.bicycle}
	        				wheelchair={arrival.amnesties.wheelchair}
	        				luggage={arrival.amnesties.luggage}
	        				extras={arrivalExtras}
	        				nextSouthBound={nextTrain.Southbound.nextSBArrival}
		    				nextNorthBound={nextTrain.Northbound.nextNBArrival}
	        				/>
	        			</div>
	        		</div>
        		</div>
        	</div>
        )
    }
}
const TabButton = (props) => (
	<div className="nav nav-pills" style={{width: "100%"}} >
	  <li style={{width: "48%", display:"inline-block"}} onClick={props.onClickOne} className={props.showDeparture ? "active" : ""}>
	    <a>Departure</a>
	  </li>
	  <li style={{width: "48%", display:"inline-block"}} onClick={props.onClickTwo} className={props.showArrival ? "active" : ""}>
	    <a>Arrival</a>
	  </li>
	</div>
)

const Labels = (props) => (
	<div className="row" >
		<div className="col-md-6 col-xs-6">
			<p className="text-center" style={{fontSize: 25}}>Departure</p>
		</div>
		<div className="col-md-6 col-xs-6">
				<p className="text-center" style={{fontSize: 25}}>Arrival</p>
		</div>
	</div>
)

export default ShowStationSelection;



function determinePathAndNextTrain(departure, arrival){
	var result = {
		Southbound: {
			nextSBDeparture: undefined,
			nextSBArrival: undefined
		},
		Northbound: {
			nextNBDeparture: undefined,
			nextNBArrival: undefined
		}
	};
	if(departure.id > arrival.id){
		// "Southbound";
		const DepartureSouthbound_unix = convertScheduleToUnix(departure.Southbound);
		const findNextSB_Departure = findNextFromUnixSchedule(DepartureSouthbound_unix);

		const ArrivalSouthbound_unix = convertScheduleToUnix(arrival.Southbound);
		const findNextSB_Arrival = findNextFromUnixSchedule(ArrivalSouthbound_unix);
		
		result["Southbound"] = {
			nextSBDeparture: findNextSB_Departure,
			nextSBArrival: findNextSB_Arrival,
			path: "Southbound"
		}
	} else if (departure.id < arrival.id) {
		// "Northbound";
		const DepartureNorthbound_unix = convertScheduleToUnix(departure.Northbound);
		const findNextNB_Departure = findNextFromUnixSchedule(departure.Northbound, DepartureNorthbound_unix)
		const ArrivalNorthbound_unix = convertScheduleToUnix(arrival.Northbound);
		const findNextNB_Arrival = findNextFromUnixSchedule(arrival.Northbound ,ArrivalNorthbound_unix)

		console.log("departure", departure);
		console.log("findNextNB_Departure", findNextNB_Departure)
		result["Northbound"] = {
			nextNBDeparture: findNextNB_Departure,
			nextNBArrival: findNextNB_Arrival,	
			path: "Northbound"
		}
	}
	return result
}

function findETA(departure, arrival, path, index){
	//path : [Northbound, Southbound]
	//get departureTime, get arrivalTime, arrivalTime - departureTime in unix()
	const departureTime = departure[path].split(", ")[index];
	console.log(index)
	const arrivalTime = departure[path].split(", ")[index];
}

function convertToSecond(timeString){
	var hour$minute = timeString.split(":");
	var hour =  hour$minute[0];
	var minute = hour$minute[1];
	var seconds = Number(hour) * 60 * 60 + (Number(minute) * 60)
	return seconds;
}

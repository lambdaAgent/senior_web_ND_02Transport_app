import React from 'react';
import Navbar from "../components_utils/Navbar";
import Card from "../components_utils/Card"
import Stations from "../stations/stations";
import { convertScheduleToUnix, findNextFromUnixSchedule, findNextArrival } from "../helper/unixifySchedule.js";
import { FetchAPI } from "../helper/helper";
import Station from "../stations/stations";
const {sin, cos, atan2, sqrt} = Math;

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

		// why american is so fuzzyy with measurement? use 24hour and km...

		// const distance = findDistance(departure.lng, departure.lat, arrival.lng, arrival.lat); //km
		// const CaltrainSpeed = 127.138; // km/hour
		// const duration = (distance/CaltrainSpeed) * 60;
		const duration = (convertToSecond(nextTrain[path].arrival) - convertToSecond(nextTrain[path].departure)) / 60;
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
        			<h2 className="text-center">Estimate Duration: {duration} minutes</h2>
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

		const DepartureSouthbound_unix = convertScheduleToUnix(departure.Northbound);
		const nextSBResult__unix__AmPm = findNextFromUnixSchedule(departure.Northbound, DepartureSouthbound_unix)
		const findNextSB_Departure = nextSBResult__unix__AmPm[0];
		const ArrivalNorthbound_unix = convertScheduleToUnix(arrival.Northbound);
		const NextSBresult__AmPm = findNextArrival(nextSBResult__unix__AmPm[1], arrival.Northbound, ArrivalNorthbound_unix)
		const findNextSB_Arrival = NextSBresult__AmPm[0];
		result["Southbound"] = {
			nextSBDeparture: findNextSB_Departure,
			nextSBArrival: findNextSB_Arrival,	
			departure: findNextSB_Departure + " " + nextSBResult__unix__AmPm[2] ,
			arrival: findNextSB_Arrival + " " + NextSBresult__AmPm[1],
			path: "Southbound"
		}
	} else if (departure.id < arrival.id) {
		// "Northbound";
		const DepartureNorthbound_unix = convertScheduleToUnix(departure.Northbound);
		const nextNBResult__unix__AmPm = findNextFromUnixSchedule(departure.Northbound, DepartureNorthbound_unix)
		const findNextNB_Departure = nextNBResult__unix__AmPm[0];
		const ArrivalNorthbound_unix = convertScheduleToUnix(arrival.Northbound);
		const NextNBresult__AmPm = findNextArrival(nextNBResult__unix__AmPm[1], arrival.Northbound, ArrivalNorthbound_unix)
		const findNextNB_Arrival = NextNBresult__AmPm[0];
		result["Northbound"] = {
			nextNBDeparture: findNextNB_Departure,
			nextNBArrival: findNextNB_Arrival,	
			departure: findNextNB_Departure + " " + nextNBResult__unix__AmPm[2] ,
			arrival: findNextNB_Arrival + " " + NextNBresult__AmPm[1],
			path: "Northbound"
		}
	}
	return result
}

function findDuration(departureTime, arrivalTime){
	var departureSecond = convertToSecond(departureTime);
	var arrivalSecond = convertToSecond(arrivalTime);
	var duration = arrivalSecond - departureSecond;
	return duration / 60; //convert to minute
}

function convertToSecond(timeString){
	var hour__minute = timeString.split(" ")[0].split(":");
	var AmPm = timeString.split(" ")[1];
	var hour;
	
	if (AmPm === "pm" && Number(hour__minute[0]) < 12 ){
		// if pm, all number except 12pm, add 12 => i.e 1pm becomes 13, 12pm remains 12
		// why american is so fuzzyy with measurement? just use 24hour and km...
		hour = Number(hour__minute[0]) + 12;
	} else {
		hour = Number(hour__minute[0]);
	}

	var minute = hour__minute[1];
	
	var seconds = Number(hour) * 60 * 60 + (Number(minute) * 60)
	return seconds;
}

function findDistance(lat1,lon1,lat2,lon2) {
  var R = 6371; // Radius of the earth in km
  var dLat = deg2rad(lat2-lat1);  // deg2rad below
  var dLon = deg2rad(lon2-lon1); 
  var a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
    ; 
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  var d = R * c; // Distance in km
  return d;
}

function deg2rad(deg) {
  return deg * (Math.PI/180)
}
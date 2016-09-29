import React from 'react';
import Navbar from "../components_utils/Navbar";
import Card from "../components_utils/Card"
import Stations from "../stations/stations";
import { convertScheduleToUnix, findNextFromUnixSchedule } from "../helper/unixifySchedule.js";
import { FetchAPI } from "../helper/helper";
import Station from "../stations/stations";

class ShowStationSelection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        	width: 0
        }
    }
    updateDimensions(){
        var screenWidth = window.innerWidth;
        this.setState({width: screenWidth})
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));  
        this.updateDimensions.call(this);
        FetchAPI.fetchStationsInterval(this);     
    }
    componentWillMount() {
        FetchAPI.fetchStationsFromServer();
    }
    componentWillUnmount() {
        FetchAPI.stopFetching();         
    }
    render() {
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
		return(
        	<div>
        		<Navbar />
        		<div className="container">
        			<labels className="row" style={{display: this.state.width >= 770 ? "inherit" : "none"}}>
        				<div className="col-md-6 col-xs-6">
        					<p className="text-center" style={{fontSize: 25}}>Departure</p>
        				</div>
        				<div className="col-md-6 col-xs-6">
	       					<p className="text-center" style={{fontSize: 25}}>Arrival</p>
        				</div>
        			</labels>
					<div className="row">
  						<div className="col-md-6 col-sm-6 col-xs-12">
	        			<Card 
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
	        			<Card 
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
			nextSBArrival: findNextSB_Arrival
		}
	} else if (departure.id < arrival.id) {
		// "Northbound";
		const DepartureNorthbound_unix = convertScheduleToUnix(departure.Northbound);
		const findNextNB_Departure = findNextFromUnixSchedule(DepartureNorthbound_unix);
		const ArrivalNorthbound_unix = convertScheduleToUnix(arrival.Northbound);
		const findNextNB_Arrival = findNextFromUnixSchedule(ArrivalNorthbound_unix);
		result["Northbound"] = {
			nextNBDeparture: findNextNB_Departure,
			nextNBArrival: findNextNB_Arrival
		}
	}
	return result
}
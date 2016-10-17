import React from 'react';
import Navbar from "../components_utils/Navbar";
import Station from "../stations/stations"
import NavButton from "../components_utils/NavButton";
import Card from "../components_utils/Card";
import {FetchAPI} from "../helper/helper";
import { browserHistory } from "react-router";
import { convertScheduleToUnix, findNextFromUnixSchedule } from "../helper/unixifySchedule.js";
import moment from "moment";
import SidebarStationList from "../components_utils/SidebarStationList";

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
        FetchAPI.fetchStationsFromServer(this);
        FetchAPI.fetchStationsInterval(this);         
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
        const [SBResult, SBUnix, SBAmPm] = findNextFromUnixSchedule(_station.Southbound, Southbound_unix);
        const findNextSB = SBResult + " " + SBAmPm;

        const Northbound_unix = convertScheduleToUnix(_station.Northbound);
        const [NBResult,NBunix,NBAmPm] = findNextFromUnixSchedule(_station.Northbound, Northbound_unix);
        const findNextNB = NBResult + " " + NBAmPm;
       return(
	    	<div className="container">
	    		<Navbar />
		    	{(isBooking) ? 
	        		<button className="btn btn-primary" 
	                        style={{marginBottom: 40 }}
	                        onClick={ () => history.back() }>{"< Back"}</button>
	                : ""
	            }
	    	    {/* navigation button to next and prev station*/}
	    		<NavButton  content=">" position="right" 
				    		screenHeight={this.state.height} screenWidth={this.state.width} 
				    		url={this.state.url}
				    		onClick={this.nextButton.bind(this) }/>
		    	<NavButton  content="<" position="left" 				    		
		    	            screenHeight={this.state.height} screenWidth={this.state.width} 
   				    		url={this.state.url}
						    onClick={this.prevButton.bind(this) }/>	    
				<div className="row">
					{(this.state.width > 770 && !isBooking()) ? //if desktop and there is no query ?book=true  		
	    				<SidebarStationList 
	    				 className="col-md-3 col-sm-3" style={{maxWidth: 213}}
	    				 stations={Station.getAll()}/>
	    				: ""
	    			}
		    		{/*mobile view only*/}
			    	<div className="col-sm-8" >
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


function isBooking(){
	var url = window.location.href;
	var query = url.split("?")[1] || "";
	if(query.indexOf("book=true") >= 0){
		return true;
	}
	return false;
}

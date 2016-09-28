import React from 'react';
import Navbar from "../components_utils/Navbar";
import Station from "../stations/stations"
import NavButton from "../components_utils/NavButton";
import Card from "../components_utils/Card"
import moment from "moment";

class StationDetail extends React.Component {
	constructor(props) {
        super(props);
		this.state = {width: "", height: "", url: ""}
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
	}
	render(){
		const stations = Station.getAll();
		const _station = stations[0]
		const extras = [
			{name:"Southbound complete schedule", content:_station.Southbound},
			{name:"Northbound complete schedule", content:_station.Northbound},
			{name:"Vendors", content:_station.vendors},
		]
		return(
	    	<div>
	    		<Navbar />

	    	    {/* navigation button to next and prev station*/}
	    		<NavButton  content=">" position="right" 
				    		screenHeight={this.state.height} screenWidth={this.state.width} 
				    		url={this.state.url}
				    		onClick={() => {} }/>
		    	<NavButton  content="<" position="left" 				    		
		    	            screenHeight={this.state.height} screenWidth={this.state.width} 
   				    		url={this.state.url}
						    onClick={() => {} }/>	    
	    		
	    		{/*mobile view only*/}
		    	<div className="container">
		    		<Card 
		    			title={_station.name}
		    			zone={_station.zone}
		    			image={_station.image}
		    			extras={extras}
		    			/>
				</div>


			</div>
	    )
	}
}


export default StationDetail;

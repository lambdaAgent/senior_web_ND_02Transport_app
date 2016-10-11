//A dumb Component without any state
import React from "react";
import {browserHistory } from "react-router";

const SidebarList = (props) => {
	var Zones = {zone1:[], zone2:[], zone3:[], zone4:[], zone5:[], zone6:[]}
	props.stations.map(s => {
		if(s.zone === 1) Zones.zone1.push(s)
		if(s.zone === 2) Zones.zone2.push(s)
		if(s.zone === 3) Zones.zone3.push(s)
		if(s.zone === 4) Zones.zone4.push(s)
		if(s.zone === 5) Zones.zone5.push(s)
		if(s.zone === 6) Zones.zone6.push(s)
	})	
	const renderZone = [1,2,3,4,5,6].map(i => {
		return <Zone zone={i} key={"zone"+i} children={Zones["zone"+i]} />
	})
	return(
		<div className={props.className} 
		     style={Object.assign({}, props.style, {display:"inline-block"})}>
			<ul className="list-group">
			   {renderZone}
			</ul>
		</div>
	)
}

const ZoneList = (props) => (
	<li className="list-group-item" 
	    onClick={()=> browserHistory.push("/station/" + props.stationId)}
	    >
	    {props.title}
	</li>
)

class Zone extends React.Component {	
	constructor(props){
		super(props);
		this.state = {showChild: (this.props.zone === 1) ? true :  false}
		this.zone_color = {
			1:"#c0392b",
			2:"#e67e22",
			3:"#e74c3c",
			4:"#f39c12",
			5:"#d35400",
			6:"#8e44ad"
		}
	}	
	render(){
		const props = this.props;
		const style = {backgroundColor: this.zone_color[props.zone], color:"white" }
		const children = props.children || [];
		const showChildren = children.map(c => <ZoneList key={c.id} title={c.name} stationId={c.id} />)
		return(
			<div>
				<li className="list-group-item" 
				    style={style}
				    onClick={() => {
				    	console.log('heelo');
				    	this.setState({showChild: !this.state.showChild}) 
				    	console.log("STATE", this.state)
				    }}
				    >
					Zone {props.zone} 
					{(this.state.child === true) ? 
						<span style={{color: "white", float:"right"}}>&#9650;</span>
						:
						<span style={{color: "white", float:"right"}}>&#9660;</span>
					}
				</li>
				{
					( this.state.showChild === true ) ?
					 showChildren : ""
				}
			</div>
		)
	}
}

module.exports = SidebarList;
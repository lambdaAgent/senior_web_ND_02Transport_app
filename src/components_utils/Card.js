import React from 'react';
const $ = require("jquery");

const radius = 20
const zone_color = {
	1:"#c0392b",
	2:"#e67e22",
	3:"#e74c3c",
	4:"#f39c12",
	5:"#d35400",
	6:"#8e44ad",

}

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.displayName = 'Card';
    }
    render() {
    	const props = this.props;
    	console.log(zone_color[props.zone])
    	const zoneColor = {backgroundColor: zone_color[props.zone]}
    	const extras__arr = props.extras || [];
    	const extras = extras__arr.map( (e,index) => <Lists key={index} name={e.name} content={e.content}/>)
    	return (
        	<div className="card" style={ Object.assign({}, props.style, defaultStyle)}>
			  
			  <div className="card-block" style={Object.assign({}, cardBlockstyle, zoneColor)}>
			    <h2 className="card-title pull-right" style={{color: "white",  padding: 0, margin: 0}}>{props.zone}</h2>
			    <h2 className="card-title" style={{color: "white",  padding: 0, margin: 0}}>{props.title}</h2>
			    <h6 className="card-subtitle text-muted" style={{ padding: 0, margin: 0}}>{props.subtitle}</h6>
			  </div>

			  <img className="card-img-top" src={props.image} alt="Card image cap" width="100%"/>
			  <div className="card-block" style={{padding: "0 10px", margin:"20px auto"}}>
			    <h4 className="card-title">Next Train:  <span style={nextTrainStyle}>2:51 AM</span> </h4>
			    {/*<p className="card-text">Some quick example text to build on the card title and make up the bulk of the cards content.</p> */}
			  </div>

			  <hr />
			  
			  {/* Amneties */}
			  <div className="card" style={{padding: "0 10px"}}>
			    <h6>Amneities: </h6>
			    <div style={{maxWidth: "320px",margin: "20px auto"}}>
				  	<img className="img-rounded" src="/images/Bike-car.gif" alt="bicycle park"/>
				  	<span style={{width: "2%"}}>&nbsp;&nbsp;</span>
				  	<img className="img-rounded" src="/images/Luggage-Car.gif" alt="luggage "/>
				  	<span style={{width: "2%"}}>&nbsp;&nbsp;</span>
				  	<img className="img-rounded" src="/images/Access-Car.gif" alt="Wheelchair accessible"/>
				</div> 
			  </div>

			  {extras}
			  

			  {/*<div className="card-block">
			    <a href="#" className="card-link">Card link</a>
			    <a href="#" className="card-link">Another link</a>
			  </div> */}
			</div>
        )
    }
}

// --------
//  LISTS
// --------
class Lists extends React.Component {
	constructor(props){
		super(props);
		this.state = {child: "none"}
	}
	toggleChild(e){
		e.preventDefault();
		var classNames = this.refs.child.className;
		if(classNames.indexOf("hide") < 0)
			this.refs.child.className += " hide"; 
		else 
			this.refs.child.className = "list-group"
	}
	render(){
		const props = this.props;
		return(
			 <ul className="list-group">
			    <li className="list-group-item" 
			        onClick={this.toggleChild.bind(this)}>
			        <h5>{props.name} <i className="caret"></i> </h5> 
			    </li>
			    <ul ref="child" className="list-group hide" 
			        style={{paddingLeft: 0}}>
				    <li className="list-group-item" style={{paddingLeft: 30}}>
				    	<span>{props.content} </span>
				    </li>
			  </ul>
			</ul>
		)
	}
}

export default Card;



// ---------------
//     STYLE
// ---------------


const defaultStyle = {
    		//border: "solid 1px red", 
    		maxWidth: 400, 
    		margin:"0 auto",
    		paddingBottom: 20,
    		borderRadius: radius,
    		boxShadow: "5px 5px 10px 1px rgba(0,0,0,0.5)"	
    	}
const cardBlockstyle = {
	padding: "10px 10px", 
	borderTopLeftRadius: radius, 
	borderTopRightRadius: radius
};       
const nextTrainStyle= {
	borderRadius: 50,
	backgroundColor: "yellow",
	cursor: "pointer",
	padding: "5px 8px",
	border: "solid 1px rgba(0,0,100, 0.2)",
	float: "right",
	right: 20,
	marginTop: -5
}
import React from "react";

var navbuttonHeight = ""
const NavButton = (props) => {
	var positionStyle = {top: props.screenHeight/2 + "px", zIndex: 1000, opacity: 0.6}
	props.position === "right" ? positionStyle.right = "10px"    : positionStyle.left = "10px";
	if(props.screenWidth <= 770 && props.url.indexOf("book=true") === -1){
		// if mobile and  !booking state
	  	positionStyle.display = "inherit" 
	} else {
		positionStyle.display = "none";
	}
	return(
		<button className="btn btn-default btn-success" 
		        style={Object.assign({},positionStyle, {borderRadius: "50px", position: "fixed"}) }
		        onClick={props.onClick}>
		        {props.content}
		</button>
	)
	
}

module.exports = NavButton;
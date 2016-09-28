import React from 'react';
import { Link } from 'react-router';
import Navbar from "../components_utils/Navbar";
import { Cookie } from "../helper/helper.js"
const $ = require("jquery");
// import {browserHistory} from 'react-router';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departSelected: "",
            arriveSelected: "",
        }
    }
    componentDidMount() {
        var cookieObj = Cookie.convertCookieToObject(document.cookie);
        console.log("cookieObj", cookieObj)
        this.setState({departSelected: cookieObj.depart, arriveSelected: cookieObj.arrive})
    }
    render() {
        console.log(this.state)
        return(
            <div>
                <Navbar />
            	<div className="container">
                    <div style={{display: !this.state.showStationTable ? "inherit" : "none", maxWidth: "700px", margin: "0 auto"}}>
                       <BookButton 
                            label={"Departure"} 
                            selected={this.state.departSelected}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

const BookButton = (props) => {
    var selected = function(){
        return <div><span style={{fontSize: "15px"}}>{props.label}</span> {": " + props.selected}</div>
    }
    return (
         <Link className="btn btn-primary btn-lg btn-block"
            style={{height: "70px", fontSize: "1.5em", lineHeight: "45px", letterSpacing: "3px"}}
            to={"/selectStation?" + props.label }
            >
            { props.selected ? selected() : props.label }
        </Link>
    )
}

export default Content;


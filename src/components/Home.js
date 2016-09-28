import React from 'react';
import { Link } from 'react-router';
import Navbar from "./Navbar";
import StationList from "../stations/stations.js";
const $ = require("jquery");
import {browserHistory} from 'react-router';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            stations: StationList.getAll(),
            showStations: true
        }
    }
    render() {
        const self = this;
        return(
            <div>
                <Navbar />
            	<div className="container">
                    <StationTable stations={this.state.stations} 
                                  show={this.state.showStations}/>
                </div>
            </div>
        )
    }
}


const StationTable = (props) => {
    const stations = props.stations || []
    const loop = stations.map( s => (
                <List key={s.id} id={s.id} name={s.name} zone={s.zone} 
                      
                      click={ ()=> browserHistory.push("/event/" + s.id)}
                      mouseOver={ () => $(".event").removeClass("event")}
                      mouseLeave={ () => $("table > tbody tr").addClass("event")}
                      /> 
         ))
    return(
        <div style={{display: (props.show) ? "inherit" : "none"}}> 
        <table className="table">
            <thead>
                <tr>
                    <th>Station Name</th><th>Zone</th><th>SouthB NextTrain</th><th>NorthB NextTrain</th><th>Action</th>
                </tr> 
            </thead> 
            <tbody>
                <List />
            </tbody>
        </table>
        </div>
    )
}

const List = (props) => (
    //props.mouseOver
    //props.mouseLeave
    //props.name
    //props.type
    //props.author
    <tr className="">       
        <td onClick={props.click}>{props.name} <b> San Francisco Station</b></td> 
        <td onClick={props.click}>{props.zone} 1</td> 
        <td onClick={props.click}> 12:00 AM </td> 
        <td onClick={props.click}> 12:00 AM </td> 
        <th id="noHover" 
            onMouseOver={props.mouseOver} 
            onMouseLeave={props.mouseLeave}>
            <Link className="btn btn-success" to="station/asd?book=true"> Details > </Link> 
        </th>
    </tr> 
)



export default Content;



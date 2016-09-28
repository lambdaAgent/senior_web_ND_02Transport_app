import React from "react"
const $ = require("jquery");
import {browserHistory, Link} from 'react-router';

const StationTable = (props) => {
    const stations = props.stations || []
    const loop = stations.map( s => (
                <Cell key={s.id} id={s.id} name={s.name} zone={s.zone} 
                      click={ props.onCellClick }
                      mouseOver={ () => $(".event").removeClass("event")}
                      mouseLeave={ () => $("table > tbody tr").addClass("event")}
                      /> 
         ))
    return(
        <div> 
        <table className="table">
            <thead>
                <tr>
                    <th>Station Name</th><th>Zone</th><th>SouthB NextTrain</th><th>NorthB NextTrain</th><th>Details</th>
                </tr> 
            </thead> 
            <tbody>
                {loop}
            </tbody>
        </table>
        </div>
    )
}

const Cell = (props) => (
    //props.mouseOver
    //props.mouseLeave
    //props.name
    //props.type
    //props.author
    <tr className="event">       
        <td onClick={() => props.click(props.id) }><b> {props.name}</b></td> 
        <td onClick={() => props.click(props.id) }>{props.zone}</td> 
        <td onClick={() => props.click(props.id) }> 12:00 AM </td> 
        <td onClick={() => props.click(props.id) }> 12:00 AM </td> 
        <th id="noHover" 
            onMouseOver={props.mouseOver} 
            onMouseLeave={props.mouseLeave}>
            <Link className="btn btn-success" to="station/asd?book=true"> > </Link> 
        </th>
    </tr> 
)

module.exports = StationTable
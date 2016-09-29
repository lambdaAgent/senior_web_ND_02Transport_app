import React from "react"
const $ = require("jquery");
import { Link} from 'react-router';
import { convertScheduleToUnix, findNextFromUnixSchedule } from "../helper/unixifySchedule.js";

const StationTable = (props) => {
    //props.onCellClick
    //props.stations
    const stations = props.stations || []
    const loop = stations.map( s => {
        const Southbound_unix = convertScheduleToUnix(s.Southbound);
        const findNextSB = findNextFromUnixSchedule(Southbound_unix);
        const Northbound_unix = convertScheduleToUnix(s.Northbound);
        const findNextNB = findNextFromUnixSchedule(Northbound_unix);
        return  <Cell key={s.id} id={s.id} name={s.name} zone={s.zone} 
                      click={ props.onCellClick }
                      nextNB={findNextNB}
                      nextSB={findNextSB}
                      mouseOver={ () => $(".event").removeClass("event")}
                      mouseLeave={ () => $("table > tbody tr").addClass("event")}
                      /> 
         
    })
    return(
        <div> 
        <table className="table">
            <thead>
                <tr>
                    <th>Station Name</th>
                    <th>Zone</th>
                    <th>SouthB NextTrain</th>
                    <th>NorthB NextTrain</th>
                    <th>Details</th>
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
        <td onClick={() => props.click(props.id,props.name) }><b> {props.name}</b></td> 
        <td onClick={() => props.click(props.id,props.name) }>{props.zone}</td> 
        <td onClick={() => props.click(props.id,props.name) }> {props.nextNB}</td> 
        <td onClick={() => props.click(props.id,props.name) }> {props.nextSB}</td> 
        <th id="noHover" 
            onMouseOver={props.mouseOver} 
            onMouseLeave={props.mouseLeave}>
            <Link className="btn btn-success" to={"station/"+props.id+"?book=true"}> > </Link> 
        </th>
    </tr> 
)

module.exports = StationTable
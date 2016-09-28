import React from 'react';
import { Link } from 'react-router';
import Navbar from "./Navbar";
import StationList from "../stations/stations.js";
import StationTable from "../components_utils/StationTable"
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



export default Content;



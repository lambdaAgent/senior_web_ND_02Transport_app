import React from 'react';
import { Link } from 'react-router';
import Navbar from "../components_utils/Navbar";
import StationList from "../stations/stations.js";
import StationTable from "../components_utils/StationTable";
import { Query } from "../helper/helper.js"
const $ = require("jquery");
import {browserHistory} from 'react-router';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departSelected: "",
            arriveSelected: "",
            query: undefined
        }
    }
    componentDidMount() {
        var url = window.location.href;

        if(url.indexOf("?")){
            //if url has query, convert query to Object
            var query = Query.convertQueryToObject(url);
            if ("departure" in query) 
                this.setState({departSelected: query.departure}) 
            else if("arrival" in query) 
                this.setState({arriveSelected: query.arrival})                                 

            this.setState({query: Query.convertObjectToQuery(query) })
        }

    }
    render() {
        console.log(this.state)
        return(
            <div>
                <Navbar />
            	<div className="container">
                    <div style={{display: !this.state.showStationTable ? "inherit" : "none"}}>
                       <BookButton 
                            label={"Depart"} 
                            queryString={this.state.query}
                            />
                    </div>
                </div>
            </div>
        )
    }
}

const BookButton = (props) => {
    var queryString = props.queryString || ""
    return (
         <Link className="btn btn-primary btn-lg btn-block"
            to={"/selectStation" + queryString }
            >
            {props.label}        
        </Link>
    )
}

export default Content;


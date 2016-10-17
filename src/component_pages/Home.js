import React from 'react';
import { browserHistory, Link } from 'react-router';
import {BookButton, ButtonGroup} from '../components_utils/Buttons';
import Navbar from "../components_utils/Navbar";
import { Cookie, FetchAPI } from "../helper/helper.js"

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            departSelected: undefined,
            arriveSelected: undefined,
        }
        this.height = 0;
        this.valid = false;
    }
    componentDidMount() {
        //set departSelected and arriveSelected;
        this.height = window.innerHeight;
        initDepartureAndArrival(this);
        FetchAPI.fetchStationsFromServer(this);
        FetchAPI.fetchStationsInterval(this);     
    }
    componentWillUnmount() {
        FetchAPI.stopFetching();         
    }
    clearBtn(e){
        e.preventDefault();
        this.setState({arriveSelected: undefined, departSelected: undefined})
        localStorage.removeItem("Departure")
        localStorage.removeItem("Arrival")
    }
    okBtn(e){
        e.preventDefault();
        if(this.valid){
            browserHistory.push("/showSelected")
        }
    }
    render() {
        var valid = this.valid;
        var path = undefined
        const height = this.height;
        const arriveSelected = this.state.arriveSelected ? this.state.arriveSelected.split(",")[1] : ""
        const departSelected = this.state.departSelected ? this.state.departSelected.split(",")[1] : ""
        const arriveId = this.state.arriveSelected ? this.state.arriveSelected.split(",")[0] : undefined
        const departId = this.state.departSelected ? this.state.departSelected.split(",")[0] : undefined
        if(arriveId && departId){
            if (arriveId > departId){
                path = "NorthBound"; 
                this.valid = true;
            } else if (arriveId < departId) {
                path = "SouthBound";
                this.valid = true
            } else {
                path = "Please Select different locations"; 
                this.valid = false;
            }
        } else if(!arriveId || !departId){
            path = "Please select the empty locations";
            this.valid = false
        }
        return(
            <div>
                <Navbar />
            	<div className="container">
                    <div style={{display: !this.state.showStationTable ? "inherit" : "none",
                                maxWidth: "700px", margin: "0 auto", 
                                marginTop: 70}}>
                        <h2 className="text-center">Select Stations</h2>
                        <hr />
                        <br />
                       <BookButton 
                            className={"btn-primary"}
                            label={"Departure"} 
                            selected={departSelected}
                            />
                        <BookButton 
                            className={"btn-success"}
                            label={"Arrival"} 
                            selected={arriveSelected}
                            />
                        { (path) ?
                            <p>Path: <span style={{fontSize: 20, width:"75%", display:"inline-block"}}>{path}</span></p> 
                           : ""
                        }
                        <ButtonGroup
                            okBtn={this.okBtn.bind(this)} 
                            clearBtn={this.clearBtn.bind(this)}/>
                        <br /> 
                        <br />
                        <h2 className="text-center"> Stations Map </h2>                        
                        <hr />
                        <img className="img-responsive" src="/images/Caltrain_Zone_Map.png" alt="Caltrain zone map" />
                    </div>
                </div>
            </div>
        )
    }
}


export default Content;


// -----------
//   HELPER
// -----------

function initDepartureAndArrival(React){
    var departure_db = localStorage["Departure"] || undefined;
    var arrival_db = localStorage["Arrival"] || undefined;
    if(!departure_db && !arrival_db){
        React.setState ({
            departSelected: undefined,
            arriveSelected: undefined,
        })
    }
    if(departure_db && React.state.departSelected !== departure_db)
        React.setState({departSelected: departure_db})
    if(arrival_db && React.state.arriveSelected !== arrival_db)
        React.setState({arriveSelected: arrival_db})
}


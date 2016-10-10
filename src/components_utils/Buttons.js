import React from "react";
import {Link} from "react-router";

/*
  Actions button for the booking process
  --clearBtn -- clear booking
  --okBtn -- process to see details
*/

const BookButton = (props) => {
    var selected = function(){
        return <div>
          <span style={{fontSize: "15px"}}>{props.label[0]}</span> {": " + props.selected}
        </div>
    }
    return (
         <Link className={"btn btn-lg btn-block " + props.className}
            style={{ height: "70px", fontSize: "1.5em", 
                     lineHeight: "45px", letterSpacing: "3px",
                     marginBottom: 20
                }}
            to={"/selectStation?" + props.label }
            >
            { props.selected ? selected() : props.label }
        </Link>
    )
}

const ButtonGroup = (props) => {
    return(
        <div className="btn-group btn-group-justified" 
             style={Object.assign({}, {height: 30}, props.style) }>
          <div className="btn-group">
            <button onClick={props.clearBtn} className="btn btn-danger">clear</button>
          </div>
          <div className="btn-group">
            <button onClick={props.okBtn}  className="btn btn-primary">OK</button>
          </div>
        </div>
    )
}

module.exports = {
  BookButton, ButtonGroup
}
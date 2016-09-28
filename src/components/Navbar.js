import React from 'react';
import { Link } from 'react-router';
const $ = require("jquery");

class Navbar extends React.Component {
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this)
        this.state = {width: 0, url: ""}
    }
    updateDimensions(){
        var screenWidth = window.innerWidth;
        var currentUrl = window.location.href
        this.setState({width: screenWidth, url: currentUrl})
    }
    componentDidMount() {
        window.addEventListener("resize", this.updateDimensions.bind(this));  
        this.updateDimensions.call(this);
    }
    render() {
        const self = this;
        var showBackButton = checkBookQueryUrl(this.state.url) ? true: false
        return(
        	<nav className="navbar navbar-inverse navbar-fixed-top">
				{ (!showBackButton) /*cannot use if, use ternary instead*/
                    
                    ? /*show bellow if backButton is OFF*/
                        <div className="container">
                            {/* MOBILE ONLY */}
                            <div style={{display: this.state.width <= 760 ? "inherit" : "none"}}> 
            					<div className="navbar-header" style={{marginRight: 8}}>
            						<Link to="/" className="navbar-brand">Train Planner</Link>
            						<div className="nav navbar-nav collapsed pull-right" >
            							<Hamburger onClick={() => $("#Hamburger-Menu").toggleClass("collapse") } />
            						</div>
            					</div>
                                <CollapsedMenu /> 
                            </div>

        					{/* DESKTOP ONLY*/}
                            <div style={{ display: this.state.width >= 760 ? "inherit" : "none" }}>
                                <div className="navbar-header">
                                    <Link to="/" className="navbar-brand">Train Planner</Link>
                                    <ul className="nav navbar-nav">
                                        <li id="transitMap-hamburger"><Link to="/checkTrain">Check-Train</Link></li>
                                        <li id="detail-hamburger"><Link to="/station/001">Station-details</Link></li>
                                    </ul>
                                </div> 
            					<div className="navbar-collapes" >
            						<ul className="nav navbar-nav navbar-right">
            							<li><Link to="/signup">Signup</Link></li>
            						</ul>
            					</div>
                            </div>
                        </div>
                    
                    : /*show below only if back button is ON*/
                        <div className="navbar-header" style={{width: "100%"}}>
                            <Link className="navbar-brand" onClick={ () => window.history.back() }> {"< Back"}</Link>
                        </div>
                }
			</nav>
        )
    }
}


const Hamburger = (props) => (
      <button type="button" className="navbar-toggle collapsed" aria-expanded="false"
              onClick={props.onClick}>
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
     
)


const CollapsedMenu = (props) => (
	<div className="collapse navbar-collapse" id="Hamburger-Menu" 
         style={Object.assign({}, {marginTop: 0})}>
      <ul className="nav navbar-nav">
        <li id="Signup-hamburger"><Link to="/signup">Signup</Link></li>
        <li id="transitMap-hamburger"><Link to="/checkTrain">Check-Train</Link></li>
        <li id="detail-hamburger"><Link to="/station/001">Station-details</Link></li>
      </ul>
    </div>    
)

function checkBookQueryUrl(url){
    return (url.indexOf("book=true") > -1)  ? true : false
}

export default Navbar;

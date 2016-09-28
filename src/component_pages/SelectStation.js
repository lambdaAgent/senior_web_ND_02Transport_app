import React from 'react';

class SelectStation extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        	     
    }
    render() {
        return (
        	<div>
        		 <button className="btn btn-primary" 
                        style={{marginBottom: 40}}
                        onClick={ () => history.back() }>{"< Back"}</button>
                        
        	</div>
        )
    }
}

export default SelectStation;

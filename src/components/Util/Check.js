import React from 'react';
import {connect} from 'react-redux';

class Check extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        return(
            <div>
                <button onClick={
                    () => {
                        console.log(this.props.schedules);
                        console.log(this.props.calendars);
                        console.log(this.props.r_guides);
                    }
                }> btn </button>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        schedules: state.schedules,
        calendars: state.calendars,
        r_guides: state.r_guides
    };
}


//store에 정의 된 state를 쓰기 위한 connect
Check= connect(mapStateToProps)(Check);

export default Check;

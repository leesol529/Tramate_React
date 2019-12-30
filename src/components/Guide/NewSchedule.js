import React from 'react';

export default class NewSchedule extends React.Component{

    constructor(props){
        super(props);
        this.state={
            schedule: this.props.schedule
        }
    }

    render(){
        console.log(this.state.schedule);
        return(
            <tr>
                <td>
                    
                </td>
            </tr>
        );
    }
}
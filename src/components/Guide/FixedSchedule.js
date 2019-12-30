import React from 'react';
import axios from 'axios';

export default class FixedSchedule extends React.Component{
    constructor(props){
        super(props);
        this.state={
            schedule: this.props.schedule
        }
    }

    render(){
        return(
            <tr>
                <td>
                    {this.state.schedule}
                </td>
            </tr>
        );
    }
}
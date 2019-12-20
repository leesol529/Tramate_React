import React from 'react';
import {DateRangePicker} from 'react-dates';

export default class Calendar extends React.Component{
    render(){
        return(
            <div>
                <DateRangePicker />
            </div>
        );
    }
}
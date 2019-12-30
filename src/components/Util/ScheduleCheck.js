import React from 'react';
import 'react-dates/initialize'; 
import 'react-dates/lib/css/_datepicker.css';
import moment from 'moment';
import { DayPickerRangeController } from 'react-dates';

export default class ScheduleCheck extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null
        }
    }

    handleOutsideRange = day => {
        //day가 해당 일자일 경우 block 
        if(day.format('YYYY-MM-D')==='2019-12-31')
            return true;
        return false;
    }

    isBlocked = day => {
        //day가 해당 일자일 경우 block 
        if(day.format('YYYY-MM-D')==='2019-12-31')
            return true;
        return false;
        
    }

    render(){
        return(
            <div>
                <DayPickerRangeController
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    //focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    //onFocusChange={focusedInput => this.setState({ focusedInput })} // PropTypes.func.isRequired,
                    //initialVisibleMonth={() => moment().add(2, "D")} // PropTypes.func or null,
                    hideKeyboardShortcutsPanel={true}
                    numberOfMonths={3}
                    isDayBlocked={this.isBlocked}
                />
            </div>
        );
    }
}
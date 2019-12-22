import React from 'react';
import 'react-dates/initialize'; //어쩌면 calendar를 호출하는 컴포넌트에서 import해야하는듯? 
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';

const now = moment();
console.log(now.format('MMM Do, YYYY'));

export default class Calendar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            startDate: null,
            endDate: null,
            focusedInput: null,
            block: true
        }
        this.onFocusChange = this.onFocusChange.bind(this);
    }

    isBlocked = day => {
        //day가 해당 일자일 경우 block 
        if(day.format('YYYY-MM-D')==='2019-12-31')
            return true;
        return false;
    }

    //캘린더 선택 후에도 open 상태 유지 
    onFocusChange(focusedInput) {
        if (!focusedInput) return; // doesn't update the focusedInput if it is trying to close the DRP
        this.setState({ focusedInput });
      }
    
    render(){
    
        return(
            <div>
                <DateRangePicker
                    date = {moment()}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={({ startDate, endDate }) => this.setState({ startDate, endDate })} // PropTypes.func.isRequired,
                    focusedInput={this.state.focusedInput} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                    onFocusChange={this.onFocusChange} // PropTypes.func.isRequired,
                    hideKeyboardShortcutsPanel={true}
                    isDayBlocked={this.isBlocked}
                    showClearDates={true}
                    displayFormat="YYYY-MM-D"
                    showDefaultInputIcon
                />
            </div>
        );
    }
}
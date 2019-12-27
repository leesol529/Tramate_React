import React from 'react';
import 'react-dates/initialize'; //어쩌면 calendar를 호출하는 컴포넌트에서 import해야하는듯? 
import 'react-dates/lib/css/_datepicker.css';
import {DateRangePicker} from 'react-dates';
import moment from 'moment';
import {addCalendar, delCalendar} from '../../actions/action';
import {connect} from 'react-redux';

class Calendar extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            gnum: this.props.gnum,
            tnum: this.props.tnum,
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
        //날짜 선택 후 캘린더 자동으로 닫히도록 하고 싶으면 아래의 if문 다시 주기 
        //if (!focusedInput) return; 
        this.setState({ focusedInput });
    }
    
    //달력에서 날짜 클릭 시 해당 날짜를 state에 값 저장 
    handleDatesChange=({startDate, endDate})=>{

        //이 부분이 없으면 한번에 값이 안들어가짐, 이유 불명확
        this.state={
            gnum: this.props.gnum,
            tnum: this.props.tnum,
            startDate,
            endDate
        };

        this.setState({
            gnum: this.props.gnum,
            tnum: this.props.tnum,
            startDate,
            endDate
        });

        let startdate = moment(this.state.startDate).format('YYYY-MM-DD');
        let enddate = moment(this.state.endDate).format('YYYY-MM-DD');
        let calendar = {
            gnum: Number(this.props.gnum),
            tnum: Number(this.props.tnum),
            startdate,
            enddate,
            //accept: no이면 수락 전 수락 후 yes로 변경하기 
            accept: 'no'
        };
        
        this.props.onInsertCalendar(calendar);
    }

    render(){
        return(
            <div>
                <DateRangePicker
                    //date = {moment()}
                    startDate={this.state.startDate} // momentPropTypes.momentObj or null,
                    startDateId="your_unique_start_date_id" // PropTypes.string.isRequired,
                    endDate={this.state.endDate} // momentPropTypes.momentObj or null,
                    endDateId="your_unique_end_date_id" // PropTypes.string.isRequired,
                    onDatesChange={this.handleDatesChange} // PropTypes.func.isRequired,
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

//store의 state를 변경하기 위한 method (저장)
let mapDispatchToProps = (dispatch) => {
    return {
        onInsertCalendar: (a) => dispatch(addCalendar(a)),
        onDeleteCalendar: (a) => dispatch(delCalendar(a))
    };
}

//store에 정의 된 state를 쓰기 위한 connect
Calendar= connect(undefined ,mapDispatchToProps)(Calendar);

export default Calendar;
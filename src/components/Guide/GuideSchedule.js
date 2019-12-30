import React from 'react';
import ScheduleCheck from '../Util/ScheduleCheck';
import axios from 'axios';

class GuideSchedule extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            gnum: this.props.match.params.gnum,
            fixed: [],
            new: []
        }
    }

    
    getFixedSchedule = () => {
        let data = new FormData();
        data.append("gnum", this.state.gnum);
        axios.post(
            "http://localhost:9000/guide/schedule/fixed",
            data
        ).then((res)=>{
            this.setState({
                fixed: res.data
            });
        }).catch((err)=>{
            console.log("예약된 스케줄 가져오기 실패");
        });
    }

    getNewSchedule = () => {
        let data = new FormData();
        data.append("gnum", this.state.gnum);
        axios.post(
            "http://localhost:9000/guide/schedule/new",
            data
        ).then((res)=>{
            this.setState({
                new: res.data
            });
        }).catch((err)=>{
            console.log("예약된 스케줄 가져오기 실패");
        });
    }

    componentDidMount(){
        this.getFixedSchedule();
        this.getNewSchedule();
    }

    render(){
        return(
            <div className="super">
                <h2 className="schedule_title"> My Schedule </h2>
                <div className="schedule_div">
                    <ScheduleCheck />
                </div>
                
            </div>
        );
    }
}

export default GuideSchedule;
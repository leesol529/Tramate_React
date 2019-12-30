import React from 'react';
import ScheduleCheck from '../Util/ScheduleCheck';
import FixedSchedule from './FixedSchedule';
import NewSchedule from './NewSchedule';
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

        //예약 대기중인 스케줄 가져오기 
        axios.post(
            "http://localhost:9000/guide/schedule/new",
            data
        ).then((res)=>{
            this.setState({
                new: res.data
            });
            //console.log(this.state.new);
        }).catch((err)=>{
            console.log("예약 대기중인 스케줄 가져오기 실패");
        });

        
    }

    componentDidMount(){
        this.getFixedSchedule();
        this.getNewSchedule();
    }

    render(){
        let fixedOne = [];
        let newOne = [];
        for(let i=0; i<this.state.fixed.length; i++){
            fixedOne.push(<FixedSchedule key={i} schedule={this.state.fixed[i]} />);
        }

        for(let i=0; i<this.state.new.length; i++){
            newOne.push(<NewSchedule key={i} schedule={this.state.new[i]} />)
        }

        return(
            <div className="super">
                <h2 className="schedule_title"> My Schedule </h2>
                {/* <div className="schedule_div">
                    <ScheduleCheck />
                </div> */}

                {/* 예약 확정 스케줄 테이블 */}
                <hr/> 
                <h3 className="schedule_title"> Fixed Schedule </h3>
                <table className="fixed_table">
                    <thead>
                        <tr>
                            <th> with </th>
                            <th> attractions </th>
                            <th> activities </th>
                            <th> restaurants </th>
                            <th> start date </th>
                            <th> end date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {fixedOne}
                    </tbody>
                </table>

                {/* 예약 대기 스케줄 테이블  */}
                <hr/>
                <h3 className="schedule_title"> New Schedule </h3>
                <table className="fixed_table">
                    <thead>
                        <tr>
                            <th> with </th>
                            <th> attractions </th>
                            <th> activities </th>
                            <th> restaurants </th>
                            <th> start date </th>
                            <th> end date </th>
                        </tr>
                    </thead>
                    <tbody>
                        {newOne}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default GuideSchedule;
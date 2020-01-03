import React from 'react';
import FixedSchedule from './TravelerFixedSchedule';
import NewSchedule from './TravelerNewSchedule';
import DeclinedSchedule from './TravelerDeclinedSchedule';
import axios from 'axios';

class TravelerSchedule extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            tnum: this.props.match.params.tnum,
            fixed: [],
            new: [],
            declined: [],
            fixedSchedule: [],
            newSchedule: [],
            declinedSchedule: []
        }
    }

    getFixedSchedule = () => {
        let data = new FormData();
        data.append("tnum", this.state.tnum);
        axios.post(
            "http://localhost:9000/traveler/schedule/fixed",
            data
        ).then((res)=>{
            this.setState({
                fixed: res.data
            });
            
            if(this.state.fixed.length>0){
                this.state.fixed.map((fixedOne, idx)=>{
                    this.setState({
                        fixedSchedule: [
                            ...this.state.fixedSchedule,
                            <FixedSchedule key={idx} schedule={fixedOne}
                                           history={this.props.history}/>
                        ]
                    })
                })
            } else if(this.state.fixed.length===0){
                this.setState({
                    fixedSchedule: [
                        <h3> No fixed schedules </h3>
                    ]
                })
            }

        }).catch((err)=>{
            console.log("예약된 스케줄 가져오기 실패");
        });
    }

    getNewSchedule = () => {
        let data = new FormData();
        data.append("tnum", this.state.tnum);

        //예약 대기중인 스케줄 가져오기 
        axios.post(
            "http://localhost:9000/traveler/schedule/new",
            data
        ).then((res)=>{
            this.setState({
                new: res.data
            });

            if(this.state.new.length>0){
                this.state.new.map((newOne, idx)=>{
                    this.setState({
                        newSchedule: [
                            ...this.state.newSchedule,
                            <NewSchedule key={idx+100} schedule={newOne}
                                         history={this.props.history}/>
                        ]
                    })
                })
            }else if(this.state.new.length===0){
                this.setState({
                    newSchedule: [
                        <h3> 새로 신청한 스케줄이 없습니다 </h3>
                    ]
                })
            }
        }).catch((err)=>{
            console.log("예약 대기중인 스케줄 가져오기 실패");
        });
    }

    getDeclinedSchedule = () => {
        let data = new FormData();
        data.append("tnum", this.state.tnum);

        //거절된 스케줄 가져오기 
        axios.post(
            "http://localhost:9000/traveler/schedule/no",
            data
        ).then((res)=>{
            this.setState({
                declined: res.data
            });
            if(this.state.declined.length>0){
                this.state.declined.map((declinedOne, idx)=>{
                    this.setState({
                        declinedSchedule: [
                            ...this.state.declinedSchedule,
                            <DeclinedSchedule key={idx+200} schedule={declinedOne}
                                         history={this.props.history}/>
                        ]
                    })
                })
            }else if(this.state.declinedSchedule.length===0){
                this.setState({
                    declinedSchedule: [
                        <h3> 거절된 스케줄이 없습니다 </h3>
                    ]
                })
            }
        }).catch((err)=>{
            console.log("거절된 스케줄 가져오기 실패");
        });
    }

    componentDidMount(){
        this.getFixedSchedule();
        this.getNewSchedule();
        this.getDeclinedSchedule();
    }

    render(){
        
        return(
            <div className="super">
                {/* 예약 확정 스케줄 */}
                <h2 className="schedule_title"> 확정 된 스케줄 </h2>
                <div className="schedule_super_div">
                    {this.state.fixedSchedule}
                </div>


                {/* 예약 대기 스케줄 */}
                <hr/>
                <h2 className="schedule_title"> 예약 대기중인 스케줄 </h2>
                <div className="schedule_super_div">
                    {this.state.newSchedule}
                </div>
                <hr/>
                <h2 className="schedule_title"> 예약 거절 된 스케줄 </h2>
                <div className="schedule_super_div">
                    {this.state.declinedSchedule}
                </div>
            </div>
        );
    }
}

export default TravelerSchedule;
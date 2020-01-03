import React from 'react';
import FixedSchedule from './FixedSchedule';
import NewSchedule from './NewSchedule';
import axios from 'axios';

class TravelerSchedule extends React.Component{
    
    constructor(props){
        super(props);
        this.state = {
            tnum: this.props.match.params.tnum,
            fixed: [],
            new: [],
            fixedSchedule: [],
            newSchedule: []
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
        data.append("gnum", this.state.gnum);

        //예약 대기중인 스케줄 가져오기 
        axios.post(
            "http://localhost:9000/guide/schedule/new",
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
                        <h3> No new schedules </h3>
                    ]
                })
            }
        }).catch((err)=>{
            console.log("예약 대기중인 스케줄 가져오기 실패");
        });

        
    }



    componentDidMount(){
        this.getFixedSchedule();
        this.getNewSchedule();
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
            </div>
        );
    }
}

export default TravelerSchedule;
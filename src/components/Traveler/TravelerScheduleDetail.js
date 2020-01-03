import React from 'react';
import axios from 'axios';
import ScheduleDetailAtt from '../Util/ScheduleDetailAtt';
import ScheduleDetailAct from '../Util/ScheduleDetailAct';
import ScheduleDetailRes from '../Util/ScheduleDetailRes';

export default class TravelerScheduleDetail extends React.Component{

    constructor(props){
        super(props);
        this.state={
            schedule: [],
            startdate: "",
            enddate: "",
            attraction: [],
            activity: [],
            restaurant: [],
            att: [],
            act: [],
            res: [],
            traveler: ""
        };
    }

    getDetail = () => {
        let url = "http://localhost:9000/guide/schedule/detail";
        let data = new FormData();
        data.append("gnum", this.props.match.params.gnum);
        data.append("tnum", this.props.match.params.tnum);

        axios.post(
            url,
            data
        ).then((res)=>{
            this.setState({
                schedule: res.data,
                startdate: res.data[0].startdate,
                enddate: res.data[0].enddate
            });
            
            //att, act, res 개별 정보 가져오기 
            this.state.schedule.map((schedule)=>{
                let data = new FormData();
                data.append("num", schedule.pks);
                
                if(schedule.type===1){
                    axios.post(
                        "http://localhost:9000/spot/data",
                        data
                    ).then((res)=>{
                        this.setState({
                            attraction: [res.data]
                        });

                        this.state.attraction.map((att, idx)=>{
                            this.setState({
                                att: [
                                    ...this.state.att,
                                    <ScheduleDetailAtt att={att} idx={this.state.att.length+1} key={att.num}/>
                                ]
                            })
                        });
                    }).catch((err)=>{
                        console.log("spot data 가져오기 실패");
                    });
                } else if(schedule.type===2){
                    axios.post(
                        "http://localhost:9000/activity/data",
                        data
                    ).then((res)=>{
                        this.setState({
                            activity: [res.data]
                        });

                        this.state.activity.map((act, idx)=>{
                            this.setState({
                                act: [
                                    ...this.state.act,
                                    <ScheduleDetailAct act={act} idx={this.state.act.length+1} key={act.num}/>
                                ]
                            });
                        });
                    }).catch((err)=>{
                        console.log("act data 가져오기 실패");
                    });
                } else if(schedule.type===3){
                    axios.post(
                        "http://localhost:9000/restaurant/data",
                        data
                    ).then((res)=>{
                        this.setState({
                            restaurant: [res.data]
                        });

                        this.state.restaurant.map((res, idx)=>{
                            this.setState({
                                res: [
                                    ...this.state.res,
                                    <ScheduleDetailRes res={res} idx={this.state.res.length+1} key={res.num}/>
                                ]
                            })
                        });
                        
                    }).catch((err)=>{
                        console.log("res data 가져오기 실패");
                    });
                }
            });

        }).catch((err)=>{
            console.log("스케줄 세부정보 가져오기 실패");
        });

        let url2 = "http://localhost:9000/traveler/select"
        let data2 = new FormData();
        data2.append("num", this.props.match.params.tnum);

        axios.post(url2, data2).then((res)=>{
            this.setState({
                traveler: res.data
            });
            console.log(res.data);
        }).catch((err)=>{
            console.log("traveler 정보 가져오기 실패");
        })
    }

    componentDidMount(){
        this.getDetail();
    }

    render(){
        return(
            <div className="super">
                <div className="info_super">
                    <div>
                    <h3 className="schedule_super">
                        <b className="schedule_title">Duration:</b> 
                        &nbsp;<b className="schedule_info">{this.state.startdate}</b>
                        &nbsp;to  
                        &nbsp;<b className="schedule_info">{this.state.enddate}</b>
                    </h3>
                    <b className="schedule_info2">
                    {this.state.att.length} attractions,  
                    {this.state.act.length} activities,
                    {this.state.res.length} restaurants in total
                    with {this.state.traveler.name}
                    </b>
                    </div>
                    <div class="schedule_detail_img">
                        <img src={`http://localhost:9000/image/${this.state.traveler.img}`} 
                            alt="traveler_portrait" />
                    </div>
                </div>
                <hr className="schedule_detail_hr"/>
                <div className="detail_super_div">
                    {this.state.att}
                    {this.state.act}
                    {this.state.res}
                </div>
            </div>
        );
    }
}
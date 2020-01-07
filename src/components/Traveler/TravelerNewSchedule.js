import React from 'react';
import axios from 'axios';

export default class NewSchedule extends React.Component{

    constructor(props){
        super(props);
        this.state={
            guide: {},
            att: 0,
            act: 0,
            res: 0
        }
        
    }

    getGuide = () => {
        let url = "http://localhost:9000/guide/select";
        let data = new FormData();
        data.append("num", this.props.schedule[0].gnum);
        axios.post(url, data).then((res)=>{
            this.setState({
                guide: res.data
            });
        });
    }

    count= () => {
        this.props.schedule.map((item)=>{
            if(item.type===1){
                this.setState(prev=>{
                    return{
                        att: prev.att+1
                    }
                });
            }else if(item.type===2){
                this.setState(prev=>{
                    return{
                        act: prev.act+1
                    }
                });
            }else if(item.type===3){
                this.setState(prev=>{
                    return{
                        res: prev.res+1
                    }
                });
            }
        })
    }

    handleChat=()=>{
        this.props.history.push(`/chat/${this.props.schedule[0].gnum}/${this.props.schedule[0].tnum}`);
    }

    handleDetail=()=>{
        this.props.history.push(`/traveler/schedule/detail/${this.props.schedule[0].gnum}/${this.props.schedule[0].tnum}/${this.props.info}`);
    }

    componentDidMount(){
        this.getGuide();
        this.count();
        
    }

    render(){
        return(
            <div className="schedule_traveler_info">
                <div className="container">
                    <img src={`http://localhost:9000/image/${this.state.guide.img}`} 
                         className="schedule_traveler_pic" alt="travelerProfilePic" />
                    <p className="title">{this.state.guide.name}</p>
                    <p className="info">
                        <b>{this.state.att}</b> attractions<br/>
                        <b>{this.state.act}</b> activities<br/>
                        <b>{this.state.res}</b> restaurants<br/>
                        Start: {this.props.schedule[0].startdate}<br/>
                        End: {this.props.schedule[0].enddate}
                    </p>
                    <div className="overlay"></div>
                    <div className="button1" onClick={this.handleDetail}><p> Detail </p></div>
                    <div className="button2" onClick={this.handleChat}><p> Chat </p></div>
                </div>
            </div>
        );
    }
}
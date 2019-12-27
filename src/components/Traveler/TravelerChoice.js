import React from 'react';
import axios from 'axios';
import AttractionResult from './AttractionResult';
import ActivityResult from './ActivityResult';
import RestaurantResult from './RestaurantResult';
import Calendar from '../Util/Calendar';
import {connect} from 'react-redux';
import store from '../../store/store';


class TravelerChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: "",
            restaurant: "",
            spot: "",
            travelerChoice: [],
            // 나중에 tnum과 gnum은 dynamic하게 받아와야 하는 것임. 여기서는 일부러 입력해놓음.
            tnum: this.props.match.params.tnum,
            gnum: this.props.match.params.gnum,
            startdate: this.props.calendars.startdate,
            enddate: this.props.calendars.enddate,
            image: null,
            guide: ""
        }
    }

    getGuide = async() => {
        let url5 = "http://localhost:9000/guide/select";
        let data = new FormData();
        data.append("num", this.state.gnum)
        await axios.post(url5, data).then((res)=>{
            console.log(res.data);
            this.setState({
                guide: res.data
            });

            //Byte array 이미지를 이미지로 바꾸는 것.
            let url4 = "http://localhost:9000/image/"+this.state.guide.img;
            axios
                .get(
                    url4,
                    { responseType: 'arraybuffer' },
                )
                .then(response => {
                    const base64 = btoa(
                        new Uint8Array(response.data).reduce(
                            (data, byte) => data + String.fromCharCode(byte),
                            '',
                        ),
                    );
                    this.setState({ image: "data:;base64," + base64 });
                });
        });
    }

    componentWillMount = () => {

        let url1 = "http://localhost:9000/traveler/choice/activity?gnum=" + this.state.gnum;
        axios.get(url1).then((responseData) => {
            this.setState({
                activity: responseData.data
            });
        

        }).catch((error) => {
            console.log("**Traveler choice activity get 오류**");
        });

        let url2 = "http://localhost:9000/traveler/choice/restaurant?gnum=" + this.state.gnum;
        axios.get(url2).then((responseData) => {
            this.setState({
                restaurant: responseData.data
            })
        }).catch((error) => {
            console.log("**Traveler choice restaurant get 오류**");
        });

        let url3 = "http://localhost:9000/traveler/choice/spot?gnum=" + this.state.gnum;
        axios.get(url3).then((responseData) => {
            this.setState({
                spot: responseData.data
            })
        }).catch((error) => {
            console.log("**Traveler choice spot get 오류**");
        });

        this.getGuide();

    }

    handleSubmit = () =>{

        //calendar에 insert
        axios.post(
            "http://localhost:9000/calendar/insert", 
            store.getState().calendars).then((responseData) => {
            console.log('calendar insert success');
        }).catch((error) => {
            console.log('calendar insert fail');
        });
        console.log(this.props.calendars);
        //att,act,res의 result에서 저장한 schedules의 내용을 db 저장하는 axios
        axios.post(
            "http://localhost:9000/traveler/choice", 
            store.getState().schedules).then((responseData) => {
            console.log('schedule insert success');
        }).catch((error) => {
            console.log('schedule insert fail');
        });
       
        this.props.history.push("/traveler/profile");

    }

    render() {

        let attraction = [];
        let activity = [];
        let restaurant = [];

        for(let i=0; i<this.state.spot.length; i++){
            attraction.push(<AttractionResult att={this.state.spot[i]}
                                              gnum={this.state.gnum}
                                              tnum={this.state.tnum}
                                              idx={[i+1]}
                                              key={i}/>)
        }
        for(let i=0; i<this.state.activity.length; i++){
            activity.push(<ActivityResult act={this.state.activity[i]}
                                          gnum={this.state.gnum}
                                          tnum={this.state.tnum}
                                          idx={[i+1]}
                                          key={i}/>)
        }
        for(let i=0; i<this.state.restaurant.length; i++){
            restaurant.push(<RestaurantResult res={this.state.restaurant[i]}
                                              gnum={this.state.gnum}
                                              tnum={this.state.tnum}
                                              idx={[i+1]}
                                              key={i}/>)
        }

        return (
            <div className="super">
                <div className="tChoice_super">
                    <div className="gPic_div">
                    <img src={this.state.image} className="tChoice_gPic" alt="guideProfilePic" />
                    </div>
                    <h2 className="tChoice_title"> 
                        가이드 {this.state.guide.name}의 목록 중 하고싶은 것을 선택해주세요 
                    </h2>
                </div>
                <hr/>
                <p className="cal_desc"> 일정을 선택해 주세요. 가능한 날짜를 모두 선택해 주시면 예약 성공에 도움이 됩니다.</p>
                <div className="calendar_div">
                    <Calendar gnum={this.state.gnum} tnum={this.state.tnum}/>
                </div>
                <hr/>
                <div className="form_div">{attraction}</div>
                <hr/>
                <div className="form_div">{activity}</div>
                <hr/>
                <div className="form_div">{restaurant}</div>
                <hr/>
                <button type="submit" className="tChoice_btn" onClick={this.handleSubmit}>
                    가이드에게 문의하기
                </button>
            </div>
        );
    }
}



//store의 state를 props로 저장 
let mapStateToProps = (state) => {
    return {
        calendars: state.calendars,
        schedules: state.schedules
    };
}

//store에 정의 된 state를 쓰기 위한 connect
TravelerChoice= connect(mapStateToProps)(TravelerChoice);

export default TravelerChoice;
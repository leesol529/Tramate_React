import React from 'react';
import Axios from 'axios';
import check1 from '../../img/checked.svg';
import uncheck1 from '../../img/unchecked.svg';
import chat1 from '../../img/chat.png';
import calendar from '../../img/calendar.png';
import spot from '../../img/spot.png';
import {Link} from 'react-router-dom';


export default class TravlerProfile extends React.Component{
            
    constructor(props){
       super(props);
       this.state={
            travelerData:'',
            travelerRateData:''
       };
   }

   Tdata=()=>{
        //spring 에서 json 결과 나오는 url
        var url="http://192.168.0.89:9000/traveler/select";
        let data = new FormData();
        data.append("num", this.props.tnum);

        Axios.post(url, data).then((responseData)=>{
            //spring 서버로부터 받은 데이터로 guestData 수정
            this.setState({
                travelerData:responseData.data
            })
            console.log(this.state.travelerData);
        }).catch((error)=>{
            console.log("traveler 데이터 오류");
        })
   }

    /* TravelerRate 별 댓글 갯수 가져오는 메소드 */
    TRate=()=>{
        var url="http://192.168.0.89:9000/travelerrate/select";
        let TRatedata = new FormData();
        TRatedata.append("tnum",this.props.tnum);
        Axios.post(url, TRatedata).then((responseData)=>{
            this.setState({
                travelerRateData:responseData.data
            })
            console.log(this.state.travelerRateData);
        }).catch((error)=>{
            console.log("** TravelerRate 별 댓글 갯수 가져오기 오류");
        })
    }


   componentWillMount(){
       this.Tdata();
       this.TRate();
   }


   
    render(){
        const img=this.state.travelerData.img;
        const email=this.state.travelerData.email;
        const mobile=this.state.travelerData.mobile;
        const user=localStorage.getItem("user");
        const schedule=<Link to={`/traveler/schedule/${localStorage.getItem('tnum')}`} className="goSchedule">스케줄 보러가기</Link>;
        const noschedule=null;
        const travelerschedule=user?schedule:noschedule;



        return(
            <div className="boss-guideprofile">
                <div className="main-photo">
                    <img src={`http://192.168.0.89:9000/image/${img}`} className="guide-profile-image" alt=""/>
                </div>
                {/* 세로줄 */}
                <div className="vertical-line1">
                </div>

                <div className="wrap1">
                    <div className="wrap1-count-review">
                        <img src={chat1} className="chat1" alt=""/>
                        <p className="review-count">
                             <a href="#TravelerProfile-TravelerRate" className="ahref-Profile"> 후기 {this.state.travelerRateData}개</a>
                        </p>
                    </div>

                    {/* 여행자 스케줄 확인할 수 있는 메뉴 */}
                    <div className="wrap1-guideSchedule">
                        <img src={calendar} className="calendar" alt=""/>
                        {travelerschedule}
                    </div>

                    {/* 관광 장소 확인하기
                    <div className="wrap1-guidePlace">
                        <img src={spot} className="check-boss-place" alt=""/>
                        <p className="guidePlace">
                        
                        </p>
                    </div> */}

                    <div className="wrap1-checked-af">
                        <img src={check1} className="check-boss" alt=""/>
                        <p className="authentification">
                             인증 완료
                        </p>
                    </div>
                </div>
                {/* 세로줄 */}
                <div className="vertical-line2">
                </div>
                <div className="af-info">
                    <h4 className="af-info2"> {this.state.travelerData.name}님의 인증 내역</h4>
                    <ul>
                    <li className="profile-flexbox">{img ? <img src={check1} className="check" alt=""/>:<img src={uncheck1} className="uncheck" alt=""/>}&nbsp;<div className="sellca-profile">셀카</div></li>
                        <li className="profile-flexbox">{email ? <img src={check1} className="check" alt=""/>:<img src={uncheck1} className="uncheck" alt=""/>}&nbsp;<div className="email-profile">이메일</div></li>
                        <li className="profile-flexbox">{mobile ? <img src={check1} className="check" alt=""/>:<img src={uncheck1} className="uncheck" alt=""/>}&nbsp;<div className="addr-profile">전화번호</div></li>
                    </ul>
                </div>
            </div>
         )
        }
    }
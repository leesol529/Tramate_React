import React from 'react';
import axios from 'axios';
import host1 from '../../img/host1.jpg';
import check1 from '../../img/checked.svg'
import uncheck1 from '../../img/unchecked.svg';
import chat from '../../img/chat.png';
import calendar from '../../img/calendar.png';
import {Link} from 'react-router-dom';

export default class Profile extends React.Component{
   
    constructor(props){
       super(props);
       this.state={
           //spring 에서 게시판 목록을 받아서 저장할 변수
           guideData: '',
           
       };
   }



   //목록 가져올 메소드
   data=()=>{
       //spring에서 json파일 결과물 나오는 url
       var url="http://localhost:9000/guide/select?num="+localStorage.getItem('gnum');//spring 주소가 9000임. 9000에서 가져오라는 의미.

       axios.get(url).then((responseData)=>{
           //spring 서버로부터 받은 데이터로 guestData 수정
           this.setState({
               guideData: responseData.data
            })
            console.log(this.state.guideData);
    
        }).catch((error)=>{
            console.log("**guide data 오류**");
        });
   }

   componentWillMount(){
       this.data();
   }
   
   
    render(){
        const img=this.state.guideData.img;
        const email=this.state.guideData.email;
        const mobile=this.state.guideData.mobile;
        const user=localStorage.getItem("user");
        const goSchedule1 = <Link to={`/guide/schedule/${localStorage.getItem('gnum')}`} className="goSchedule">스케쥴 보러가기</Link>;
        const noSchedule=null;
        const guideSchedule=user?goSchedule1:noSchedule;

        return(
            <div className="boss-guideprofile">
                <div className="main-photo">
                    <img src={host1} className="guide-profile-image" alt=""/>
                </div>
                {/* 세로줄 */}
                <div className="vertical-line1">
                </div>

                <div className="wrap1">
                    <div className="wrap1-count-review">
                        <img src={chat} className="chat" alt=""/>
                        <p className="review-count">
                           <a href="#abc" className="ahref-Profile">후기 (  )개</a> 
                        </p>
                    </div>

                     {/* 가이드 스케줄 확인할 수 있는 메뉴 */}
                    <div className="wrap1-guideSchedule">
                        <img src={calendar} className="calendar" alt=""/>
                        {guideSchedule}
                    </div>

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
                    <h4 className="af-info2"> {this.state.guideData.name}님의 인증 내역</h4>
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
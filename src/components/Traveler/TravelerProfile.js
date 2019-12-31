import React from 'react';
import Axios from 'axios';
import host2 from '../../img/host2.jpg';
import check1 from '../../img/checked.svg';
import uncheck1 from '../../img/unchecked.svg';
import chat1 from '../../img/chat.png';


export default class TravlerProfile extends React.Component{
            
    constructor(props){
       super(props);
       this.state={
            travelerData:''
       };
   }

   data=()=>{
        //spring 에서 json 결과 나오는 url
        var url="http://localhost:9000/traveler/select";
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

   componentWillMount(){
       this.data();
   }


   
    render(){
        const img=this.state.travelerData.img;
        const email=this.state.travelerData.email;
        const mobile=this.state.travelerData.mobile;


        return(
            <div className="boss-guideprofile">
                <div className="main-photo">
                    <img src={host2} className="guide-profile-image" alt=""/>
                </div>
                {/* 세로줄 */}
                <div className="vertical-line1">
                </div>

                <div className="wrap1">
                    <div className="wrap1-count-review">
                        <img src={chat1} className="chat1" alt=""/>
                        <p className="review-count">
                           <a href="#TravelerProfile-TravelerRate" className="ahref-Profile"> 후기 (  )개</a>
                        </p>
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
import React from 'react';
import Axios from 'axios';
import host2 from '../../img/host2.jpg';
import review2 from '../../img/review.png';
import check1 from '../../img/checked.svg';
// import uncheck1 from '../../img/unchecked.svg';


export default class TravlerProfile extends React.Component{
            
    constructor(props){
       super(props);
       this.state={
            travelerData:''
       };
   }

   data=()=>{
        //spring 에서 json 결과 나오는 url
        var url="http://localhost:9000/controller/traveler/select?num=2";

        Axios.get(url).then((responseData)=>{
            //spring 서버로부터 받은 데이터로 guestData 수정
            this.setState({
                travelerData:responseData.data
            })
            console.log(this.state.travelerData)
        }).catch((error)=>{
            console.log("traveler 데이터 오류")
        })
   }

   componentWillMount(){
       this.data();
   }


   
    render(){

        return(
            <div className="boss-traveler">
                <div className="traveler-main-photo">
                    <img src={host2} className="traveler-profile-image" alt=""/>
                </div>
                {/* 세로줄 */}
                <div className="vertical-line1-traveler">
                </div>

                <div className="wrap1-traveler">
                    <div className="wrap1-count-review-traveler">
                        <img src={review2} className="review-traveler" alt=""/>
                        <p className="review-count-traveler">
                            
                            후기 (  )개
                        </p>
                    </div>
                    
                    <div className="wrap1-checked-af-traveler">
                        <img src={check1} className="check-boss-traveler" alt=""/>
                        <p className="authentification-traveler">
                             인증 완료
                        </p>
                    </div>
                </div>
                {/* 세로줄 */}
                <div className="vertical-line2-traveler">
                </div>
                <div className="af-info-traveler">
                    <h4 className="af-info2-traveler"> {this.state.travelerData.name}님의 인증 내역</h4>
                    <ul>
                        <li className="profile-flexbox-traveler">셀카</li>
                        <li className="profile-flexbox-traveler">이메일</li>
                        <li className="profile-flexbox-traveler">전화번호</li>
                    </ul>
                </div>
            </div>
         )
        }
    }
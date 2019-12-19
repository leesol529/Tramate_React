import React from 'react';
import Axios from 'axios';

export default class TravlerIntroduce extends React.Component{
        state={
            showMenu:false, 
            detail:false
        }
        
        toggleMenu=()=>{
            this.setState({
                showMenu:!this.state.showMenu,
                detail:!this.state.detail
            })
        }
    
        constructor(props){
            super(props);
            this.state={
                //spring 에서 데이터를 받아와서 저장할 변수
                travelerData:''
            };
        }

        data=()=>{
            //spring에서 json 결과물 나오는 url
            var url="http://localhost:9000/traveler/select?num=1";

            Axios.get(url).then((responseData)=>{
                //spring 서버로부터 받은 데이터를 travelerData로 수정
                this.setState({
                    travelerData:responseData.data
                })
                console.log(this.state.travelerData)
            }).catch((error)=>{
                console.log("traveler Data 오류")
            })
        }

        componentWillMount(){
            this.data();
        }

        render(){  
            const shorten = <p className="introduce-traveler toggle-traveler">{this.state.travelerData.content}</p>;
            const full = <p className="toggle-traveler">{this.state.travelerData.content}</p>;
            const menuVis1=this.state.showMenu?full:shorten;
            const detail='자세히 보기';
            const back='원래대로';
            const detailBack=this.state.detail?back:detail;
            
    
            return(
                <div className="boss2-traveler">
        <h1>안녕하세요 저는 입니다.</h1>
                    {menuVis1}
                    <div onClick={this.toggleMenu} className="detailBack-traveler">{detailBack}</div>
                    <hr></hr>
                    <div className="intro-ul-traveler">
                        <ul>
                            <li>가이드 장소 : </li>
                        </ul>
                    </div>
                </div>
                
            )
        }
    }
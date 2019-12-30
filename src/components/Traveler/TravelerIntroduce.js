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
            var url="http://localhost:9000/controller/traveler/select?num=2";

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
            const shorten = <p className="introduce toggle">{this.state.travelerData.content}</p>;
            const full = <p className="toggle">{this.state.travelerData.content}</p>;
            const menuVis=this.state.showMenu?full:shorten;
            const detail='자세히 보기';
            const back='원래대로';
            const detailBack=this.state.detail?back:detail;
            // const notExist=<div maxLength>{this.state.travelerData.content}</div>

            return(
                <div className="boss2">
                    <h1 className="h1-Introduce">안녕하세요 저는 {this.state.travelerData.name}입니다.</h1>
                    <div className="doubleQuestionMark">“</div>
                    {menuVis}
                    <div onClick={this.toggleMenu} className="detailBack">{detailBack}</div>
                    <hr className="line-Introduce"></hr>
                </div>
                
            )
        }
    }
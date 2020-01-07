import React from 'react';
import Axios from 'axios';

export default class TravlerIntroduce extends React.Component{
        state={
            showMenu:false, 
            detail:false,
            travelerRateData:''
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

        Tdata=()=>{
            //spring에서 json 결과물 나오는 url
            var url="http://192.168.0.89:9000/traveler/select";
            let data = new FormData();
            data.append("num", this.props.tnum);

            Axios.post(url, data).then((responseData)=>{
                //spring 서버로부터 받은 데이터를 travelerData로 수정
                this.setState({
                    travelerData:responseData.data
                })
                console.log(this.state.travelerData)
            }).catch((error)=>{
                console.log("traveler Data 오류")
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
            const shorten = <p className="introduce toggle">{this.state.travelerData.content}</p>;
            const full = <p className="toggle">{this.state.travelerData.content}</p>;
            const menuVis=this.state.showMenu?full:shorten;
            const detail=<p className="detail-introduce">자세히 보기</p>;
            const back=<p className="back-Introduce">원래대로</p>;
            const detailBack=this.state.detail?back:detail;
            const length=(String(this.state.travelerData.content).length);
            const detailBack2=length<='267'?detailBack===null:detailBack;

            return(
                <div className="boss2">
                    <h1 className="h1-Introduce">안녕하세요 저는 {this.state.travelerData.name}입니다.</h1>
                    <div className="doubleQuestionMark">“</div>
                    {menuVis}
                    <div onClick={this.toggleMenu} className="detailBack">{detailBack2}</div>
                    <hr className="line-Introduce"></hr>
                    <br/>
                    <h3 className="h3-travelerIntroduce">후기 {this.state.travelerRateData}개</h3>
                </div>
                
            )
        }
    }
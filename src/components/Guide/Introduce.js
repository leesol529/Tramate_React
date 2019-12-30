import React from 'react';
import Axios from 'axios';

export default class Introduce extends React.Component{
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
            //spring에서 목록을 받아서 저장할 변수
            guideData:''
        };
    }

    data=()=>{
        //spring 에서 josn 결과물 나오는 url
        var url="http://localhost:9000/guide/select";//spring 주소가 9000임. 9000에서 가져오라는 의미.
        let data = new FormData();
        data.append("num", this.props.gnum);
        Axios.post(url, data).then((responseData)=>{
            //spring 서버로부터 받은 데이터로 guestData 수정
            this.setState({
                guideData:responseData.data
            })
            console.log(this.state.guideData)
        }).catch((error)=>{
            console.log("guide data 오류")
        })
    }


    componentWillMount(){
        this.data();
    }
    
    render(){  
        const shorten = <p className="introduce toggle">{this.state.guideData.content}</p>;
        const full = <p className="toggle">{this.state.guideData.content}</p>;
        const menuVis1=this.state.showMenu?full:shorten;
        const detail=<p className="detail-introduce">자세히 보기</p>;
        const back=<p className="back-Introduce">원래대로</p>;
        const detailBack=this.state.detail?back:detail;
        const length=(String(this.state.guideData.content).length);
        const detailBack2=length<='267'?detailBack===null:detailBack;
        





        return(
            <div className="boss2">
                <h1 className="h1-Introduce">안녕하세요 저는 {this.state.guideData.name}입니다.</h1>
                <div className="doubleQuestionMark">“</div>
                {menuVis1}

                <div onClick={this.toggleMenu} className="detailBack">{detailBack2}</div>
                <hr className="line-Introduce"></hr>
                <div className="intro-ul">
                    <ul className="ul-Introduce">
                        <li>가이드 장소 : {this.state.guideData.spot}</li>
                    </ul>
                </div>
            </div>
            
        )
    }
}
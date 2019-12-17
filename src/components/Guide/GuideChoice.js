import React from 'react';
import minus from '../../img/minus.png';
import plus from '../../img/plus.png';
import AttractionForm from './AttractionForm';
import ActivityForm from './ActivityForm';
import RestaurantForm from './RestaurantForm';
import axios from 'axios';


export default class GuideChoice extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            attractionNum: 0,
            activityNum: 0,
            restaurantNum: 0,
            attractionInfo: [],
            activityInfo: [],
            restaurantInfo: []
        }
        
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onImageUpload=(e)=>{
        //톰캣 서버에 이미지 업로드하기 
		const uploadFile = e.target.files[0];
        const img = e.target.files[0].name;
        console.log(uploadFile);
        console.log(img);

        //state의 img 변경, img: img 같을 때 생략 가능 
        this.setState({
            img
        });

        //아래의 data을 받는 쪽에서 multipart로 받음
        let data = new FormData();
        data.append("uploadFile", uploadFile);
		
        axios({
            method: "post",
            url: "http://localhost:9000/guide/choice/attraction_img",
            data: data,
			headers: {"Content-Type": "multipart/form-data"}
        }).then((responseData)=>{
            console.log(responseData.data);
        }).catch((error)=>{
            console.log("이미지 업로드 중 오류");
        });
    }

    onSubmit=(e)=>{
		e.preventDefault();
        
        //id에 해당하는 gnum 가져오기 
        const gnumurl = "http://localhost:9000/guide/choice/gnum";
        const myid = localStorage.getItem("loginok");
        let gnum;
        axios.post(gnumurl, {myid: myid}).then((res)=>{
            gnum = res.data;
        }).then((err)=>{
            console.log("gnum 가져오기 실패");
        });
        

		//db에 traveler 가입정보 저장 
        var url = "http://localhost:9000/guide/choice/attraction_form";
        axios.post(url, {
			name: this.state.name,
            img: this.state.img,
            content: this.state.content,
            gnum: gnum
		}).then((responseData)=>{
			console.log("attraction form insert success");
			
			this.setState({
				name: "",
                img: "",
                content: "",
                gnum: this.state.gnum
			});

			document.getElementById("choiceFrm").reset();

        }).catch((error)=>{
            console.log("attraction form insert fail");
		});
    }

    render(){
        //state내의 num만큼 Form 출력되도록 for문 작성 후 아래 div에서 출력 
        let attraction = [];
        let activity = [];
        let restaurant = [];
        for(let i=0; i<this.state.attractionNum; i++){
            attraction.push(<AttractionForm key={i}
                                            onKeyChange={this.onKeyChange}
                                            onImageUpload={this.onImageUpload}/>)
        }
        for(let i=0; i<this.state.activityNum; i++){
            activity.push(<ActivityForm key={i+100}
                                        onKeyChange={this.onKeyChange}
                                        onImageUpload={this.onImageUpload}/>)
        }
        for(let i=0; i<this.state.restaurantNum; i++){
            restaurant.push(<RestaurantForm key={i+200}
                                            onKeyChange={this.onKeyChange}
                                            onImageUpload={this.onImageUpload}/>)
        }


        //폼이 1개 이상일 때만 submit 버튼 출력
        let btn;
        if(this.state.attractionNum>=1||this.state.activityNum>=1||this.state.restaurantNum>=1){
            
        }

        return(
            <div className="super">
                <form>
                    <table className="gchoice_table">
                        <thead>
                            <tr>
                                <th colSpan="2"> Add guide options </th>
                            </tr>
                            <tr>
                                <td colSpan="2"> <hr/> </td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <th> Attractions </th>
                                <td>
                                    <div className="gchoice_flexbox">
                                        <img src={minus} alt="minus"
                                            onClick={()=>{
                                                if(this.state.attractionNum>0){
                                                    this.setState({
                                                        attractionNum: this.state.attractionNum-1
                                                    });
                                                }
                                            }}/>
                                        &nbsp;&nbsp;&nbsp;
                                        {this.state.attractionNum}
                                        &nbsp;&nbsp;&nbsp;
                                        <img src={plus} alt="plus"
                                            onClick={()=>{
                                                this.setState({
                                                    attractionNum: this.state.attractionNum+1
                                                });
                                            }}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th> Activity </th>
                                <td>
                                    <div className="gchoice_flexbox">
                                        <img src={minus} alt="minus"
                                            onClick={()=>{
                                                if(this.state.activityNum>0){
                                                this.setState({
                                                    activityNum: this.state.activityNum-1
                                                    });
                                                }
                                            }}/>
                                        &nbsp;&nbsp;&nbsp;
                                        {this.state.activityNum}
                                        &nbsp;&nbsp;&nbsp;
                                        <img src={plus} alt="plus"
                                            onClick={()=>{
                                                this.setState({
                                                    activityNum: this.state.activityNum+1
                                                });
                                            }}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <th> Restaurant </th>
                                <td>
                                    <div className="gchoice_flexbox">
                                        <img src={minus} alt="minus"
                                            onClick={()=>{
                                                if(this.state.restaurantNum>0){
                                                this.setState({
                                                    restaurantNum: this.state.restaurantNum-1
                                                    });
                                                }
                                            }}/>
                                        &nbsp;&nbsp;&nbsp;
                                        {this.state.restaurantNum}
                                        &nbsp;&nbsp;&nbsp;
                                        <img src={plus} alt="plus"
                                            onClick={()=>{
                                                this.setState({
                                                    restaurantNum: this.state.restaurantNum+1
                                                });
                                            }}/>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td colSpan="2"> <hr/> </td>
                            </tr>
                        </tbody>
                    </table>
                    {/* form 출력 위치 */}
                    <div className="form_div">{attraction}</div>
                    <div className="form_div">{activity}</div>
                    <div className="form_div">{restaurant}</div>
                    <div className="gchoice_submit_btn"></div>
                </form>
            </div>
        );
    }
}
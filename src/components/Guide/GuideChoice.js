import React from 'react';
import minus from '../../img/minus.png';
import plus from '../../img/plus.png';
import AttractionForm from './AttractionForm';
import ActivityForm from './ActivityForm';
import RestaurantForm from './RestaurantForm';
import store from '../../store/store';
import axios from 'axios';

export default class GuideChoice extends React.Component{
    
    constructor(props){
        super(props);
        this.state={
            attractionNum: 0,
            activityNum: 0,
            restaurantNum: 0
        }
        
        //this.onImageUpload = this.onImageUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit=(e)=>{
		e.preventDefault();

        axios.post(
            "http://localhost:9000/guide/choice/attraction_input", 
            store.getState().attractions).then((responseData) => {
            console.log('attraction insert 성공');
        }).catch((error) => {
            console.log('attraction insert 실패');
        });

        axios.post(
            "http://localhost:9000/guide/choice/activity_input", 
            store.getState().activities).then((responseData) => {
            console.log('activity insert 성공');
        }).catch((error) => {
            console.log('activity insert 실패');
        });

        axios.post(
            "http://localhost:9000/guide/choice/restaurant_input", 
            store.getState().restaurants).then((responseData) => {
            console.log('restaurant insert 성공');
        }).catch((error) => {
            console.log('restaurant insert 실패');
        });
    }

    handleInput=(e)=>{
        this.setState({
            [e.target.name]: e.target.value.concat
        })
    }

    render(){
        //state내의 num만큼 Form 출력되도록 for문 작성 후 아래 div에서 출력 
        let attraction = [];
        let activity = [];
        let restaurant = [];
        for(let i=0; i<this.state.attractionNum; i++){
            attraction.push(<AttractionForm key={i}
                                            onKeyChange={this.onKeyChange}/>)
        }
        for(let i=0; i<this.state.activityNum; i++){
            activity.push(<ActivityForm key={i+100}
                                        onKeyChange={this.onKeyChange}/>)
        }
        for(let i=0; i<this.state.restaurantNum; i++){
            restaurant.push(<RestaurantForm key={i+200}
                                            onKeyChange={this.onKeyChange}/>)
        }


        //폼이 1개 이상일 때만 submit 버튼 출력
        let btn;
        if(this.state.attractionNum>=1||this.state.activityNum>=1||this.state.restaurantNum>=1){
            btn = <button type="submit" className="gchoice_submit_btn"> Submit </button>
        }

        return(
            <div className="super">
                <form onSubmit={this.onSubmit}>
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
                    <div className="btn_div">{btn}</div>
                </form>
            </div>
        );
    }
}
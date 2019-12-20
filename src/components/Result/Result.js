import React from 'react';
import axios from 'axios';
import store from '../../store/store';
import { r_addAttraction, r_addActivity, r_addRestaurant, r_addGuide } from '../../actions/action';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spot: this.props.match.params.spot,
            guides: '',
            imgSource: '',
            imgSource2: [],
            lookAround: ['Host', 'Attraction', 'Activity', 'Restaurant']
        }
    }

    handleButtonClick = () => {
        console.log(store.getState());
    }

    handleProps = () => {
        console.log(this.state.spot);
    }

    forDidMount = () => {

        //Formdata 만들기
        var data = new FormData();
        data.append('spot', this.state.spot);

        //spot에 관련한 가이드 5명을 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/guideRandomRelatedSpot",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((guide) => {
                store.dispatch(r_addGuide(guide));
            })
        }).catch((error) => {
            console.log(error);
        });

        //spot에 관련한 관광명소 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/spotRandomRelatedSpot",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((attraction) => {
                store.dispatch(r_addAttraction(attraction));
            })
        }).catch((error) => {
            console.log(error);
        });

        //spot에 관련한 Activity 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/activityRandomRelatedSpot",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((activity) => {
                store.dispatch(r_addActivity(activity));
            })
        }).catch((error) => {
            console.log(error);
        });

        //spot에 관련한 Restaurant 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/restaurantRandomRelatedSpot",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((restaurant) => {
                store.dispatch(r_addRestaurant(restaurant));
            })
        }).catch((error) => {
            console.log(error);
        });

    }

    handleState = () => {
        console.log(this.state);
    }

    handleAxios = () => {
        this.forDidMount();
    }
    render() {
        return (
            <div className="container_90">
                <button onClick={this.handleButtonClick}>현재 store 정보 보기</button>
                <button onClick={this.handleProps}>Props확인</button>
                <button onClick={this.handleState}>state 정보 확인하기</button>
                <button onClick={this.handleAxios}>axios에서 정보 얻어오기</button>
            </div>
        );
    }
}
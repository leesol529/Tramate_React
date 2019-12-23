import React from 'react';
import axios from 'axios';
import ActivityResult from '../Traveler/ActivityResult';
import AttractionResult from '../Traveler/AttractionResult';
import RestaurantResult from '../Traveler/RestaurantResult';
import ResultHost from '../Result/ResultHost';

export default class Continent extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            continent: '',
            guide: [],
            attraction: [],
            activity: [],
            restaurant: []
        }
    }
    checkState = () => {
        console.log(this.state);
    }
    componentWillMount = () => {
        //Formdata 만들기
        var data = new FormData();
        data.append('continent', 'europe');

        //spot에 관련한 가이드 5명을 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/guide/randomlist/continent",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((guide) => {
                this.setState({
                    guide: this.state.guide.concat(guide)
                })
            });
        }).catch((error) => {
            console.log(error);
        });


        //spot에 관련한 관광명소 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/attraction/randomlist/continent",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((attraction) => {
                this.setState({
                    attraction: this.state.attraction.concat(attraction)
                })
            })
        }).catch((error) => {
            console.log("spot 데이터 실패");
        });


        //spot에 관련한 Activity 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/activity/randomlist/continent",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((activity) => {
                this.setState({
                    activity: this.state.activity.concat(activity)
                })
            })
        }).catch((error) => {
            console.log(error);
        });

        //spot에 관련한 Restaurant 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://localhost:9000/restaurant/randomlist/continent",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((restaurant) => {
                this.setState({
                    restaurant: this.state.restaurant.concat(restaurant)
                })
            })
        }).catch((error) => {
            console.log(error);
        });

    }
    render() {
        return (
            <div className="container_90">
                <div className="result_flexbox">
                    {this.state.guide.map((guide) => {
                        return <ResultHost key={guide.num} guide={guide} />
                    })}
                </div>
                <div className="result_flexbox">
                    {this.state.attraction.map((att) => {
                        return <AttractionResult key={att.num} att={att} />
                    })}
                </div>
                <div className="result_flexbox">
                    {this.state.activity.map((act) => {
                        return <ActivityResult key={act.num} act={act} />
                    })}
                </div>
                <div className="result_flexbox">
                    {this.state.restaurant.map((res) => {
                        return <RestaurantResult key={res.num} res={res} />
                    })}
                </div>
            </div>
        );
    }
}
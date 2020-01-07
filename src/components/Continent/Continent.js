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
            continent: this.props.match.params.continent,
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
        data.append('continent', this.state.continent);

        //spot에 관련한 가이드 5명을 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://192.168.0.89:9000/guide/randomlist/continent",
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
            url: "http://192.168.0.89:9000/attraction/randomlist/continent",
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
            url: "http://192.168.0.89:9000/activity/randomlist/continent",
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
            url: "http://192.168.0.89:9000/restaurant/randomlist/continent",
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
                <br />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.continent}” &nbsp;</span>최고의 가이드와 함께하세요</h3>
                <p className="result_introduce">경험이 많은 현지 가이드가 당신의 여행과 함께합니다.</p>
                <div className="result_flexbox">
                    {this.state.guide.map((guide) => {
                        return <ResultHost key={guide.num} guide={guide} />
                    })}
                </div>
                <hr className="hr_margin" />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.continent}” &nbsp;</span>숨은 관광명소를 찾아보세요</h3>
                <p className="result_introduce">유명한 광광지는 물론 현지 가이드만 아는 숨은 관광명소도 즐겨보아요. </p>
                <div className="result_flexbox">
                    {this.state.attraction.map((att) => {
                        return <AttractionResult key={att.num} att={att} />
                    })}
                </div>
                <hr className="hr_margin" />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.continent}” &nbsp;</span>색다른 액티비티를 즐겨보세요</h3>
                <p className="result_introduce">각 여행지 특성에 맞는 액티비티를 소개해드립니다. 색다른 체험을 해보는건 어떠신가요?</p>
                <div className="result_flexbox">
                    {this.state.activity.map((act) => {
                        return <ActivityResult key={act.num} act={act} />
                    })}
                </div>
                <hr className="hr_margin" />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.continent}” &nbsp;</span>현지 음식과 함께 하는 여행</h3>
                <p className="result_introduce">금강산도 식후경이라고 했나요? 맛있는 현지 음식을 경험해보세요. 분명 맛있을 겁니다.</p>
                <div className="result_flexbox">
                    {this.state.restaurant.map((res) => {
                        return <RestaurantResult key={res.num} res={res} />
                    })}
                </div>
            </div >
        );
    }
}
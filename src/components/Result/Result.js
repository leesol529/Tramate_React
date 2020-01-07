import React from 'react';
import axios from 'axios';
import { r_addAttraction, r_addActivity, r_addRestaurant, r_addGuide } from '../../actions/action';
import { connect } from 'react-redux';
import ResultHost from './ResultHost';
import AttractionResult from '../Traveler/AttractionResult';
import RestraurantResult from '../Traveler/RestaurantResult';
import ActivityResult from '../Traveler/ActivityResult';

class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            spot: this.props.match.params.spot,
            guide: [],
            attraction: [],
            activity: [],
            restaurant: []
        }
    }



    forDidMount = () => {

        //Formdata 만들기
        var data = new FormData();
        data.append('spot', this.state.spot);

        //spot에 관련한 가이드 5명을 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://192.168.0.89:9000/guideRandomRelatedSpot/",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((guide) => {
                this.setState({
                    guide: this.state.guide.concat(guide)
                })
                this.props.onUpdateGuide(guide);
            });

        }).catch((error) => {
            console.log(error);
        });


        //spot에 관련한 관광명소 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://192.168.0.89:9000/spotRandomRelatedSpot/",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((attraction) => {
                this.setState({
                    attraction: this.state.attraction.concat(attraction)
                })
            })
        }).catch((error) => {
            console.log(error);
        });


        //spot에 관련한 Activity 5개 랜덤으로 불러오기
        axios({
            method: "post",
            url: "http://192.168.0.89:9000/activityRandomRelatedSpot/",
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
            url: "http://192.168.0.89:9000/restaurantRandomRelatedSpot/",
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


    myGetState = () => {

    }

    componentWillMount = () => {
        this.forDidMount();
    }
    render() {
        return (
            <div className="container_90">
                <br />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.spot}” &nbsp;</span>최고의 가이드와 함께하세요</h3>
                <p className="result_introduce">경험이 많은 현지 가이드가 당신의 여행과 함께합니다.</p>
                <div className="result_flexbox">
                    {this.state.guide.map((guide, idx) => (
                        <ResultHost key={idx + 1} guide={guide} />
                    ))}
                </div>
                <hr className="hr_margin" />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.spot}” &nbsp;</span>숨은 관광명소를 찾아보세요</h3>
                <p className="result_introduce">유명한 광광지는 물론 현지 가이드만 아는 숨은 관광명소도 즐겨보아요. </p>
                <div className="result_flexbox">
                    {this.state.attraction.map((att, idx) => (
                        <AttractionResult key={idx + 1} idx={idx + 1} att={att} />
                    ))}
                </div>
                <hr className="hr_margin" />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.spot}” &nbsp;</span>색다른 액티비티를 즐겨보세요</h3>
                <p className="result_introduce">각 여행지 특성에 맞는 액티비티를 소개해드립니다. 색다른 체험을 해보는건 어떠신가요?</p>
                <div className="result_flexbox">
                    {this.state.activity.map((act, idx) => (
                        <ActivityResult key={idx + 1} idx={idx + 1} act={act} />
                    ))}
                </div>
                <hr className="hr_margin" />
                <h3 className="result_header"><span className="result_span">“{this.props.match.params.spot}” &nbsp;</span>현지 음식과 함께 하는 여행</h3>
                <p className="result_introduce">금강산도 식후경이라고 했나요? 맛있는 현지 음식을 경험해보세요. 분명 맛있을 겁니다.</p>
                <div className="result_flexbox">
                    {this.state.restaurant.map((res, idx) => (
                        <RestraurantResult key={idx + 1} idx={idx + 1} res={res} />
                    ))}
                </div>
                <hr className="hr_margin" />
            </div>
        );
    }
}


//store의 r_guides를 this.props.r_guides에 저장 
let mapStateToProps = (state) => {
    return {
        r_guides: state.r_guides
    };
}

//store의 정보를 변경할 때(action을 호출 할 때) 사용
//this.props.onUpdateGuide(객체) 형태로 호출 
let mapDispatchToProps = (dispatch) => {
    return {
        onUpdateGuide: (a) => dispatch(r_addGuide(a)),
        onUpdateAttraction: (a) => dispatch(r_addAttraction(a)),
        onUpdateActivity: (a) => dispatch(r_addActivity(a)),
        onUpdateRestaurant: (a) => dispatch(r_addRestaurant(a))
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Result); 
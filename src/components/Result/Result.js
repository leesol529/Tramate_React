import React from 'react';
import axios from 'axios';
import { r_addAttraction, r_addActivity, r_addRestaurant, r_addGuide } from '../../actions/action';
import { connect } from 'react-redux';
import ResultActivity from './ResultActivity';
import ResultHost from './ResultHost';
import ResultAttraction from './ResultAttraction';

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
            url: "http://localhost:9000/guideRandomRelatedSpot",
            data: data
        }).then((responseData) => {
            responseData.data.forEach((guide) => {
                this.setState({
                    guide: this.state.guide.concat(guide)
                })
                this.props.onUpdateGuide(r_addGuide(guide));
            });

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
            url: "http://localhost:9000/activityRandomRelatedSpot",
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
            url: "http://localhost:9000/restaurantRandomRelatedSpot",
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
                <p>최고의 호스트들과 함께 해보세요.</p>
                <div className="result_flexbox">
                    {this.state.guide.map((guide) => (
                        <ResultHost key={guide.name} guide={guide} />
                    ))}
                </div>
                <p>최고의 관광명소에 가보세요.</p>
                <div className="result_flexbox">
                </div>
                <ResultAttraction />
            </div>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        r_guides: state.r_guides
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        onUpdateGuide: (a) => dispatch(r_addGuide(a)),
        onUpdateAttraction: (a) => dispatch(r_addAttraction(a)),
        onUpdateActivity: (a) => dispatch(r_addActivity(a)),
        onUpdateRestaurant: (a) => dispatch(r_addRestaurant(a))
    };
}

Result = connect(mapStateToProps, mapDispatchToProps)(Result);

export default Result;
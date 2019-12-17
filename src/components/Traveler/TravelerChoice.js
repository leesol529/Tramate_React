import React from 'react';
import Spot from '../Result/Spot';

export default class TravelerChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activityNum: [],
            restaurantNum: [],
            attractionNum: [],
            travelerChoice: [],
            tnum: '',
            gnum: ''
        }
    }
    componentWillMount = () => {

    }
    render() {
        return (
            <div>
                가이드 jinsoo의 목록 중 하고싶은 것을 선택해주세요.


            </div>
        );
    }
}
import React from 'react';
import Spot from '../Result/Spot';
import axios from 'axios';

export default class TravelerChoice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activity: null,
            restaurant: null,
            spot: null,
            travelerChoice: [],
            // 나중에 tnum과 gnum은 dynamic하게 받아와야 하는 것임. 여기서는 일부러 입력해놓음.
            tnum: 1,
            gnum: 19,
            image: null
        }
    }
    componentWillMount = () => {

        let url1 = "http://localhost:9000/traveler/choice/activity?gnum=" + this.state.gnum;
        axios.get(url1).then((responseData) => {
            this.setState({
                activity: responseData.data
            });


        }).catch((error) => {
            console.log("**Traveler choice activity get 오류**");
        });

        let url2 = "http://localhost:9000/traveler/choice/restaurant?gnum=" + this.state.gnum;
        axios.get(url2).then((responseData) => {
            this.setState({
                restaurant: responseData.data
            })
        }).catch((error) => {
            console.log("**Traveler choice restaurant get 오류**");
        });

        let url3 = "http://localhost:9000/traveler/choice/spot?gnum=" + this.state.gnum;
        axios.get(url3).then((responseData) => {
            this.setState({
                spot: responseData.data
            })
        }).catch((error) => {
            console.log("**Traveler choice spot get 오류**");
        });

        //Byte array 이미지를 이미지로 바꾸는 것.
        const url4 = "http://localhost:9000/image";
        axios
            .get(
                url4,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ image: "data:;base64," + base64 });
            });


    }
    render() {
        return (
            <div>
                가이드 jinsoo의 목록 중 하고싶은 것을 선택해주세요.
                <img src={this.state.image} style={{ width: '100px' }} alt="jinsoo" />
            </div>
        );
    }
}
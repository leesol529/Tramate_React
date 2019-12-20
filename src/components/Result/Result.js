import React from 'react';
import axios from 'axios';

export default class Result extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guides: '',
            imgSource: '',
            imgSource2: []
        }
    }

    forDidMount = () => {
        var data = new FormData();
        data.append("spot", '다낭');

        axios({
            method: "post",
            url: "http://localhost:9000/guide/related/spot",
            data: data
        }).then((responseData) => {

            //guideNums에다가 guide의 pk값을 배열로 넣어주는 과정
            this.setState({
                guides: responseData.data,
                imgSource: responseData.data.map((guide) => {
                    return guide.img
                })
            });
            console.log(this.state.guides);
            console.log(this.state.imgSource);

            for (let i = 0; i < this.state.guides.length; i++) {
                axios
                    .get(
                        'http://localhost:9000/image/' + this.state.imgSource[i],
                        { responseType: 'arraybuffer' },
                    )
                    .then(response => {
                        const base64 = btoa(
                            new Uint8Array(response.data).reduce(
                                (data, byte) => data + String.fromCharCode(byte),
                                '',
                            ),
                        );
                        this.setState({ imgSource2: this.state.imgSource2.concat("data:;base64," + base64) });
                    });
            }
        }).catch((error) => {
            console.log(error);
        });

    }

    componentDidMount() {
        this.forDidMount();
    }
    render() {
        return (
            <div>

            </div>
        );
    }
}
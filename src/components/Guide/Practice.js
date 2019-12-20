import React from 'react';
import axios from 'axios';


export default class Practice extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: 'jinsoo',
            java: 100
        }
    }
    handleData = () => {

        const data1 = {
            name: 'jinsoo',
            java: 100
        };

        const data2 = {
            name: 'jinsoo',
            java: 100
        };

        let myarr = [];
        myarr.push(data1);
        myarr.push(data2);

        axios.post('http://localhost:9000/practicelist', myarr).then((responseData) => {
            console.log('성공');
        }).catch((error) => {
            console.log('실패');
        });

    }
    render() {
        return (
            <div>
                <button onClick={this.handleData}>서버로 데이터 보내기</button>
            </div>
        );
    }
}
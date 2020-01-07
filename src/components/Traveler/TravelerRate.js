import React from 'react';
import StarRate from '../Util/StarRate';
import axios from 'axios';
import TravelerRateList from './TravelerRateList';
import { Button } from '@material-ui/core';

export default class TravelerRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gnum: this.props.gnum,
            tnum: this.props.tnum,
            tname: '',
            rating: 0,
            rate: 0,
            content: '',
            replyList: []

        }
    }

    //input의 내용이 바뀔떄마다 state의 값이 자동으로 변하는 함수
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    // 별을 클릭하면 자동으로 rating읇 변하게 하는 함수
    onStarClick = (nextValue, prevValue, name) => {
        this.setState({ rating: nextValue });
    }

    handleOnSubmit = (e) => {

        if (this.state.gnum == undefined) {
            alert('Guide로 로그인 한 후에 댓글을 달아주세요');
        } else {

            axios.post('http://localhost:9000/traveler/rate', {
                gnum: this.state.gnum,
                tnum: this.state.tnum,
                rate: this.state.rating,
                content: this.state.content
            }).then((responseData) => {
                console.log('성공');
            }).catch((error) => {
                console.log('실패');
            });
        }

    }

    componentDidMount = () => {

        var data = new FormData();
        data.append('tnum', this.state.tnum);

        axios({
            method: "post",
            url: "http://localhost:9000/reply/to/traveler",
            data: data
        }).then((responseData) => {
            this.setState({
                replyList: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });

        let data1 = new FormData();
        data1.append('num', this.state.tnum);

        axios({
            method: "post",
            url: "http://localhost:9000/traveler/select",
            data: data1
        }).then((responseData) => {
            this.setState({
                tname: responseData.data.name
            })
        }).catch((error) => {
            console.log("tnum의 이름을 가져오지 못했다");
        });
    }

    render() {
        return (
            <div className="boss2" id="TravelerProfile-TravelerRate">
                <div className="guide_rate_flexbox">
                    <p>{this.state.tname}님은 어땠나요?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <StarRate onStarClick={this.onStarClick} />
                </div>
                <div>
                    <form className="guide_rate_flexbox" onSubmit={this.handleOnSubmit}>
                        <textarea onChange={this.handleOnChange} name="content" className="guide_rate_textarea" style={{ width: '90%' }}>

                        </textarea>
                        <Button variant="contained" color="secondary" type="submit" style={{ width: '10%', height: '10rem', marginLeft: '5rem' }}>
                            후기 남기기
                        </Button>
                    </form>
                </div>
                <div>
                    {this.state.replyList.map((reply) => (
                        <TravelerRateList key={reply.num} reply={reply} />
                    ))}
                </div>
            </div>
        );
    }
}
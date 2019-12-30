import React from 'react';
import StarRate from '../Util/StarRate';
import axios from 'axios';
import GuideRateList from './GuideRateList';
import { Button } from '@material-ui/core';
export default class GuideRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            // gnum: this.props.match.params.gnum,
            // tnum: this.props.match.params.tnum,
            gnum: this.props.gnum,
            tnum: this.props.tnum,
            gname: '',
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

        axios.post('http://localhost:9000/guide/rate', {
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

    componentDidMount = () => {

        var data = new FormData();
        data.append('gnum', this.state.gnum);

        axios({
            method: "post",
            url: "http://localhost:9000/reply/to/guide",
            data: data
        }).then((responseData) => {
            this.setState({
                replyList: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });

        let data1 = new FormData();
        data1.append('num', this.state.gnum);

        axios({
            method: "post",
            url: "http://localhost:9000/guide/select",
            data: data1
        }).then((responseData) => {
            this.setState({
                gname: responseData.data.name
            })
        }).catch((error) => {
            console.log("gnum의 이름을 가져오지 못했다");
        });
    }


    render() {
        return (
            <div className="container_90">
                <div className="guide_rate_flexbox">
                    <p>{this.state.gname}님 가이드는 어땠나요?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <StarRate onStarClick={this.onStarClick} />
                </div>
                <div>
                    <form className="guide_rate_flexbox" onSubmit={this.handleOnSubmit}>
                        <textarea onChange={this.handleOnChange} name="content" className="guide_rate_textarea">

                        </textarea>
                        <Button variant="contained" color="secondary" type="submit">
                            후기 남기기
                        </Button>
                    </form>
                </div>
                {this.state.replyList.map((reply) => (
                    <GuideRateList key={reply.num} reply={reply} />
                ))}

            </div>
        );
    }
}
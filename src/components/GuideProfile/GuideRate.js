import React from 'react';
import StarRate from './StarRate';
import axios from 'axios';

export default class GuideRate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gnum: 1,
            tnum: 1,
            content: '',
            rating: 1

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

    //버튼 클릭시 서버로 보내는 메소드
    handleOnSubmit = () => {
        axios.post('http://localhost:9000/guide/rate', {
            gnum: this.state.gnum,
            tnum: this.state.tnum,
            rating: this.state.rating,
            content: this.state.content
        }).then((Response) => {

        }).catch(ex => {

        })
    }
    render() {
        return (
            <div>
                <div className="guide_rate_flexbox">
                    <p>jinsoo님 가이드는 어땠나요?&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</p>
                    <StarRate onStarClick={this.onStarClick} />
                </div>
                <div>
                    <form className="guide_rate_flexbox" onSubmit={this.handleOnSubmit}>
                        <textarea onChange={this.handleOnChange} name="content">

                        </textarea>
                        <button type="submit">댓글 남기기</button>
                    </form>
                </div>
            </div>
        );
    }
}
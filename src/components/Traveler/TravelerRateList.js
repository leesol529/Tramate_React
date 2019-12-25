import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import Image from '../Guide/Image';
export default class TravelerRateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            guide: ''
        }
    }
    componentDidMount = () => {

        let data = new FormData();
        data.append('num', this.props.reply.gnum);

        axios({
            method: "post",
            url: "http://localhost:9000/guide/select",
            data: data
        }).then((responseData) => {
            this.setState({
                guide: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });
    }
    render() {
        return (
            <div>
                <div className="guide_rate_flexbox">
                    <Image img={this.state.guide.img} />
                    <StarRatingComponent
                        name="rate2"
                        editing={false}
                        renderStarIcon={() => <span>★</span>}
                        starCount={5}
                        value={this.props.reply.rate}
                    />
                </div>
                <br />
                이름 : {this.state.guide.name}
                평가 : {this.props.reply.content}


            </div>
        );
    }
}
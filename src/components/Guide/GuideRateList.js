import React from 'react';
import StarRatingComponent from 'react-star-rating-component';
import axios from 'axios';
import Image from './Image';

export default class GuideRateList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            traveler: ''
        }
    }
    componentDidMount = () => {

        let data = new FormData();
        data.append('num', this.props.reply.tnum);

        axios({
            method: "post",
            url: "http://localhost:9000/traveler/select",
            data: data
        }).then((responseData) => {
            this.setState({
                traveler: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });
    }
    render() {
        return (
            <div className="guide_rate">
                <div className="guide_rate_flexbox">
                    <Image img={this.state.traveler.img} />
                    <div className="guide_rate_name">{this.state.traveler.name}</div>
                    <StarRatingComponent
                        name="rate2"
                        editing={false}
                        renderStarIcon={() => <span>★</span>}
                        starCount={5}
                        value={this.props.reply.rate}
                    />
                </div>
                {this.props.reply.content}
                <hr />
            </div>
        );
    }
}
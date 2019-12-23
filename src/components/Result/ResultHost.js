import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class ResultHost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
    }
    handleTravelerChoice = () => {
        this.props.history.push(`/traveler/choice/${this.props.guide.num}`);
    }
    componentWillMount = () => {
        axios
            .get(
                'http://localhost:9000/image/' + this.props.guide.img,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ img: "data:;base64," + base64 });
            });


    }
    render() {
        return (
            <div className="result_component">
                <div>
                    <div className="thumbnail-wrapper">
                        <div className="thumbnail">
                            <img onClick={this.handleTravelerChoice} src={this.state.img} alt="" />
                        </div>
                    </div>
                    <div className="result_textalign_center">
                        {this.props.guide.name}
                    </div>

                    <br />
                    지역: {this.props.guide.spot}<br />
                    {this.props.guide.content}

                </div>
            </div>
        );
    }
}

export default withRouter(ResultHost);
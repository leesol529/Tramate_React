import React from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom'

class ResultHost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: '',
            tnum: 0
        }
    }
    handleTravelerChoice = () => {
        this.props.history.push(`/traveler/choice/${this.props.guide.num}/${this.state.tnum}`);
    }
    componentWillMount = () => {
        axios
            .get(
                'http://192.168.0.89:9000/image/' + this.props.guide.img,
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

        var data = new FormData();
        data.append("id", localStorage.getItem('loginok'));

        axios({
            method: "post",
            url: "http://192.168.0.89:9000/traveler/getNumById",
            data: data
        }).then((responseData) => {
            this.setState({
                tnum: responseData.data
            })
        }).catch((error) => {
            console.log(error);
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
                        <br />
                        {this.props.guide.name}<br />
                        <button type="button" className="go_to_profile" onClick={() => {
                            this.props.history.push(`/guide/profile/${this.props.guide.num}/${this.state.tnum}`);
                        }} >프로필 보러가기</button>
                    </div>

                    <br />
                    지역: {this.props.guide.spot}
                    <div className="result_host_introduce">{this.props.guide.content}</div>
                </div>
            </div>
        );
    }
}

export default withRouter(ResultHost);
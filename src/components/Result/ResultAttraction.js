import React from 'react';
import { connect } from 'react-redux';

class ResultAttraction extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
    }
    checkProps = () => {
        console.log(this.props);
    }
    componentWillMount = () => {
        // axios
        //     .get(
        //         'http://localhost:9000/image/' + this.props.attraction.img,
        //         { responseType: 'arraybuffer' },
        //     )
        //     .then(response => {
        //         const base64 = btoa(
        //             new Uint8Array(response.data).reduce(
        //                 (data, byte) => data + String.fromCharCode(byte),
        //                 '',
        //             ),
        //         );
        //         this.setState({ img: "data:;base64," + base64 });
        //     });
    }
    render() {
        return (
            <div className="result_component">
                <div className="result_textalign_center">
                    <button onClick={this.checkProps}>Props확인</button>
                </div>
            </div>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        r_attractions: state
    };
}

ResultAttraction = connect(mapStateToProps)(ResultAttraction);

export default ResultAttraction;
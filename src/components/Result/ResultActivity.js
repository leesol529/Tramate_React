import React from 'react';
import axios from 'axios';

export default class ResultActivity extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: ''
        }
    }
    componentDidMount = () => {
        axios
            .get(
                'http://localhost:9000/image/' + this.props.activity.img,
                { responseType: 'arraybuffer' },
            )
            .then(response => {
                const base64 = btoa(
                    new Uint8Array(response.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        '',
                    ),
                );
                this.setState({ image: "data:;base64," + base64 });
            });
    }

    render() {
        return (
            <div>
                a
            </div>
        );
    }
}
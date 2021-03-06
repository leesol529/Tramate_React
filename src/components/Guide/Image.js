import React from 'react';
import { Avatar } from '@material-ui/core';
export default class Image extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            img: ''
        }
    }

    render() {
        return (
            <Avatar src={`http://192.168.0.89:9000/image/${this.props.img}`} />
        );
    }
}
import React from 'react';

export default class Room extends React.Component {
    render() {
        return (
            <div className="room_component">
                <div className="room_image" style={{ backgroundImage: `url(${this.props.img})`, backgroundSize: 'cover' }}>

                </div>
                <p className="font-small center">{this.props.title}</p>
                <p className="font-small center">{this.props.subtitle}</p>
            </div>
        );
    }
}
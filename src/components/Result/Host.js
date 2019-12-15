import React from 'react';

export default class Host extends React.Component {
    render() {
        return (
            <div className="host_component">
                <div className="host_image" style={{ backgroundImage: `url(${this.props.img})`, backgroundSize: 'cover' }}>

                </div>
                <p className="font-small center">{this.props.title}</p>
                <p className="font-small center">{this.props.subtitle}</p>
            </div>
        );
    }
}
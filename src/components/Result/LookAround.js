import React from 'react'
import Africa from '../../img/africa.jpg';

export default class LookAround extends React.Component {
    render() {
        return (
            <div className="flexbox">
                <div className="lookaround_image" style={{ backgroundImage: `url(${this.props.img})` }}>

                </div>
                <h4 className="title">
                    {this.props.title}
                </h4>
            </div>
        );
    }
}
import React from 'react';
import {NavLink} from 'react-router-dom';

export default class MainContent extends React.Component{
    render(){
        return(
            <div className="maincontent_wrap">
                <NavLink exact to={`/${this.props.to}`} className="link">
                    <div style={{backgroundImage: `url(${this.props.src})`}}
                        className="img_wrap">
                        <div className="c_names">
                            <h1>{this.props.country}</h1>
                        </div>
                    </div>
                </NavLink>
            </div>
        );
    }
}
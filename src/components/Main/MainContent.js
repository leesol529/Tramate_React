import React from 'react';

export default class MainContent extends React.Component{
    render(){
        return(
            <div className="maincontent_wrap">
                <div style={{backgroundImage: `url(${this.props.src})`}}
                     className="img_wrap">
                    <div className="c_names">
                        <h1>{this.props.country}</h1>
                    </div>
                </div>
            </div>
        );
    }
}
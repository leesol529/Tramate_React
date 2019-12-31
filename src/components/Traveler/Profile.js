import React from 'react';
import TravelerProfile from './TravelerProfile';
import TravelerIntroduce from './TravelerIntroduce';
import TravelerRate from './TravelerRate';

export default class Profile extends React.Component{
    render(){
        return(
            <div>
                <TravelerProfile  gnum={this.props.match.params.gnum} tnum={this.props.match.params.tnum}/>
                <TravelerIntroduce  gnum={this.props.match.params.gnum} tnum={this.props.match.params.tnum}/>
                <TravelerRate gnum={this.props.match.params.gnum} tnum={this.props.match.params.tnum}/>
            </div>
        )
    }
}
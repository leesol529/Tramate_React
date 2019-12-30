import React from 'react';
import Profile from './Profile';
import Introduce from './Introduce';
import Accommodation from './Accommodation';
import GuideRate from './GuideRate';

export default class GuideProfile extends React.Component {
    render() {
        return (
            <div>
                <Profile gnum={this.props.match.params.gnum} tnum={this.props.match.params.tnum}/>
                <Introduce gnum={this.props.match.params.gnum} tnum={this.props.match.params.tnum}/>
                <Accommodation />
                <GuideRate gnum={this.props.match.params.gnum} tnum={this.props.match.params.tnum} />
            </div>
        );
    }
}
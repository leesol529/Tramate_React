import React from 'react';
import TravelerProfile from './TravelerProfile';
import TravelerIntroduce from './TravelerIntroduce';

export default class Profile extends React.Component{
    render(){
        return(
            <div>
                <TravelerProfile/>
                <TravelerIntroduce/>
            </div>
        )
    }
}
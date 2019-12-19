import React from 'react';
import Profile from './Profile';
import Introduce from './Introduce';
import Accommodation from './Accommodation';
import Review from './Review';

export default class GuideProfile extends React.Component{
    render(){
        return(
            <div>
                <Profile/>
                <Introduce/>
                <Accommodation/>
                <Review/>
            </div>
        );
    }
}
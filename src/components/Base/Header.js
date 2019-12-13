import React from 'react';
import logo from './logo.jpg';
import ReactSearchBox from 'react-search-box'

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <img src={logo} alt="logo" className="logo"/>
                <ReactSearchBox placeholder="어디로 떠나고 싶으신가요?"
                                className="search_bar"/>
            </div>
        );
    }
}
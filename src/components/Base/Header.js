import React from 'react';
import logo from './logo.jpg';
import './Header.css';
import SearchField from 'react-search-field';

export default class Header extends React.Component{
    render(){
        return(
            <div>
                <logo className="logo"/>
                <SearchField placeholder="어디로 떠나고 싶으신가요?"/>
            </div>
        );
    }
}
import React from 'react';
import logo from './logo.jpg';
import ReactSearchBox from 'react-search-box'

export default class Header extends React.Component{
    render(){
        return(
            <div className="header">
                <div className="header_left">
                    <img src={logo} alt="logo" className="logo"/>
                    <ReactSearchBox placeholder="어디로 떠나고 싶으신가요?"
                                className="search_bar"/>
                </div>
                <div className="header_right">
                    <ul className="header_list">
                        <li> 가이드가 되어보세요 </li>
                        <li> 회원가입 </li>
                        <li> 로그인 </li>
                    </ul>
                </div>
            </div>
        );
    }
}
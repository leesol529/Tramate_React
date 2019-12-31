import React from 'react';
import logo from './logo.jpg';
import ReactSearchBox from 'react-search-box';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount = () => {
        axios.get('http://localhost:9000/spot/distinct').then((response) => {
            this.setState({
                data: response.data.map((data) => {
                    return {
                        key: data,
                        value: data
                    }
                })
            })
        })
    }

    handleLogoClick = () => {
        this.props.history.push('/')
    }

    handleOnClick = () => {
        localStorage.removeItem('user');
        localStorage.removeItem('loginok');
        this.props.history.push('/');
    }

    render() {
        //let loginok = localStorage.getItem('loginok');
        let user = localStorage.getItem("user");
        //console.log(loginok);
        console.log(user);
        return (
            <div className="header">
                <div className="header_left">
                    <img src={logo} alt="logo" className="logo"
                        onClick={this.handleLogoClick} />
                    <ReactSearchBox placeholder="어디로 떠나고 싶으신가요?"
                        className="search_bar" data={this.state.data} ref="searchbox" onSelect={(record) => {
                            this.props.history.replace(`/result/${record.value}`);
                        }} />
                </div>
                <div className="header_right">
                    <ul>
                        {
                            user === "guide" ?
                                <div className="header_list">
                                    <li><Link to="/guide/profile" className="header_link"> My Profile as Guide </Link></li>
                                    <li onClick={this.handleOnClick}>
                                        Logout
                                </li>
                                </div>
                                : user === "traveler" ?
                                    <div className="header_list">
                                        <li><Link to="/traveler/profile" className="header_link"> 나의 여행자 프로필 보기 </Link></li>
                                        <li onClick={this.handleOnClick}>
                                            로그아웃
                                </li>
                                    </div>
                                    :
                                    <div className="header_list">
                                        <li><Link to="/guide/join" className="header_link">가이드가 되어보세요</Link></li>
                                        <li><Link to="/traveler/join" className="header_link">여행자가 되어보세요</Link></li>
                                        <li><Link to="/login" className="header_link">로그인</Link></li>
                                    </div>
                        }
                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
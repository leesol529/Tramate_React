import React from 'react';
import logo from './logo.jpg';
import ReactSearchBox from 'react-search-box';
import { Link, withRouter } from 'react-router-dom';

class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loginok: ''
        }
    }
    handleOnClick = () => {
        localStorage.setItem("loginok", null);
        this.props.history.push('/login');
    }
    componentWillMount = () => {
        this.setState({
            loginok: localStorage.getItem('loginok')
        })
    }
    render() {
        return (
            <div className="header">
                <div className="header_left">
                    <img src={logo} alt="logo" className="logo" />
                    <ReactSearchBox placeholder="어디로 떠나고 싶으신가요?"
                        className="search_bar" />
                </div>
                <div className="header_right">
                    <ul className="header_list">
                        {
                            this.state.loginok == '' ?
                                <div>
                                    <li><Link to="/guide/join" className="header_link">가이드가 되어보세요</Link></li>
                                    <li ><Link to="/traveler/join" className="header_link">여행자가 되어보세요</Link></li>
                                    <li ><Link to="/login" className="header_link">로그인</Link></li>
                                </div>
                                :
                                <div><button onClick={this.handleOnClick}>로그아웃</button></div>
                        }


                    </ul>
                </div>
            </div>
        );
    }
}

export default withRouter(Header);
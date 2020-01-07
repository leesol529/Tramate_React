import React from 'react';
import logo from './logo.jpg';
import ReactSearchBox from 'react-search-box';
import { Link, withRouter } from 'react-router-dom';
import axios from 'axios';
import Modal from 'react-modal'

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        heigth: '40%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            data: [],
            id: '',
            pass: '',
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }



    closeModal() {
        var data = new FormData();
        data.append("id", this.state.id);
        data.append("pass", this.state.pass);

        axios({
            method: "post",
            url: "http://localhost:9000/user/login",
            data: data
        }).then((responseData) => {
            if (responseData.data === 1) {
                alert("login as Guide");
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/guide/choice/gnum',
                    data: data
                }).then((res) => {
                    localStorage.setItem("gnum", res.data);
                }).catch((err) => {
                    console.log("gnum 가져오기 실패");
                })
                localStorage.setItem("loginok", this.state.id);
                localStorage.setItem("user", "guide");
                this.props.history.push("/");
            } else if (responseData.data === 2) {
                alert("traveler로 로그인");
                axios({
                    method: 'post',
                    url: 'http://localhost:9000/traveler/getNumById',
                    data: data
                }).then((res) => {
                    localStorage.setItem("tnum", res.data);
                    console.log(localStorage.getItem("tnum"));
                }).catch((err) => {
                    console.log("tnum 가져오기 실패");
                })
                localStorage.setItem("loginok", this.state.id);
                localStorage.setItem("user", "traveler");
                this.props.history.push("/");
            }
            else {
                alert("아이디와 비밀번호가 맞지 않습니다.");
                this.setState({
                    id: '',
                    pass: ''
                })
            }
        }).catch((error) => {
            console.log("로그인 실패");
        });
        this.setState({ modalIsOpen: false });
    }

    handleOnChange = (e) => {

        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

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
                                    <li><Link to={`/guide/profile/${localStorage.getItem('gnum')}`} className="header_link"> My Profile as Guide </Link></li>
                                    <li onClick={this.handleOnClick}>
                                        Logout
                                </li>
                                </div>
                                : user === "traveler" ?
                                    <div className="header_list">
                                        <li><Link to={`/traveler/profile/${localStorage.getItem('tnum')}`} className="header_link"> 나의 여행자 프로필 보기 </Link></li>
                                        <li onClick={this.handleOnClick}>
                                            로그아웃
                                </li>
                                    </div>
                                    :
                                    <div className="header_list">
                                        <li><Link to="/guide/join" className="header_link">가이드가 되어보세요</Link></li>
                                        <li><Link to="/traveler/join" className="header_link">여행자가 되어보세요</Link></li>
                                        {/* <li ><Link to="/login" className="header_link">로그인</Link></li> */}
                                        <li onClick={this.openModal} >로그인</li>

                                    </div>
                        }
                    </ul>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    onRequestClose={this.closeModal}
                    style={customStyles}
                    contentLabel="Example Modal">
                    <div className="wrapper">
                        <div className="main">
                            <p className="sign" align="center">Sign in</p>
                            <form className="form1">
                                <input className="un " type="text" align="center" placeholder="Username" type="text" name="id" onChange={this.handleOnChange} />
                                <input className="pass" type="password" align="center" placeholder="Password" type="password" name="pass" onChange={this.handleOnChange} />
                                <a className="submit" align="center" onClick={this.closeModal}>Sign in</a>
                                <p className="forgot" align="center"><a href="#">Forgot Password?</a></p>
                            </form>


                        </div>
                    </div>



                </Modal>
            </div>

        );
    }
}

export default withRouter(Header);
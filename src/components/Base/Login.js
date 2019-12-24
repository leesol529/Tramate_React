import React from 'react';
import axios from 'axios';

export default class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pass: ''
        }
    }
    handleOnSubmit = (e) => {

        e.preventDefault();
        var url = "http://localhost:9000/user/login";
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
                localStorage.setItem("loginok", this.state.id);
                localStorage.setItem("user", "guide");
                this.props.history.push("/");
            } else if (responseData.data === 2){
                alert("traveler로 로그인");
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

        // axios.post(url, data).then((responseData) => {
        //     if (responseData.data === 1) {
        //         alert("login as Guide");
        //         localStorage.setItem("loginok", this.state.id);
        //         localStorage.setItem("user", "guide");
        //         this.props.history.push("/");
        //     } else if (responseData.data === 2){
        //         alert("traveler로 로그인");
        //         localStorage.setItem("loginok", this.state.id);
        //         localStorage.setItem("user", "traveler");
        //         this.props.history.push("/");
        //     } 
        //     else {
        //         alert("아이디와 비밀번호가 맞지 않습니다.");
        //         this.setState({
        //             id: '',
        //             pass: ''
        //         })
        //     }
        // }).catch((error) => {
        //     console.log("로그인 실패");
        // });

    }
    
    handleOnChange = (e) => {

        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        });

    }
    render() {
        return (
            <div>
                <form onSubmit={this.handleOnSubmit}>
                    <table>
                        <tbody>
                            <tr>
                                <th>아이디:</th>
                                <td><input type="text" name="id" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>비밀번호:</th>
                                <td><input type="password" name="pass" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button type="submit">로그인하기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
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
        var url = "http://localhost:9000/user/login?id=" + this.state.id + "&pass=" + this.state.pass;
        axios.get(url).then((responseData) => {
            if (responseData.data == 1) {
                alert("로그인 성공");
                localStorage.setItem("loginok", "id");
                this.props.history.push("/");
            } else {
                alert("아이디와 비밀번호가 맞지 않습니다.");
                this.setState({
                    id: '',
                    pass: ''
                })
            }
        }).catch((error) => {
            console.log("**board list 오류**");
        });

    }
    handleOnChange = (e) => {

        e.preventDefault();
        this.setState({
            [e.target.name]: e.target.value
        })
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
import React from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

export default class GuideInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            pass: '',
            name: '',
            nat: '',
            continent: '',
            spot: '',
            mobile: '',
            email: '',
            addr: '',
            content: '',
            img: '',
            fare: 0,
            pictures: []
        }
        this.onDrop = this.onDrop.bind(this);
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleOnSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/guide/inputdata', {
            id: this.state.id,
            pass: this.state.pass,
            name: this.state.name,
            continent: this.state.continent,
            nat: this.state.nat,
            spot: this.state.spot,
            mobile: this.state.mobile,
            email: this.state.email,
            addr: this.state.addr,
            content: this.state.content,
            img: this.state.pictures[0].name,
            fare: this.state.fare,

        }).then((Response) => {

        }).catch(ex => {

        });

        let frm = new FormData();
        frm.append('picture', this.state.pictures[0]);
        axios.post('http://localhost:9000/guide/imageupload', frm, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then((Response) => {

        }).catch(ex => {

        })

    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
        });

    }
    render() {
        return (
            <div>
                <hr />
                <form onSubmit={this.handleOnSubmit}>
                    <p>아래의 폼을 입력하세요</p>
                    <table>
                        <tbody>
                            <tr>
                                <th>아이디</th>
                                <td><input type="text" name="id" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>비밀번호</th>
                                <td><input type="password" name="pass" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>이름</th>
                                <td><input type="text" name="name" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>대륙</th>
                                <td><input type="text" name="continent" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>국적</th>
                                <td><input type="text" name="nat" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>지역</th>
                                <td><input type="text" name="spot" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>핸드폰</th>
                                <td><input type="text" name="mobile" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>email</th>
                                <td><input type="text" name="email" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>주소</th>
                                <td><input type="text" name="addr" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>내용</th>
                                <td><textarea name="content" onChange={this.handleOnChange}></textarea></td>
                            </tr>
                            <tr>
                                <th>이미지</th>
                                <td>
                                    <ImageUploader
                                        withIcon={true}
                                        buttonText='Choose images'
                                        onChange={this.onDrop}
                                        imgExtension={['.jpg', '.gif', '.png', '.gif']}
                                        maxFileSize={5242880}
                                    />
                                </td>
                            </tr>
                            <tr>
                                <th>요금</th>
                                <td><input type="number" name="fare" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <td colSpan="2" align="center">
                                    <button type="submit">서버로 전송하기</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
            </div>
        );
    }
}
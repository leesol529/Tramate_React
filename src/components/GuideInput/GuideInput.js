import React from 'react';
import axios from 'axios';
import ImageUploader from 'react-images-upload';

export default class GuideInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            nat: '',
            spot: '',
            mobile: '',
            email1: '',
            email2: '',
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
    handleOnSubmit = () => {

        axios.post('http://localhost:8080/guide/inputdata', {
            name: this.state.name,
            nat: this.state.nat,
            spot: this.state.spot,
            mobile: this.state.mobile,
            email1: this.state.email1,
            email2: this.state.email2,
            addr: this.state.addr,
            content: this.state.content,
            img: this.state.pictures[0].name,
            fare: this.state.fare,

        }).then((Response) => {

        }).catch(ex => {

        });

        let frm = new FormData();
        frm.append('picture', this.state.pictures[0]);
        axios.post('http://localhost:8080/guide/imageupload', frm)

        axios.post('http://localhost:8080/guide/imageupload', frm, {
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
                <form>
                    <p>아래의 폼을 입력하세요</p>
                    <table>
                        <tbody>
                            <tr>
                                <th>이름</th>
                                <td><input type="text" name="name" onChange={this.handleOnChange} /></td>
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
                                <th>email1</th>
                                <td><input type="text" name="email1" onChange={this.handleOnChange} /></td>
                            </tr>
                            <tr>
                                <th>email2</th>
                                <td><input type="text" name="email2" onChange={this.handleOnChange} /></td>
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
                            {/* <tr>
                                <td colSpan="2" align="center">
                                    <button onClick={this.handleOnSubmit}>서버로 전송하기</button>
                                </td>
                            </tr> */}
                        </tbody>
                    </table>

                </form>
                <button onClick={this.handleOnSubmit}>서버로 전송하기</button>
            </div>
        );
    }
}
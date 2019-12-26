import React from 'react';
import axios from 'axios';
import Image from '../Guide/Image';
export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gnum: this.props.match.params.gnum,
            tnum: this.props.match.params.tnum,
            comefrom: '',
            content: '',
            chatList: [],
            traveler: '',
            guide: ''
        }

    }

    UNSAFE_componentWillMount = () => {
        const userType = localStorage.getItem('user');
        if (userType === 'guide') {
            this.setState({
                comefrom: this.state.gnum
            })
        } else {
            this.setState({
                comefrom: this.state.tnum
            })
        }
    }

    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSendMessage = (e) => {

        e.preventDefault();

        axios.post('http://localhost:9000/chat/insert', {
            gnum: this.state.gnum,
            tnum: this.state.tnum,
            comefrom: this.state.comefrom,
            content: this.state.content
        }).then((responseData) => {
            this.list();
            document.getElementById("my-form").reset();
        }).catch((error) => {
            console.log('실패');
        });


    }

    list = () => {
        var data = new FormData();
        data.append("gnum", this.state.gnum);
        data.append("tnum", this.state.tnum);

        axios({
            method: "post",
            url: "http://localhost:9000/chat/list",
            data: data
        }).then((responseData) => {
            this.setState({
                chatList: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });
    }
    componentDidMount = () => {

        let traveler = new FormData();
        traveler.append('num', this.state.tnum);

        let guide = new FormData();
        guide.append('num', this.state.guide);

        axios({
            method: "post",
            url: "http://localhost:9000/traveler/select",
            data: traveler
        }).then((responseData) => {
            this.setState({
                traveler: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });

        axios({
            method: "post",
            url: "http://localhost:9000/guide/select",
            data: traveler
        }).then((responseData) => {
            this.setState({
                guide: responseData.data
            })
        }).catch((error) => {
            console.log("댓글 받기 에러!");
        });

        this.list();
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSendMessage} id="my-form">
                    <input type="text" name="content" ref="content" onChange={this.handleOnChange} />
                    <button>메세지 보내기</button>
                </form><br />
                <div className="chat-div">
                    {this.state.chatList.map((chat) => {
                        if (chat.comefrom + "" == this.state.comefrom) {
                            return (
                                <div key={chat.num} className="line-from-me">
                                    <Image img={this.state.traveler.img} alt="" />
                                    <p>{chat.content}</p>
                                </div>
                            );
                        } else {
                            return (
                                <div key={chat.num} className="line-from-other">
                                    <Image img={this.state.traveler.img} alt="" />
                                    <p>{chat.content}</p>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        );
    }
}
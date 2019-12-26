import React from 'react';
import axios from 'axios';

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gnum: this.props.match.params.gnum,
            tnum: this.props.match.params.tnum,
            comefrom: 0,
            content: '',
            chatList: []
        }

    }

    componentDidMount = () => {
        const userType = localStorage.getItem('user');
        if (userType === 'guide') {
            this.setState({
                comefrom: localStorage.getItem('gnum')
            })
        } else {
            this.setState({
                comefrom: localStorage.getItem('tnum')
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

                        if (chat.comefrom === this.state.comefrom) {
                            return <p className="line-from-me" key={chat.num}>me : {chat.content}</p>;
                        } else {
                            return <p className="line-from-other" key={chat.num}>other: {chat.content}</p>
                        }

                    })}
                </div>
            </div>
        );
    }
}
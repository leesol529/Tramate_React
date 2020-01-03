import React from 'react';
import axios from 'axios';
import Image from '../Guide/Image';
import 'react-chat-elements/dist/main.css';
import { MessageBox, SystemMessage, MessageList, Input, Button, Avatar, Popup, Navbar,SideBar } from 'react-chat-elements'

export default class Chat extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            gnum: this.props.match.params.gnum,
            tnum: this.props.match.params.tnum,
            comefrom: '',
            content: '',
            messages: [],
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
                messages: responseData.data
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
        console.log(localStorage.getItem('tnum'));
        return (
            <div style={{ width: '50rem',margin:'0 auto' }}>
                <Navbar
                    left={
                        <div></div>
                    }
                    center={
                        <div>대화창</div>
                    }
                    right={
                        <div></div>
                    } />
                <MessageList
                    className='message-list'
                    lockable={true}
                    toBottomHeight={'100%'}
                    dataSource={
                        this.state.messages.map((message) => {
                            if (localStorage.getItem('user') == 'traveler' && localStorage.getItem('tnum') == message.comefrom) {
                                return {
                                    position: 'right',
                                    type: 'text',
                                    text: message.content,


                                }
                            } 
                            else if(localStorage.getItem('user') == 'guide' && localStorage.getItem('gnum') == message.comefrom){
                                return {
                                    position: 'right',
                                    type: 'text',
                                    text: message.content

                                }
                            }
                            else {
                                return {
                                    position: 'left',
                                    type: 'text',
                                    text: message.content
                                }
                            }
                        })
                    } />
                <SystemMessage
                    text={'End of conversation'} />

                <form onSubmit={this.handleSendMessage} id="my-form" style={{ display: 'flex' }}>
                    <input type="text" name="content" ref="content" onChange={this.handleOnChange} placeholder='Input Message' style={{ border: 'none',width:'43rem' }}  />
                    <Button
                        color='white'
                        backgroundColor='black'
                        text='Send' />
                </form>
               

            </div>
        );
    }

}

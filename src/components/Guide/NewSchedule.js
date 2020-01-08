import React from 'react';
import axios from 'axios';
import Modal from 'react-modal';

const customStyles = {
    content: {
        top: '50%',
        left: '50%',
        right: 'auto',
        bottom: 'auto',
        width: '45%',
        height: '45%',
        marginRight: '-50%',
        transform: 'translate(-50%, -50%)'
    }
};

export default class NewSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            traveler: {},
            att: 0,
            act: 0,
            res: 0,
            reason: '',
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);

    }
    openModal() {
        this.setState({ modalIsOpen: true });
    }
    closeModal() {

        let data = new FormData();
        data.append('gnum', this.props.schedule[0].gnum);
        data.append('tnum', this.props.schedule[0].tnum);
        data.append('reason', this.state.reason);

        axios({
            method: "post",
            url: "http://192.168.0.89:9000/calendar/reason/update",
            data: data
        }).then((responseData) => {
            console.log('Reason 보내기 성공')
        }).catch((error) => {
            console.log("Reason 보내기 실패");
        });

        console.log(this.props.schedule[0].gnum);
        let data1 = new FormData();
        data1.append("num", this.props.schedule[0].num);
        axios.post(
            "http://192.168.0.89:9000/guide/decline",
            data1
        ).then((res) => {
            console.log("decline success");
            window.location.reload();
        }).catch((err) => {
            console.log("decline fail");
        });

        this.setState({ modalIsOpen: false });
    }
    handleOnChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getTraveler = () => {
        let url = "http://192.168.0.89:9000/traveler/select";
        let data = new FormData();
        data.append("num", this.props.schedule[0].tnum);
        axios.post(url, data).then((res) => {
            this.setState({
                traveler: res.data
            });
        });
    }

    count = () => {
        this.props.schedule.map((item) => {
            if (item.type === 1) {
                this.setState(prev => {
                    return {
                        att: prev.att + 1
                    }
                });
            } else if (item.type === 2) {
                this.setState(prev => {
                    return {
                        act: prev.act + 1
                    }
                });
            } else if (item.type === 3) {
                this.setState(prev => {
                    return {
                        res: prev.res + 1
                    }
                });
            }
        })
    }

    handleAccept = () => {
        console.log(this.props.schedule[0].gnum);
        let data = new FormData();
        data.append("num", this.props.schedule[0].num);
        axios.post(
            "http://192.168.0.89:9000/guide/accept",
            data
        ).then((res) => {
            console.log("accept success");
            window.location.reload();
        }).catch((err) => {
            console.log("accept fail");
        });
    }

    handleDecline = () => {

        this.setState({
            modalIsOpen: true
        });
    }

    componentDidMount() {
        this.getTraveler();
        this.count();

    }

    render() {
        return (
            <div className="schedule_traveler_info">
                <div className="container">
                    <img src={`http://192.168.0.89:9000/image/${this.state.traveler.img}`}
                        className="schedule_traveler_pic" alt="travelerProfilePic" />
                    <p className="title">{this.state.traveler.name}</p>
                    <p className="info">
                        <b>{this.state.att}</b> attractions<br />
                        <b>{this.state.act}</b> activities<br />
                        <b>{this.state.res}</b> restaurants<br />
                        Start: {this.props.schedule[0].startdate}<br />
                        End: {this.props.schedule[0].enddate}
                    </p>
                    <div className="overlay"></div>
                    <div className="button1" onClick={this.handleDecline}><p > Decline </p></div>
                    <div className="button2" onClick={this.handleAccept}><p> Accept </p></div>
                </div>
                <Modal
                    isOpen={this.state.modalIsOpen}
                    onAfterOpen={this.afterOpenModal}
                    style={customStyles}
                    onRequestClose={this.closeModal}
                    contentLabel="Example Modal">
                    <form onSubmit={this.closeModal}>
                        <textarea name="reason" onChange={this.handleOnChange} placeholder="Please type in the reason" className="reason_textarea" /><br />
                        <div className="reason_div">
                            <button type="submit" className="reason_button">이유 전송하기</button>
                        </div>
                    </form>
                </Modal>
            </div>
        );
    }
}
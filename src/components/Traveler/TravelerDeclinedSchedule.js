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

export default class FixedSchedule extends React.Component{
    constructor(props){
        super(props);
        this.state={
            traveler: {},
            att: 0,
            act: 0,
            res: 0,
            modalIsOpen: false
        }
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    getTraveler = () => {
        let url = "http://localhost:9000/traveler/select";
        let data = new FormData();
        data.append("num", this.props.schedule[0].tnum);
        axios.post(url, data).then((res)=>{
            this.setState({
                traveler: res.data
            });
        });
    }

    count= () => {
        this.props.schedule.map((item)=>{
            if(item.type===1){
                this.setState(prev=>{
                    return{
                        att: prev.att+1
                    }
                });
            }else if(item.type===2){
                this.setState(prev=>{
                    return{
                        act: prev.act+1
                    }
                });
            }else if(item.type===3){
                this.setState(prev=>{
                    return{
                        res: prev.res+1
                    }
                });
            }
        })
    }

    openModal() {
        this.setState({ modalIsOpen: true });
    }

    closeModal() {
        this.setState({ modalIsOpen: false });
    }

    componentDidMount(){
        this.getTraveler();
        this.count();
        console.log(this.props.schedule[0]);
    }

    render(){
        return(
            <div className="schedule_traveler_info">
                <div className="container2">
                    <img src={`http://localhost:9000/image/${this.state.traveler.img}`} 
                         className="schedule_traveler_pic" alt="travelerProfilePic" />
                    <p className="title">{this.state.traveler.name}</p>
                    <p className="info">
                        <b>{this.state.att}</b> attractions<br/>
                        <b>{this.state.act}</b> activities<br/>
                        <b>{this.state.res}</b> restaurants<br/>
                        Start: {this.props.schedule[0].startdate}<br/>
                        End: {this.props.schedule[0].enddate}
                    </p>
                    <div className="overlay"></div>
                    <div className="button3"
                         onClick={this.openModal}>
                        <p> 거절 사유 확인 </p>
                    </div>
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        style={customStyles}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal">
                    <form>
                        <textarea name="reason" onChange={this.handleOnChange} className="reason_textarea"
                                  defaultValue={this.props.schedule[0].reason}/><br />
                        <div className="reason_div">
                            <button type="button" className="reason_button"
                                    onClick={this.closeModal}>
                                닫기 
                            </button>
                        </div>
                    </form>
                </Modal>
                </div>
            </div>
        );
    }
}
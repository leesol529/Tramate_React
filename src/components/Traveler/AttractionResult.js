import React from 'react';
import { connect } from 'react-redux';
import { addSchedule, delSchedule } from '../../actions/action';

class AttractionResult extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            image: "",
            pks: 0,
            type: 1,
            check: false
        }
        this.onCheck = this.onCheck.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    onCheck = () => {
        if (!this.state.check) {
            this.state = {
                pks: this.props.att.num,
                type: this.state.type
            };
            this.setState({
                pks: this.props.att.num,
                type: this.state.type
            });

            let schedule = {
                gnum: Number(this.props.gnum),
                tnum: Number(this.props.tnum),
                pks: this.state.pks,
                type: this.state.type
            };

            this.setState({
                check: true
            });

            this.props.onInsertSchedule(schedule);

        } else if (this.state.check) {
            this.state = {
                pks: this.props.att.num,
                type: this.state.type
            };
            this.setState({
                pks: this.props.att.num,
                type: this.state.type
            });

            let schedule = {
                gnum: Number(this.props.gnum),
                tnum: Number(this.props.tnum),
                pks: this.state.pks,
                type: this.state.type
            };
            this.props.onDeleteSchedule(schedule);

            this.setState({
                check: false
            });
        }
    }

    handleClick = () =>{
        this.props.history.push(`/guide/profile/${this.props.att.gnum}`)
    }

    render() {
        let input;
        let img;
        if(!this.props.result){
            input = <input type="checkbox" onClick={this.onCheck} />
        }
        
        if(!this.props.result){
            img = <img src={`http://192.168.0.89:9000/image/${this.props.att.img}`}
                    className="tChoice_img" alt="result_img"/>
        } else {
            img = <img src={`http://192.168.0.89:9000/image/${this.props.att.img}`}
                    className="tChoice_img" alt="result_img" onClick={this.handleClick}/>
        }

        return (
            <table className="tChoice_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            {input}
                            Attraction{this.props.idx}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tChoice_input tChoice_center">
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail">
                                    {img}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input tChoice_center">
                            {this.props.att.name}
                        </td>
                    </tr>
                    <tr>
                        <td className="tChoice_input">
                            {this.props.att.content}
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

//store의 state를 변경하기 위한 method (저장)
let mapDispatchToProps = (dispatch) => {
    return {
        onInsertSchedule: (a) => dispatch(addSchedule(a)),
        onDeleteSchedule: (a) => dispatch(delSchedule(a))
    };
}

//store에 정의 된 state를 쓰기 위한 connect
AttractionResult = connect(undefined, mapDispatchToProps)(AttractionResult);

export default AttractionResult;
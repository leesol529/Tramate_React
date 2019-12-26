import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import {addSchedule, delSchedule} from '../../actions/action';

class AttractionResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            image: "",
            type: this.props.type,
            check: false
        }
    }

    componentWillMount(){
        //Byte array 이미지를 이미지로 바꾸는 것.
    let url = "http://localhost:9000/image/"+this.props.att.img;
    axios
        .get(
            url,
            { responseType: 'arraybuffer' },
        )
        .then(response => {
            const base64 = btoa(
                new Uint8Array(response.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    '',
                ),
            );
            this.setState({ image: "data:;base64," + base64 });
        });
    }

    onCheck = () => {
        if(!this.state.check){
            this.props.onInsertSchedule({pks: this.props.att.num, type: this.props.type});
            console.log(this.props.schedules);
            this.setState({
                check: true
            });
        } else if(this.state.check){
            this.props.onDeleteSchedule({pks: this.props.att.num, type: this.props.type});
            console.log(this.props.schedules);
            this.setState({
                check: false
            });
        }
    }

    render(){
        return(
            <table className="tChoice_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onClick={this.onCheck} />
                            Attraction{this.props.idx}
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td className="tChoice_input tChoice_center">
                            <div className="thumbnail-wrapper">
                                <div className="thumbnail">
                                    <img src={this.state.image} 
                                        className="tChoice_img" 
                                        alt="result_img"/>
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

let mapStateToProps = (state) => {
    return {
        schedules: state.schedules
    };
}

//store의 state를 변경하기 위한 method (저장)
let mapDispatchToProps = (dispatch) => {
    return {
        onInsertSchedule: (a) => dispatch(addSchedule(a)),
        onDeleteSchedule: (a) => dispatch(delSchedule(a))
    };
}

//store에 정의 된 state를 쓰기 위한 connect
AttractionResult= connect(mapStateToProps ,mapDispatchToProps)(AttractionResult);

export default AttractionResult;
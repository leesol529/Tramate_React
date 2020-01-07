import React from 'react';
import ImageUpload from '../Util/ImageUpload';
import axios from 'axios';
import { connect } from 'react-redux';
import { addActivity, delActivity } from '../../actions/action';

class ActivityForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            img: "",
            content: "",
            type: "",
            price: "",
            gnum: 1
        }
    }

    //id에 해당하는 gnum 가져와 state에 넣어줄 method
    onMount = () => {
        const id = localStorage.getItem("loginok");
        let gnum;
        var data = new FormData();
        data.append("id", id)

        axios({
            method: "post",
            url: "http://localhost:9000/guide/choice/gnum",
            data: data
        }).then((responseData) => {
            gnum = responseData.data;
            this.setState({
                gnum
            });
            console.log(gnum);
        }).catch((error) => {
            console.log(error);
        });
    }

    componentWillMount() {
        this.onMount();
    }

    onKeyChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    onCheck = () => {
        if (!this.state.check) {
            this.state = {
                gnum: this.state.gnum,
                type: this.state.type,
                price: this.state.price,
                content: this.state.content
            };
            this.setState({
                gnum: this.state.gnum,
                type: this.state.type,
                price: this.state.price,
                content: this.state.content
            });

            let activity = {
                gnum: Number(this.state.gnum),
                type: this.state.type,
                price: this.state.price,
                content: this.state.content
            };

            this.setState({
                check: true
            });

            this.props.onInsertActivity(activity);

        } else if (this.state.check) {
            this.state = {
                gnum: this.state.gnum,
                type: this.state.type,
                price: this.state.price,
                content: this.state.content
            };
            this.setState({
                gnum: this.state.gnum,
                type: this.state.type,
                price: this.state.price,
                content: this.state.content
            });

            let activity = {
                gnum: Number(this.state.gnum),
                type: this.state.type,
                price: this.state.price,
                content: this.state.content
            };
            this.props.onDeleteActivity(activity);

            this.setState({
                check: false
            });
        }
    }

    onImageUpload = (e) => {
        //톰캣 서버에 이미지 업로드하기 
        const uploadFile = e.target.files[0];
        const img = e.target.files[0].name;
        console.log(uploadFile);
        console.log(img);

        //state의 img 변경, img: img 같을 때 생략 가능 
        this.setState({
            img
        });

        //아래의 data을 받는 쪽에서 multipart로 받음
        let data = new FormData();
        data.append("uploadFile", uploadFile);

        axios({
            method: "post",
            url: "http://localhost:9000/guide/choice/activity_img",
            data: data,
            headers: { "Content-Type": "multipart/form-data" }
        }).then((responseData) => {
            console.log(responseData.data);
        }).catch((error) => {
            console.log("이미지 업로드 중 오류");
        });
    }

    render() {
        return (
            <table className="gchoice_form_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox" onClick={this.onCheck} />
                            Activity Form
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ImageUpload onImageUpload={this.onImageUpload} />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="type" defaultValue="" className="gchoice_input"
                                onChange={this.onKeyChange}>
                                <option value="" disabled>Type of an activity </option>
                                <option value="indoor">Indoor activity</option>
                                <option value="outdoor">Outdoor activity</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <select name="price" defaultValue=""
                                onChange={this.onKeyChange}
                                className="gchoice_input">
                                <option value="" disabled> Price range </option>
                                <option value="$">$</option>
                                <option value="$$">$$</option>
                                <option value="$$$">$$$</option>
                            </select>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea name="content"
                                onChange={this.onKeyChange}
                                placeholder="Please describe the attraction" />
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
        onInsertActivity: (a) => dispatch(addActivity(a)),
        onDeleteActivity: (a) => dispatch(delActivity(a))
    };
}

//store에 정의 된 state를 쓰기 위한 connect
ActivityForm = connect(undefined, mapDispatchToProps)(ActivityForm);

export default ActivityForm;
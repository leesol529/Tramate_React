import React from 'react';
import ImageUpload from '../Util/ImageUpload';
import axios from 'axios';
import { connect } from 'react-redux';
import { addAttraction, delAttraction } from '../../actions/action';

class AttractionForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            content: "",
            gnum: 1,
            checked: false
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
                name: this.state.name,
                content: this.state.content
            };
            this.setState({
                gnum: this.state.gnum,
                name: this.state.name,
                content: this.state.content
            });

            let attraction = {
                gnum: Number(this.state.gnum),
                name: this.state.name,
                content: this.state.content
            };

            this.setState({
                check: true
            });

            this.props.onInsertAttraction(attraction);

        } else if (this.state.check) {
            this.state = {
                gnum: this.state.gnum,
                name: this.state.name,
                content: this.state.content
            };
            this.setState({
                gnum: this.state.gnum,
                name: this.state.name,
                content: this.state.content
            });

            let attraction = {
                gnum: Number(this.state.gnum),
                name: this.state.name,
                content: this.state.content
            };
            this.props.onDeleteAttraction(attraction);

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
            url: "http://localhost:9000/guide/choice/attraction_img",
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
                            Attraction Form
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
                            <input type="text" name="name" placeholder="name of attraction"
                                onChange={this.onKeyChange}
                                className="gchoice_input" />
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea name="content" placeholder="Please describe the attraction"
                                onChange={this.onKeyChange} />
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
        onInsertAttraction: (a) => dispatch(addAttraction(a)),
        onDeleteAttraction: (a) => dispatch(delAttraction(a))
    };
}

//store에 정의 된 state를 쓰기 위한 connect
AttractionForm = connect(undefined, mapDispatchToProps)(AttractionForm);

export default AttractionForm;
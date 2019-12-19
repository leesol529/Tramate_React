import React from 'react'; 
import ImageUpload from '../Util/ImageUpload';
import axios from 'axios';
import store from '../../store/store';
import {addAttraction} from '../../actions/action';

export default class AttractionForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            content: "",
            gnum: 1
        }
    }

    //id에 해당하는 gnum 가져와 state에 넣어줄 method
    onMount = () => {
        const id = localStorage.getItem("loginok");
        let gnum;
        var data= new FormData();
        data.append("id", id)
        
        axios({
            method: "post",
            url: "http://localhost:9000/guide/choice/gnum",
            data: data
        }).then((responseData)=>{
            gnum = responseData.data;
            this.setState({
                gnum
            });
            console.log(gnum);
        }).catch((error)=>{
            console.log(error);
        });
    }

    componentWillMount(){
        this.onMount();
    }

    onKeyChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    handleInsert=()=>{
        store.dispatch(addAttraction({
            name: this.state.name, 
            content: this.state.content,
            img: this.state.img,
            gnum: this.state.gnum
        }));
        console.log(store.getState().attractions);  
        
        let data = new FormData();
        let attractions = store.getState().attractions
        for(let i=0; i<attractions.length; i++){
            data.append("attractions", attractions[i]);
        }
        console.log(data.getAll("attractions").type);
    }

    onImageUpload=(e)=>{
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
			headers: {"Content-Type": "multipart/form-data"}
        }).then((responseData)=>{
            console.log(responseData.data);
        }).catch((error)=>{
            console.log("이미지 업로드 중 오류");
        });
    }

    render(){
        return(
            <table className="gchoice_form_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            <button type="button" onClick={this.handleInsert}> + </button>
                            Attraction Form
                        </th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ImageUpload onImageUpload={this.onImageUpload}/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <input type="text" name="name" placeholder="name of attraction"
                                   onChange={this.onKeyChange}
                                   className="gchoice_input"/>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <textarea name="content" placeholder="Please describe the attraction"
                                      onChange={this.onKeyChange}/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
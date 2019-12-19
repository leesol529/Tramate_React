import React from 'react'; 
import ImageUpload from '../Util/ImageUpload';
import axios from 'axios';
import store from '../../store/store';
import {addRestaurant} from '../../actions/action';

export default class RestaurantForm extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            img: "",
            type: "",
            price: "",
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

    handleInsert=(e)=>{
        //***여기서 else를 줘서 check가 아닐 땐 state에서 빼주는 method 호출하기 
        if(e.target.checked){
            store.dispatch(addRestaurant({
                img: this.state.img,
                type: this.state.type,
                price: this.state.price,
                content: this.state.content,
                gnum: this.state.gnum
            }));
            console.log(store.getState()); 
        }  
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
            url: "http://localhost:9000/guide/choice/restaurant_img",
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
                            <input type="checkbox" onChange={this.handleInsert}/>
                            Restaurant Form
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
                            <select name="type" defaultValue="" className="gchoice_input"
                                    onChange={this.onKeyChange}>
                                <option value="" disabled>Type of a restaurant </option>
                                <option value="korean"> Korean </option>
                                <option value="chinese"> Chinese </option>
                                <option value="japanese"> Japanese </option>
                                <option value="indian"> Indian </option>
                                <option value="thai"> Thai </option>
                                <option value="italian"> Italian </option>
                                <option value="mexican"> Mexican </option>
                                <option value="french"> French </option>
                                <option value="vietnamese"> Vietnamese </option>
                                <option value="greek"> Greek </option>
                                <option value="german"> German </option>
                                <option value="american"> American </option>
                                <option value="etc"> Etc </option>
                                <option value="-" disabled> *** alergy info *** </option>
                                <option value="seafood"> Sea food </option>
                                <option value="glutenFree"> Gluten free </option>
                                <option value="vegitarian"> Vegitarian </option>
                                <option value="vegan"> Vegan </option>
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
                                      placeholder="Please describe the restaurant"/>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
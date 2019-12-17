import React from 'react'; 
import ImageUpload from '../Util/ImageUpload';
import axios from 'axios';

export default class AttractionForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            content: ""
        }

        this.onKeyChange = this.onKeyChange.bind(this);
        this.onImageUpload = this.onImageUpload.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }
    
    onKeyChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
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

    onSubmit=(e)=>{
		e.preventDefault();
		
		//db에 traveler 가입정보 저장 
        var url = "http://localhost:9000/guide/choice/attraction_form";
        axios.post(url, {
			name: this.state.name,
            img: this.state.img,
            content: this.state.content
		}).then((responseData)=>{
			console.log("traveler 가입정보 insert success");
			
			this.setState({
				name: "",
				nat: "",
				id: "",
				pass: "",
				mobile: "",
				addr: "",
				content: "",
				img: "",
				email: "",
				filename: ""
			});

			document.getElementById("joinFrm").reset();

        }).catch((error)=>{
            console.log("traveler 가입정보 insert fail");
		});
    }

    render(){
        return(
            <form>
                <table className="gchoice_form_table">
                    <thead>
                        <tr>
                            <th>Attraction Form</th>
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
            </form>
        );
    }
}
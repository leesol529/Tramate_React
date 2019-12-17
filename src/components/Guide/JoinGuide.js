import React from 'react';
import axios from 'axios';
import ImageUpload from '../Util/ImageUpload';

export default class GuideLogin extends React.Component{
    constructor(props){
		super(props);
		this.state={
			id: '',
            pass: '',
            name: '',
            nat: '',
            spot: '',
            mobile: '',
            email: '',
            addr: '',
            content: '',
            img: '',
            fare: 0,
            pictures: []
		};
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
            url: "http://localhost:9000/guide/imageupload",
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
        var url = "http://localhost:9000/guide/join";
        axios.post(url, {
			name: this.state.name,
			nat: this.state.nat,
			id: this.state.id,
			pass: this.state.pass,
			mobile: this.state.mobile,
			addr: this.state.addr,
			content: this.state.content,
			email: this.state.email,
            img: this.state.img,
            fare: this.state.fare,
            spot: this.state.spot
		}).then((responseData)=>{
            console.log("guide 가입정보 insert success");
        }).catch((error)=>{
            console.log("guide 가입정보 insert fail");
		});
    }

    render(){
        return(
            <form className="super" onSubmit={this.onSubmit}>
                <table className="traveler_table">
					<caption> Join as a Guide: Tramate의 여행을 인도해 주세요 </caption>
					<tbody>
						<tr>
							<td colSpan="2">
								<hr/>
							</td>
						</tr>
						<tr>
							<td rowSpan="5">
								<ImageUpload onImageUpload={this.onImageUpload}/>
							</td>
							<td>
								<input type="text"
										name="name" placeholder="name"
										required="required"
										autoFocus="autoFocus"
										className="join_input"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td>
								<input type="text"
										name="nat" placeholder="nationality"
										required="required"
										className="join_input"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td>
								<div>
								<input type="text" name="id"
										placeholder="id"
										required="required"
										className="join_input"
										onChange={this.onKeyChange}/>
										{/* <button type="button" id="btnid">
											입력
										</button> */}
								</div>		
							</td>
						</tr>
						<tr>
							<td>
								<input type="password" name="pass"
									   required="required"
									   maxLength="10"
									   placeholder="password"
									   className="join_input"
									   onChange={this.onKeyChange}/>	
							</td>
						</tr>
						
						<tr>
							<td>
								<input type="password" name="pass2"
									   required="required"
									   maxLength="10"
									   placeholder="password check"
									   className="join_input"
									   onChange={this.onKeyChange}/>	
							</td>
						</tr>
                        <tr>
							<td colSpan="2">
								<select name="continent" className="join_input2" defaultValue>
                                    <option value="" disabled> Please select the continent </option>
                                    <option value="asia"> Asia </option>
                                    <option value="europe"> Europe </option>
                                    <option value="australia"> Australia </option>
                                    <option value="africa"> Africa </option>
                                    <option value="southAmerica"> South America </option>
                                    <option value="northAmerica"> North America </option>
                                    <option value="antarctica"> Antarctica </option>
                                </select>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<input type="text" name="spot"
									   required="required"
									   placeholder="Where would you like to guide?"
									   //pattern="[0-9]{11}"
									   className="join_input2"
									   onChange={this.onKeyChange}/>
							</td>
						</tr>
                        <tr>
							<td colSpan="2">
								<input type="text" name="fare"
									   required="required"
									   placeholder="Guide price per person"
									   //pattern="[0-9]{11}"
									   className="join_input2"
									   onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<input type="text" name="mobile"
									   required="required"
									   placeholder="mobile (without -)"
									   //pattern="[0-9]{11}"
									   className="join_input2"
									   onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<input type="text"
										name="addr" placeholder="address"
										required="required"
										className="join_input2"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<input type="text" name="email"
									required="required"
									placeholder="e-mail address"
									className="join_input2"
									onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
                                <textarea name="content" 
                                          placeholder="Please introduce yourself to Tramates!"
										  required="required"
										  onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2" align="center">
								<button type="submit" className="join_btn"> Join </button>
							</td>
						</tr>				
					</tbody>					
				</table>
            </form>
        );
    }
}
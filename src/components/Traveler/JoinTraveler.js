import React from 'react';
import axios from 'axios';
import ImageUpload from '../Util/ImageUpload';

export default class TravlerLogin extends React.Component{

	constructor(props){
		super(props);
		this.state={
			name: "",
			nat: "",
			id: "",
			pass: "",
			mobile: "",
			addr: "",
			content: "",
			img: "",
			email: ""
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
            url: "http://localhost:9000/traveler/imageupload",
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
        var url = "http://localhost:9000/traveler/join";
        axios.post(url, {
			name: this.state.name,
			nat: this.state.nat,
			id: this.state.id,
			pass: this.state.pass,
			mobile: this.state.mobile,
			addr: this.state.addr,
			content: this.state.content,
			email: this.state.email,
			img: this.state.img
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
            <form className="super" onSubmit={this.onSubmit} id="joinFrm">
                <table className="traveler_table">
					<caption> Join as a Traveler: Tramate와 함께 여행을 떠나보세요 </caption>
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
										name="name" placeholder="이름"
										required="required"
										autoFocus="autoFocus"
										className="join_input"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td>
								<input type="text"
										name="nat" placeholder="국적"
										required="required"
										className="join_input"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td>
								<div>
								<input type="text" name="id"
										placeholder="아이디"
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
									   placeholder="비밀번호"
									   className="join_input"
									   onChange={this.onKeyChange}/>	
							</td>
						</tr>
						
						<tr>
							<td>
								<input type="password" name="pass2"
									   required="required"
									   maxLength="10"
									   placeholder="비밀번호 재확인"
									   className="join_input"
									   onChange={this.onKeyChange}/>	
							</td>
						</tr>
						
						<tr>
							<td colSpan="2">
								<input type="text" name="mobile"
									   required="required"
									   placeholder="모바일 (-없이 숫자로만 입력)"
									   //pattern="[0-9]{11}"
									   className="join_input2"
									   onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<input type="text"
										name="addr" placeholder="주소"
										required="required"
										className="join_input2"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<input type="text" name="email"
									required="required"
									placeholder="이메일 주소"
									className="join_input2"
									onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2">
								<textarea name="content" placeholder="자유롭게 본인을 소개해 주세요"
										required="required"
										onChange={this.onKeyChange}/>
							</td>
						</tr>
						<tr>
							<td colSpan="2" align="center">
								<button type="submit" className="join_btn"> 가입하기 </button>
							</td>
						</tr>				
					</tbody>					
				</table>
            </form>
        );
    }
}
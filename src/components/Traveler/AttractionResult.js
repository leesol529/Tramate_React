import React from 'react';
import axios from 'axios';

export default class AttractionResult extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            image: ""
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
        
    }

    render(){
        console.log(this.props.att)
        return(
            <table className="tChoice_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>
                            <input type="checkbox"/>
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
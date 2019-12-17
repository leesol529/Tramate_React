import React from 'react'; 
import ImageUpload from '../Util/ImageUpload';
import axios from 'axios';

export default class AttractionForm extends React.Component{

    constructor(props) {
        super(props);
        this.state = {
            name: "",
            img: "",
            content: "",
            gnum: "@@@"
        }
    }

    onKeyChange=(e)=>{
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    render(){
        return(
            <table className="gchoice_form_table" id="choiceFrm">
                <thead>
                    <tr>
                        <th>Attraction Form</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <ImageUpload onImageUpload={this.props.onImageUpload}/>
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
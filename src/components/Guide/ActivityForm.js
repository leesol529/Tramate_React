import React from 'react'; 
import ImageUpload from '../Util/ImageUpload';

export default class ActivityForm extends React.Component{
    render(){
        return(
            <form>
                <table className="gchoice_form_table">
                    <thead>
                        <tr>
                            <th>Activity Form</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <ImageUpload />
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="type" defaultValue="" className="gchoice_input">
                                    <option value="" disabled>Type of an activity </option>
                                    <option value="indoor">Indoor activity</option>
                                    <option value="outdoor">Outdoor activity</option>
                                </select>
                            </td>
                        </tr>
                        <tr>
                            <td>
                                <select name="price" defaultValue=""
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
                                <textarea name="content" placeholder="Please describe the attraction"/>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </form>
        );
    }
}
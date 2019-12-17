import React from 'react';

export default class ImageUpload extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            filename: '',
            imagePreviewUrl: ''
        };
      }
    
      _handleSubmit(e) {
        e.preventDefault();
        // TODO: do something with -> this.state.file
        console.log('handle uploading-', this.state.file);
      }
    
      _handleImageChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let filename = e.target.files[0];
    
        reader.onloadend = () => {
          this.setState({
            filename: filename,
            imagePreviewUrl: reader.result
          });
        }
    
        reader.readAsDataURL(filename)
        
        this.props.onImageUpload(e);
      }
    
      render() {
        let {imagePreviewUrl} = this.state;
        let $imagePreview = null;
        if (imagePreviewUrl) {
          $imagePreview = (<img src={imagePreviewUrl} alt="img_preview"/>);
        } else {
          $imagePreview = (<div className="previewText">Please select<br/> an Image</div>);
        }
    
        return (
          <div className="previewComponent">
            <div className="imgPreview">
                {$imagePreview}
            </div>
            {/* <form onSubmit={(e)=>this._handleSubmit(e)}> */}
                <input className="fileInput" 
                       type="file" 
                       onChange={(e)=>this._handleImageChange(e)} />
                <br/>
                {/* <button className="submitButton" 
                        type="submit" 
                        onClick={(e)=>this._handleSubmit(e)}>
                    Upload Image
                </button> */}
            {/* </form> */}
          </div>
        )
      }
}
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
        //*****join에서 submit할 때 imagePreviewUrl=false; 되도록 하면 이미지도 초기화 할 수 있을듯!
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
            <input className="fileInput" 
                    type="file" 
                    onChange={(e)=>this._handleImageChange(e)} />
          </div>
        )
      }
}
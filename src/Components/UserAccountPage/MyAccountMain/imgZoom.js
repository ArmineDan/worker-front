import React from 'react';
import "../../.././styles/my-Account/imageStyles/worksImageStyle.css";
import '../../.././styles/AvatarStyle.css';
import HighlightOff from '@material-ui/icons/HighlightOff'
import image from "../../header/logo-var.png";


class ImgZoomIn extends React.Component{
    constructor(props){
        super(props);
        this.state={

        }
    }

    render() {
        return(
            <div className='zoomInMainDiv'>
            <div className= 'preview__header'>
                <img className='logoStyle'  src={image} alt="Varpet Logo"/>
                <button className = 'closeButton' onClick={this.props.close}>x</button>
               {/*<HighlightOff   className= 'imgDelete' onClick={this.props.close}/>*/}
            </div>
            <div className='zoomInDiv'>
            </div>
            <div className='zoomInDiv1'>
                <img className='imgZoom' src = {this.props.imgUrl}/>
            </div>
            </div>
        )
    }

}


export default ImgZoomIn;


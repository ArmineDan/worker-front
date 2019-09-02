import React from 'react';
import "../../.././styles/my-Account/imageStyles/worksImageStyle.css";
import '../../.././styles/AvatarStyle.css';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight'
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft'
import image from "../../header/logo-var.png";


class ImgZoomIn extends React.Component{
    constructor(props){
        super(props);
        this.state={
        index: props.index,
        };
      }
      componentDidMount() {
          let {index} = this.state;
          switch (index) {
              case '3':
                  this.setState({
                      rightArrow: false,
                      leftArrow: true
                  });
                  break;
              case '0':
                  this.setState({
                      rightArrow: true,
                      leftArrow: false
                  });
                  break;
              default:
                  this.setState({
                      rightArrow: true,
                      leftArrow: true
                  });
          }
      }

    handleClickRight =()=>{
        let{index}=this.state;
        const {imgUrl} =this.props;
        let currentIndex = ++ index;
        if(index < imgUrl.length-1) {
            this.setState({
                index: currentIndex,
                rightArrow: true,
                leftArrow: true
            })
        }else{
            this.setState({
                index :currentIndex,
                rightArrow:false,

            })

        }

    };

    handleClickLeft =()=> {
        let {index} = this.state;
        const {imgUrl} = this.props;
        let currentIndex = --index;
        if (index > 0) {
            this.setState({
                index: currentIndex,
                rightArrow: true,
                leftArrow: true
            })
        } else {
            this.setState({
                index: currentIndex,
                leftArrow: false,

            })

        }
    };
    render() {
        const {index,leftArrow,rightArrow} = this.state;
        const {close,imgUrl} =this.props;
        return(
            <div className='zoomInMainDiv'>
            <div className= 'preview__header'>
                <img className='logoStyle'  src={image} alt="Varpet Logo"/>
                <button className = 'closeButton' onClick={close}>x</button>
            </div>
            <div className='zoomInDiv'>

            </div>
            <div className='zoomInDiv1'>
                <img className='imgZoom' src = {imgUrl[index]} alt ="work's images"/>
                <div className='arrowDiv'>
                    {leftArrow ?< KeyboardArrowLeft className='arrowIcons leftArrow' onClick={this.handleClickLeft} />:null}
                    {rightArrow ?< KeyboardArrowRight className='arrowIcons rightArrow' onClick={this.handleClickRight}/>:null}
                </div>
            </div>
            </div>
        )
    }

}


export default ImgZoomIn;


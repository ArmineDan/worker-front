import React from 'react'
import {db, storage} from "../../firebase/fire";
import '../.././styles/my-Account/imageStyles/worksImageStyle.css';
import Add from '@material-ui/icons/Add'
import ZoomIn from '@material-ui/icons/ZoomIn'
import ImgZoomIn from "./MyAccountMain/imgZoom";


export default class UploadWorksImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: [],
            zoom:false,
            zoomImgUrl:'',
            showErr:false,
        }
    }
    componentWillMount() {
        if(this.state.url.length === 0 && this.props.userId){
            //console.log(this.props.url,'proooooops');
            const urlArr= this.state.url;
            urlArr.push(this.props.url);
            this.setState({'url':urlArr});
            //console.log(this.state.url[0],'state');
        }
    }


    handleZoomIn=(e)=>{
        this.setState({zoom:true,
                             zoomImgUrl : e.target.id
                            })

    };
    handleClose = ()=>{
        this.setState({zoom:false})
        };

    handleUpload = (e) =>{
        const {userId} = this.props;
        const {url} = this.state;
        if(e.target.files[0]) {
            debugger;
            const file = e.target.files[0];
            const fileName = userId + e.target.id;
            const id = e.target.id;
            let idxDot = file.name.lastIndexOf('.') + 1;
            let ext = file.name.substr(idxDot, file.name.length);
            //console.log(ext);
            if (ext == 'jpg' || ext == 'jpeg' || ext == 'png' || ext == 'svg') {
            const uploadTask = storage.ref(`Images/${fileName}`).put(file);
            uploadTask.on('state_changed',
                //progress function
                (snapshot) => {
                    //progress function
                },
                //error function
                (error) => {
                    alert(error);
                },
                //complete function
                () => {
                    storage.ref('Images').child(fileName).getDownloadURL()
                        .then(url => {
                             console.log(url,"urllllllllllll");
                            this.state.url[0].splice(id,1,url);
                            this.setState({showErr:false });
                            //console.log(this.state.url[0],'veeeeerj stateeee');
                            return db.collection('users').doc(userId).update({'url': this.state.url[0]});

                        });
                })
        } else {
            this.setState({showErr:true})
            }
        }
    };


    render(){
        const { url,zoom,zoomImgUrl,showErr} = this.state;
         return(
            <>
            <h2 className="MuiTypography-root MuiTypography-h5 MuiTypography-gutterBottom" style={{marginBlockStart:'28px'}}>My Portfolio</h2>
            <div className='mainDiv row clearfix'>
                <div className='imagesDiv'>
                    <p style={{color:"orange"}}>You can upload up 4 images</p>

                    {url[0].map((data,index) => < div className= 'imageDiv' key ={index} style={{backgroundImage:`url(${data})`} }>
                        <div  className= 'loadDiv1'><Add className= 'plusIconStyle'/>
                        <input id={index}
                        onChange={this.handleUpload}
                        type="file"
                         accept='image/*'
                        className= 'inputStyle'
                        />
                        </div>
                        <div className= 'loadDiv2'><ZoomIn   id = {index} className= 'zoomInIconStyle'/> <div className= 'loadDiv2' style={{opacity:0, width:'100%'}} id={data} onClick={this.handleZoomIn}> </div>
                        </div></div>
                    )
                    }
                   </div>
                {showErr ? <span style={{color:'red', fontSize:'14px', textAlign:'center'}}>*You can only upload files in .jpg /.svg/ .jpeg/ .png/ format  </span>:null }
                {/*<div  style={{width:'130px', height:'300px', backgroundColor:'#ffc10754' }}><h6 style={{textAlign:'center',marginTop:'90%'}}> You can  upload up to 4 images</h6>  </div>*/}
            </div>
                {zoom? <ImgZoomIn imgUrl = {zoomImgUrl} close = {this.handleClose}/> :<span> </span>}
                </>
        )
    }
}
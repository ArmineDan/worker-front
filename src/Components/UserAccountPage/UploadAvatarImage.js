import React from 'react'
import {db, storage} from "../../firebase/fire";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../.././styles/AvatarStyle.css';


export default class UploadAvatarImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            url: "https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Avatars%2FDefaultAvatar.PNG?alt=media&token=d32bbf2a-c0b5-4593-8394-fd771001beda",
            completed: 0,
            fileName: 'No choose file'
        }
    }

    handleChange = (e) => {
        if (e.target.files[0]) {
            //const {image} = this.state;
            this.setState({
                image: e.target.files[0],
                fileName: e.target.files[0].name
            });

        }

    };
    handleUpload = () => {
        const {image} = this.state;
        if (image !== null) {
            const uploadTask = storage.ref(`Avatars/${image.name}`).put(image);
            uploadTask.on('state_changed',
                //progress function
                (snapshot) => {
                    //progress function
                    let percentage = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                    this.setState({completed: percentage})
                },
                //error function
                (error) => {
                    alert(error);
                },
                //complete function
                () => {
                    const {userId} = this.props;
                    storage.ref('Avatars').child(image.name).getDownloadURL()
                        .then(url => {
                            // console.log(url);
                            this.setState({url});
                            return db.collection('users').doc(userId).update({'avatar': url});

                        })
                })


        } else{

    alert('No choose file');
}
    };

    render(){
        const {url,fileName,completed} = this.state;
        return(
            <div>
                <img src={url } alt='' height='200' width='200'/>
                <br/>
                <p>{fileName}</p>
                <LinearProgress color="primary" variant="determinate" value={completed} width = '200'/>
                <br/>
                <br/>
                <Button
                    variant="contained"
                    component="label"
                    color='primary'
                >
                  Choose File
                    <input
                        onChange={this.handleChange}
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button>
                <Button variant="contained" color="primary" onClick= {this.handleUpload}>Upload</Button>
            </div>
        )
    }
}
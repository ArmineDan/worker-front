import React from 'react'
import {db, storage} from "../../firebase/fire";
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import '../.././styles/AvatarStyle.css';
import HighlightOff from '@material-ui/icons/HighlightOff'

export default class UploadAvatarImage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            completed: 0,
            avatar: '',
        }
    }
    uploadClick=()=>{
        this.setState({completed:0})
    };
    avatarImageDelete = ()=>{
        const {userId} = this.props;
         storage.ref(`Avatars/${userId}`)
        .delete().then(function() {
            console.log('File deleted successfully');
        }).catch(function(error) {
            console.log(error,"Uh-oh, an error occurred!");
        });

        this.setState({avatar:'https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Avatars%2FDefaultAvatar.PNG?alt=media&token=d32bbf2a-c0b5-4593-8394-fd771001beda'});
        return db.collection('users').doc(userId).update({'avatar': 'https://firebasestorage.googleapis.com/v0/b/varpet-com.appspot.com/o/Avatars%2FDefaultAvatar.PNG?alt=media&token=d32bbf2a-c0b5-4593-8394-fd771001beda'});
    };

    handleUpload = (e) => {
        if(e.target.files[0]) {
            const file = e.target.files[0];
            // console.log(file);
            const uploadTask = storage.ref(`Avatars/${this.props.userId}`).put(file);
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
                    storage.ref('Avatars').child(this.props.userId).getDownloadURL()
                        .then(url => {
                            // console.log(url);
                            this.setState({avatar: url});
                            return db.collection('users').doc(userId).update({'avatar': url});

                        });
                })
        }
    };


    render(){
        const { avatar,completed} = this.state;
        const {editable} = this.props;

        return(
            <div>
                 <HighlightOff  style={{display:editable?'block':'none'}} className= 'deleteAvatar' onClick={this.avatarImageDelete}/>
                { avatar ? <img src={avatar } alt='' height='200' width='200' className='bigAvatar'/> : <img src={this.props.avatar } alt=''  className='bigAvatar' />}
                <br/>
                <LinearProgress color="primary" variant="determinate" value={completed}/>
                <br/>
                <Button
                    variant="contained"
                    component="label"
                    color='primary'
                    className='MuiButton-containedPrimary'
                    onClick={this.uploadClick}
                >
                  Upload
                    <input
                        onChange={this.handleUpload}
                        type="file"
                        style={{ display: "none" }}
                    />
                </Button>
            </div>
        )
    }
}
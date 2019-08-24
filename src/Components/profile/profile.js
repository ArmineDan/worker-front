import React from 'react';
import Lightbox from './lightbox';
import "../../styles/profile.css";
import varpet from './img/varpet.jpg'
import Icon from '@material-ui/core/Icon';
import {getUserSkills,getUserData} from "../../firebase/fireManager";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myclass: '',
            user:this.props.data,
            photosUrl:'',
            userSkills:'',
            user_id_route:this.props.match.params.handle
        };
        console.log(this.props.match.params.handle,"this.props.match.params.handle")
    };

      componentDidMount() {
          const photos = [];
         let current_user=null;

          getUserData(this.state.user_id_route).then((d)=>{
              current_user=d
          //  console.log(d,"getUserData")
            d.url.map(src => {
                  let obj = {
                      'src': src,
                      'width': 4,
                      'height': 3
                  };
                  photos.push(obj);
              });

              getUserSkills(d.id).then(data => {

                  this.setState({
                      userSkills:data
                  })

              });
              this.setState({
                  user: current_user,
                  photosUrl: photos
              });
          }).catch((e)=>{
              this.props.history.push('/')
          })



      }
    close = () => {
        this.props.history.push('/')
    }

    render () {

        const {user,photosUrl,userSkills}=this.state;


        return (

            <div className='containerProf'>
                {user?<>
                <div className='transperentDiv'/>
                <div className="container-info">
                <div className = "centerProf">
                    <button title="Close" type="button" className="mfp-close" onClick={this.close}>×</button>

                    <div className='imgFlex'>
                        <div className ='imgDiv' style ={{backgroundImage:`url(${user.avatar})`} }>

                        </div>
                        <div className='info'>
                            <p className='pProf'>{user.firstName}&nbsp;{user.lastName}</p>
                            <p className='pAbout'>Hello, I'm {user.firstName} and I'm ready to help you! </p>
                            <div className='flexIcon'>
                                <div className='iconDiv'>
                                    <Icon style ={{fontSize: '25px'}} className='icon'>phone</Icon>
                                    <span className='spanProf'>{user.mobile}</span>
                                </div>
                                <div className='iconDiv'>
                                    <Icon style ={{fontSize: '25px'}} className='icon'>mail</Icon>
                                    <span className='spanProf'>{user.email}</span>
                                </div>
                                <div className='iconDiv'>
                                    <Icon style ={{fontSize: '25px'}} className='icon'>home</Icon>
                                    <span className='spanProf'>{user.address}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="skillDiv" className={this.state.myclass}/>
                    <div className ='skillLightbox'>

                        <div className='absolute'>
                            <div className='box'/>
                            <div className='flexSkill'>
                                <div className='skills'>
                                    <h3 className='headingSkill'>skills</h3>
                                    <ul className='listSkill'>
                                       {userSkills.length?userSkills.map((item, index)=>{
                                        return(
                                            <li key = {index}>{item}</li>
                                        )
                                    }):'No skills added yet'}

                                    </ul>
                                </div>
                            </div>

                            <div className='flexLightbox'>
                                <h3 className='headingLbox'>works done</h3>
                                <Lightbox photos = {photosUrl}/>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
                   </> :''}
            </div>
        )
    }
}
{/* <div className='buttonDiv'>

 <div className ='imgDiv' style={{backgroundImage:`url(${user.avatar})`}}>
 {/*<img className='img' src={user.avatar} />*/}

{/* <button onClick ={this.toggleButton} className='buttonProfile'>
 Skills
 </button> */}
{/*{this.state.show && <SkillDiv />}
 </div> */}
  

export default Profile;
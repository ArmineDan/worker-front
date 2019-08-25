import React from 'react';
import Lightbox from './lightbox';
import "../../styles/profile.css";
import varpet from './img/varpet.jpg'
import Icon from '@material-ui/core/Icon';
import {getUserSkills,getUserData, getSkillsData} from "../../firebase/fireManager";
import Loader from '../../loader';


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myclass: '',
            user:this.props.data,
            photosUrl:'',
            userSkills:'',
            user_id_route:this.props.match.params.handle,
            show_loading:false
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
                  console.log(data,"data-getUserSkills")
                  if(data.includes('8.Others')){
                      const data_filter=data.filter((el)=>el!=='8.Others');
                      this.makeData(data_filter,'8.Others')
                  }
                  else{
                      this.makeData(data)
                  }

                  // this.setState({
                  //     userSkills:data
                  // })
              });

              this.setState({
                  user: current_user,
                  photosUrl: photos
              });

          }).catch((e)=>{
              // this.props.history.push('/')
          })
      }
    close = () => {
        this.props.history.push('/')
    }



    makeData=(e,d)=>{
        // console.log(e,"skizb")
        const have_others_skill=d;
        const promises=[];
        let i=0;
        while(i<e.length){
            promises.push(getSkillsData(e[i]));
            i++;
        }
        Promise.all(promises).then(values => {
            const data=[];
            for(let i=0; i<values.length; i++){
                data.push(values[i][0][0]);
            }
            // console.log(data,"datadatadata");
            if(have_others_skill){
                data.push({name:'Others',id:'8.Others'});
            }

            this.setState({
                userSkills:data,

            });
            setTimeout(()=>{

                this.setState({
                    show_loading:true
                })
            },0)

        }).catch((e) => {
            console.log(e,"value")})
    };

    render () {
        const {user,photosUrl,userSkills, show_loading}=this.state;
        return (
            <div className='containerProf'>
                {show_loading?<>
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
                                            <li key = {index}>{item.name}</li>
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
                   </> :<Loader/>}
            </div>
        )
    }
}


export default Profile;
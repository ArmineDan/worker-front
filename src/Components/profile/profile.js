import React from 'react';
import Lightbox from './lightbox';
import "../../styles/profile.css";
import varpet from './img/varpet.jpg'
import Icon from '@material-ui/core/Icon';




class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {myclass: ''};
    };
    /*toggleButton = () => {
        const{show} = this.state;
        this.setState({show: !show})
      }*/
      toggleButton =()=> {
        if (this.state.myclass === '') {
         this.setState({
          myclass: 'skillClass'
         })
        }
       else {
        this.setState({
          myclass: '',
        })
       }
      }
    render () {
        return (
            <div className="container">
                <div className = "centerProf">
                    <div className='imgFlex'>
                        <div className ='imgDiv'>
                            <img className='img' src={varpet}/>
                        </div>
                        <div className='info'>
                            <p className='pProf'>Name Surname</p>
                            <p className='pAbout'>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.</p>
                            <div className='flexIcon'>
                                <div className='iconDiv'>
                                    <Icon style ={{fontSize: '25px'}} className='icon'>phone</Icon>
                                    <span className='spanProf'>+374 99 99 99 99</span>
                                </div>
                                <div className='iconDiv'>
                                    <Icon style ={{fontSize: '25px'}} className='icon'>mail</Icon>
                                    <span className='spanProf'>anun.azganun@gmail.com</span>
                                </div>
                                <div className='iconDiv'>
                                    <Icon style ={{fontSize: '25px'}} className='icon'>home</Icon>
                                    <span className='spanProf'>Province</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id="skillDiv" className={this.state.myclass}></div>
                    <div className ='skillLightbox'>
                        {/* <div className='buttonDiv'>
                            <button onClick ={this.toggleButton} className='buttonProfile'>
                                Skills
                            </button>
                            {/*{this.state.show && <SkillDiv />}
                        </div> */}
                        <div className='absolute'>
                            <div className='box'></div>
                            <div className='flexSkill'>
                                <div className='skills'>
                                    <h3 className='headingSkill'>skills</h3>
                                    <ul className='listSkill'>
                                        <li>eating</li>
                                        <li>drinking</li>
                                        <li>smoking</li>
                                    </ul>
                                </div>
                            </div>

                            <div className='flexLightbox'>
                                <h3 className='headingLbox'>works done</h3>
                                <Lightbox />
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        )
    }
}


/*class SkillDiv extends React.Component {
    render() {
      return (
          <div className = 'childDiv'></div>    
      )
    }
  }*/
  

export default Profile;



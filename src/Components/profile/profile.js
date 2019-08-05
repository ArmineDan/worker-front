import React from 'react';
import "../../styles/profile.css";
import varpet1 from './img/varpet1.png';
import Icon from '@material-ui/core/Icon';
import { Transition } from 'react-transition-group';





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
                <div className = "center">
                    <div className ='imgDiv'>
                        <img className='img' src={varpet1}/>
                    </div>
                    <div className='name'>
                        <p>Name Surname</p>
                    </div>
                    <div id="skillDiv" className={this.state.myclass}></div>
                    <div className ='dark'>
                        <div className='iconDiv'>
                            <Icon style ={{fontSize: '30px'}} className='icon'>phone</Icon>
                            <span>+374 99 99 99 99</span>
                        </div>
                        <div className='iconDiv'>
                            <Icon style ={{fontSize: '30px'}} className='icon'>mail</Icon>
                            <span>anun.azganun@gmail.com</span>
                        </div>
                        <div className='textDiv'>
                            <h5 className='heading'>About</h5>
                            <textarea className='text'>Hello, I'm William...Nothing to add</textarea>
                        </div>
                        <div className='buttonDiv'>
                            <button onClick ={this.toggleButton} className='button'>
                                Skills
                            </button>
                            {/*{this.state.show && <SkillDiv />}*/}
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
export default Profile



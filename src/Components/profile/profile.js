import React from 'react';
import { useState, useCallback } from "react";
import Lightbox from './lightbox';
import "../../styles/profile.css";
import varpet1 from './img/varpet1.png';
import Icon from '@material-ui/core/Icon';
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";
import {photos}  from "./photos";



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            myclass: '',
            user:this.props.data

        };
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
      componentDidMount(){
          this.setState({
              user: this.props.data
          })
      }
    render () {
        const {user}=this.state;
        const {close}=this.props;

        return (
            <div className="container-info">
                <div className = "centerProf">
                    <div className ='imgDiv' style={{backgroundImage:`url(${user.avatar})`}}>
                        {/*<img className='img' src={user.avatar} />*/}
                    </div>
                    <button title="Close" type="button" className="mfp-close" onClick={close}>×</button>
                    <div className='name'>
                        <p className='pProf'>{user.firstName}&nbsp;{user.lastName}</p>
                    </div>
                    <div id="skillDiv" className={this.state.myclass}></div>
                    <div className ='dark'>
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
                        <div className='textDiv'>
                            <h5 className='heading'>About</h5>
                            <textarea className='text' defaultValue={`Hello, I'm ${user.firstName} and I'm ready to help you!`}/>
                        </div>
                        <div className='buttonDiv'>
                            <button onClick ={this.toggleButton} className='buttonProfile'>
                                Skills
                            </button>
                            {/*{this.state.show && <SkillDiv />}*/}
                        </div>
                    </div>
                </div>
                <Lightbox />
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



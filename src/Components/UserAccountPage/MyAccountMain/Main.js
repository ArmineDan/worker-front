import React from 'react';
import  SkillList from '../SkillList/CategList';
import  Header from '../../header/header';
import  UserInfo from './userInfo';
import  HeaderSkillList from './skillistHeader';
import  MySkills from './userSkilllist';
import  '../../../styles/my-Account/style.css';





class MyAccountMain extends React.Component{
    constructor(){
        super();
        this.state = {

        };
    }


    componentDidUpdate(){

    }
    render(){

        return (
            <div>
                <Header/>
            <section id="my-accont" style={{marginBottom: '0px'}}>
                <div className="content-wrap">
                    <div className="container clearfix">
                        <div className="row clearfix center">
                            <div className="col-md-12">
                                <HeaderSkillList/>
                            </div>
                            <div className="col-md-6">
                                <UserInfo/>
                                    <MySkills/>
                            </div>

                            <div className="col-md-6">

                                <div className="col-md-12">
                                    <SkillList/>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </div>
        );
    }
}

export default MyAccountMain;

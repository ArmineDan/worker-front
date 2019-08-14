import React from 'react';
import  SkillList from '../SkillList/CategList';
import  Header from '../../header/header';
import  UserInfo from './userInfo';
import  HeaderSkillList from './skillistHeader';
import  MySkills from './userSkilllist';
import  Lightbox from '../../profile/lightbox';
import  '../../../styles/my-Account/style.css';
import {getUserSkills,getSkillsData,getUserData,removeSkillFromUserList} from  '../../../firebase/fireManager';





class MyAccountMain extends React.Component{
    constructor(){
        super();
        this.state = {
        skils_id:[],
            user:[]
        };
    }
   delete_skill=(e,index)=>{
       const {skils_id}=this.state;


    removeSkillFromUserList('R0x1ZhmoJ8qL9xKcpzPZ',e).then((data)=>{
        if(data){

            skils_id.splice(index,1)
            this.setState({
                skils_id
            })

        }
    // console.log(data,"delete_skill")

 }).catch((e) => {
     console.log(e,"delete_skill")})


}

    componentDidMount(){
        getUserData('R0x1ZhmoJ8qL9xKcpzPZ').then((data)=>{
           // console.log(data);
           // Q1tIr2QtPrcOG67AY9fGmLL4jxx1
            this.setState({
                user:data
            })
        }).catch((e) => {
            console.log(e,"getUserData")})
        getUserSkills('R0x1ZhmoJ8qL9xKcpzPZ').then((data)=>{
            //console.log(data,'data')
            this.makeData(data)
        }).catch((e) => {
            console.log(e,"getUserSkills")})

    }

    get_sub=(e)=>{
        const {skils_id}=this.state
        const arr=skils_id;
        arr.push(e)
        this.setState({
            skils_id:arr
        })
        //console.log(e,"fromtaa")
    }

    makeData=(e)=>{
        // console.log(e,"skizb")

        const promises=[];
        let i=0;
        while(i<e.length){
            promises.push(getSkillsData(e[i]))
            i++;
        }
        Promise.all(promises).then(values => {
            const data=[]
            for(let i=0; i<values.length; i++){
                data.push(values[i][0][0]);
            }
          console.log(data,"datadatadata")
            this.setState({
                skils_id:data
            })

        }).catch((e) => {
            console.log(e,"value")})
    }

    render(){

        const {skils_id,user}=this.state
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
                                <UserInfo data={user}/>
                                    <MySkills skills={skils_id} delete={this.delete_skill} />
                                <Lightbox />
                            </div>

                            <div className="col-md-6">
                                <div className="col-md-12">
                                    <SkillList get_sub={this.get_sub}/>

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

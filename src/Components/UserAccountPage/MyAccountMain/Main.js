import React from 'react';
import  SkillList from '../SkillList/CategList';
import  Header from '../../header/header';
import  UserInfo from './userInfo';
import  HeaderSkillList from './skillistHeader';
import  MySkills from './userSkilllist';
import  '../../../styles/my-Account/style.css';
import {getUserSkills,getSkillsData,getUserData,removeSkillFromUserList} from  '../../../firebase/fireManager';
import Footer from "../../Footer/Footer";
import UploadWorksImage from "../uploadUsersWorksImage";



class MyAccountMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        skils_id:[],
            user:[],
        };
    }
   delete_skill=(e,index)=>{
       const {skils_id}=this.state;
    removeSkillFromUserList(this.props.location.state.userId,e).then((data)=>{
        if(data){
            skils_id.splice(index,1);
            this.setState({
                skils_id
            })
        }
    // console.log(data,"delete_skill")
 }).catch((e) => {
     console.log(e,"delete_skill")})

};
    delete_skill_Toggle=(e)=>{
       // console.log(e,"togleeeeeeeeeeee")
        const {skils_id}=this.state;
        let index=null;
        for(let i=0; i < skils_id.length; i++){
             if(skils_id[i]['id']=== e.id){
                 index=i
             }
        }
        skils_id.splice(index,1);
        this.setState({
            skils_id
        })
       // console.log(skils_id,"skils_id_togleeeeeeeeeeee")

};
refresh_user_data=()=>{
    getUserData(this.props.location.state.userId).then((data)=>{
        // console.log(data);
        this.setState({
            user:data
        })
    }).catch((e) => {
        console.log(e,"getUserSkills")})

};

   componentDidMount(){

       if(this.props.location.state){
           getUserData(this.props.location.state.userId).then((data)=>{
               // console.log(data);
               this.setState({
                   user:data
               })
           }).catch((e) => {
               console.log(e,"getUserData")});
           getUserSkills(this.props.location.state.userId).then((data)=>{
               //console.log(data,'data')
               this.makeData(data)
           }).catch((e) => {
               console.log(e,"getUserSkills")})
       }
       else{
           this.props.history.push(
                '/'
           )
       }


    }

    get_sub=(e)=>{
        const {skils_id}=this.state;
        const arr=skils_id;
        arr.push(e);
        this.setState({
            skils_id:arr
        })
        //console.log(e,"fromtaa")
    };
    goTop=()=>{
        window.scroll(0,0);
        this.anim(0,"gotoTop")
    };

    makeData=(e)=>{
        // console.log(e,"skizb")

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
            this.setState({
                skils_id:data
            })

        }).catch((e) => {
            console.log(e,"value")})
    };

    render(){
        const {skils_id,user}=this.state;
        return (
            <div>
                <Header user_status={user.id}  />
            <section id="my-accont" style={{marginBottom: '0px'}}>
                <div className="content-wrap">
                    <div className="container clearfix">
                        <div className="row clearfix center">
                            <div className="col-md-12">
                                <HeaderSkillList/>
                            </div>
                            <div className="col-md-6">
                                <UserInfo data={user} refresh={this.refresh_user_data}/>
                                    <MySkills skills={skils_id} delete={this.delete_skill} />
                                {user.id? <UploadWorksImage userId ={user.id} url={user.url}/>:<span> </span>}

                            </div>
                            <div className="col-md-6">
                                <div className="col-md-12">
                                    { user.id ? <SkillList userId ={user.id} get_sub={this.get_sub} delete_skill_Toggle={this.delete_skill_Toggle} />:<span> </span>}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
                <div id="gotoTop" onClick={this.goTop}>
                    <i className="material-icons" style={{top: '6px', position: 'relative'}}>
                        keyboard_arrow_up
                    </i>
                </div>
                <Footer/>
            </div>
        );
    }
}

export default MyAccountMain;

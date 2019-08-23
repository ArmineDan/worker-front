import React from 'react';
import  SkillList from '../SkillList/CategList';
import  Header from '../../header/header';
import  UserInfo from './userInfo';
import  HeaderSkillList from './skillistHeader';
import  MySkills from './userSkilllist';
import  '../../../styles/my-Account/style.css';
import {getUserSkills,getSkillsData,getUserData,removeSkillFromUserList} from  '../../../firebase/fireManager';
import Footer from "../../Footer/Footer";
import {fire} from '../../../firebase/fire';
import Loader from '../../../loader';
import {connect} from 'react-redux';
import UploadWorksImage from "../uploadUsersWorksImage";





class MyAccountMain extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        skils_id:[],
        user:[],
        show_loading:false
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
       fire.auth().onAuthStateChanged((user) => {
           if (user) {
               this.props.set_user_status(user);

           } else {
               console.log(user,"elsee")
           }
       });


       if(this.props.location.state){
           getUserData(this.props.location.state.userId).then((data)=>{
               // console.log(data);
               this.setState({
                   user:data
               })
           }).catch((e) => {
               console.log(e,"getUserData")});

           getUserSkills(this.props.location.state.userId).then((data)=>{
                if(data.includes('8.Others')){
                    const data_filter=data.filter((el)=>el!=='8.Others');
                    this.makeData(data_filter,'8.Others')
                }
                else{
                    this.makeData(data)
               }
           //console.log(data,'data-getUserSkills')

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
    goHome=(e)=>{
       this.props.set_show_info(e)
        this.props.history.push('/')
    };
    anim=(type, id )=>{
        const elem = document.getElementById(id);
        if(elem){
            elem.style.transition='opacity 0.4s  cubic-bezier(0.4, 0, 0.2, 1)';
            elem.style.opacity=type;
            elem.style.zIndex=type?0:-1;
        }
    };
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
                skils_id:data,

            });
            setTimeout(()=>{

                this.setState({
                    show_loading:true
                })
            },0)

        }).catch((e) => {
            console.log(e,"value")})
    };

    componentDidUpdate(){
        window.addEventListener("scroll",()=>{
           window.pageYOffset>40? this.anim(1,"gotoTop"): this.anim(0,"gotoTop")
        })



    };


    render(){
        const {skils_id,user,show_loading}=this.state;
        return (
            <div>
                {!show_loading?<Loader/>:<>
                <Header user_status={user.id}  data="account"  goHome={this.goHome}/>
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
                <Footer/></>
                }
            </div>
        );
    }
}

const store = store => ({
    is_login: store.user_status,
});

const dispatch = dispatch => ({
    set_user_status:list => dispatch({type:'SET_USER_STATUS', payload:list}),
    set_show_info:list => dispatch({type:'SHOW_HOW_IT_WORKS', payload:list}),
});

export default connect(
    store,
    dispatch
)(MyAccountMain)




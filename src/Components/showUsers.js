import React from 'react';
import PrimarySearchAppBar from './header/header';
import {getUsers_IdBySkills,getUserData} from "../firebase/fireManager";
import MediaCard from './workers';
import {Link} from "react-router-dom";
import Footer from './Footer/Footer';
import SubCategories from "./subCat";



class showUsers extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            sub_name:this.props.match.params.sub_name,
            sub:[],
            open_users_list: false,
            users: [],

        };

    }

    componentDidMount() {
        const {sub_name}=this.state;
        //console.log(sub_name,"cat_id")
        if(sub_name==='Others'){
            getUsers_IdBySkills('8.Others').then((data)=>{
                // console.log(data,"others_data")
                this.makeData(data)
            }).catch((err)=>{
                console.log(err)
            })
        }
        else{
            getUsers_IdBySkills(sub_name).then((data)=>{
                this.makeData(data)
            }).catch((err)=>{
                console.log(err)
            })
        }

    }
    makeData=(e)=>{
        // console.log(e,"skizb")

        const promises=[];
        let i=0;
        while(i<e.length){
              promises.push(getUserData(e[i]));
            i++;
        }
        Promise.all(promises).then(values => {
            this.showUsers(true, values);

        }).catch((e) => {
            this.showUsers(true,[]);
            console.log(e)})
    }
    anim = (type, id) => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.style.transition = 'opacity 0.4s  cubic-bezier(0.4, 0, 0.2, 1)';
            elem.style.opacity = type;
            elem.style.zIndex = type ? 1 : -1;
        }

    }
    goTop = () => {
        window.scroll(0, 0);
        this.anim(0, "gotoTop")
    };
    showUsers = (e, data) => {
        this.setState({
            open_users_list: e,
            users: data,
        });
        const elem = document.getElementById("masters") && document.getElementById("masters").offsetTop;
        window.scroll(0, elem);
        this.anim(1, "gotoTop")

        //console.log(elem,"data-App")

    };



    render(){
        const {open_users_list, users}=this.state;
        const draw_users = users.length ? users.map((item, index) => {
            return (
                <MediaCard key={index} users_list={item} />
            )
        }) : (
            <div className="no-masters col-lg-12"><h4>Unfortunately we do not have masters registered in this profession
                yet</h4></div>)
        return(
            <div className="App">
                <header className="App-header">
                    <PrimarySearchAppBar/>
                    {/*< SubCategories />*/}
                            <section id="masters" style={{marginBottom: '0px'}}>
                                {open_users_list ?
                                    <div className="container clearfix">
                                    <div className="row clearfix center divcenter">
                                        <div className="col-lg-12">
                                            <div className="heading-block center">
                                                <h3>Our Masters</h3>
                                                <span>Trust your works to our masters.</span>
                                            </div>
                                        </div>
                                        {draw_users}
                                    </div>
                                </div>
                            : null}
                            </section>



                </header>
                <div id="gotoTop" onClick={this.goTop}>
                    <i className="material-icons" style={{top: '6px', position: 'relative'}}>
                        keyboard_arrow_up
                    </i>
                </div>
                <Footer/>
            </div>
        )
    }

}
export default  showUsers;

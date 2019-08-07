import React,{useState,useEffect} from 'react';
import './styles/App.css';
import Categories from './Components/Categories';
import PrimarySearchAppBar from './Components/header/header';
//import Login from './Components/header/login';
//import Register from'./Components/header/register';
import Footer from './Components/Footer/Footer';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
//import Profile from './Components/profile/profile';
import MediaCard from './Components/workers';



class App extends React.Component{
    constructor(){
        super();
        this.state = {
            open_users_list:false,
            users:[],


        };
    }

   showUsers=(e,data)=>{
       let u_data=[];
       if(data.length && data[0].users){
           u_data=Object.values(data[0].users)
       }
       this.setState({
           open_users_list:e,
           users:u_data,
       })
       console.log(u_data,"data-App")

    }
render(){
        const {open_users_list,users}=this.state
    console.log(users,"users-App")
    const draw_users=users.length?users.map((item,index)=>{
            return (
                <MediaCard key={index} users_list={item} />
            )
    }):(<div className="no-masters col-lg-12">Unfortunately we do not have masters registered in this profession yet</div>)
    return (
        <div className="App">
            <header className="App-header">
                <PrimarySearchAppBar/>
                <Categories showUsers_Lists={this.showUsers}/>
                {open_users_list?
                    <section id="masters" style={{marginBottom: '0px'}}>
                        <div className="container clearfix">
                            <div className="row clearfix center divcenter" >
                                <div className="col-lg-12">
                                <div className="heading-block center">
                                    <h3>Our Masters</h3>
                                    <span>Trust your works to our masters.</span>
                                </div>
                                </div>
                        {draw_users}
                            </div>
                        </div>
                    </section>
                        :null}
                {/*<Register/>*/}
                {/*<Login/>*/}
            </header>
            <Footer/>
        </div>
    );
}

}

export default App;

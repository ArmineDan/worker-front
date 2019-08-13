import React from 'react';
import './styles/App.css';
import Profile from './Components/profile/profile';
// import Categories from './Components/Categories';
// import PrimarySearchAppBar from './Components/header/header';
// //import Login from './Components/header/login';
// //import Register from'./Components/header/register';
// import Footer from './Components/Footer/Footer';
// //import Profile from './Components/profile/profile';
// import MediaCard from './Components/workers';



class App extends React.Component{
    constructor(){
        super();
        this.state = {
            open_users_list:false,
            users:[],


        };
    }

   showUsers=(e,data)=>{
       this.setState({
           open_users_list:e,
           users:data,
       });
      const elem = document.getElementById("masters") && document.getElementById("masters").offsetTop;
      window.scroll(0,elem)
       //console.log(elem,"data-App")

    }

render(){
     const {open_users_list,users}=this.state;
    const draw_users=users.length?users.map((item,index)=>{
            // return (
            //     <MediaCard key={index} users_list={item} />
            // )
    }):(<div className="no-masters col-lg-12"><h4>Unfortunately we do not have masters registered in this profession yet</h4></div>)
    return (
        <div className="App">
            <header className="App-header">
                {/* <PrimarySearchAppBar/>
                <Categories showUsers_Lists={this.showUsers}/> */}
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
                        <Profile />
                {/*<Register/>*/}
                {/*<Login/>*/}
            </header>
            {/* <Footer/> */}
        </div>
    );
}
}

export default App;

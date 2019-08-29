import React from 'react';
import PrimarySearchAppBar from './header/header';
import {getCategityIdByName,getsubCategories} from "../firebase/fireManager";
import Footer from './Footer/Footer';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ShowUsers from "./showUsers";
import {connect} from 'react-redux';



class SubCategories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cat_name:this.props.match?this.props.match.params.cat_name:'Bathroom',
            sub:[]
        };

    }

    componentDidMount() {
        const {cat_name}=this.state;

            getCategityIdByName(cat_name).then((cat_id)=>{
                this.getSub(cat_id);
                //console.log(cat_id,"cat_id")
            }).catch((e)=>{console.log(e,"error-sub")})


    }

    getSub=(cat_id)=>{
    getsubCategories(cat_id).then(data =>{
          // console.log(data,"data-getsubCategories")
        this.setState({
            sub:data
        })

        });
}

    render(){
        const {cat_name,sub}=this.state;
       // console.log(cat_name,"cat_idcat_idcat_id");
        const show_cat= sub.length?sub.map((item, index)=>{
            return(
                <Link key={index} to={{ pathname:`/${cat_name}/${item.id}`}} style={{width: '100%'}} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                <div>
                    <div data-id={item.id}  className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder cat">
                        <div className="fbox-icon">
                            <i className={item.icon_class}/>
                        </div>
                        <span className="pointer"><h3>{item.name}</h3></span>
                    </div>
                </div>
                </Link>
            )
        }):'';
        return(
            <div className="App">
                <header className="App-header">
                    {this.props.match?<PrimarySearchAppBar/>:null}
            <section id="content" style={{marginBottom: '0px'}}>
                <div className="content-wrap">
                    <div className="container clearfix">
                        <div className="row clearfix center divcenter" >
                            <div className="col-lg-12">
                                <div className="heading-block title-center-own center">
                                    <h3>Categories</h3>
                                    <span>Browse Masters By Categories</span>

                                </div>

                                <div id="faqs-list">
                                    <div  className="row align-items-stretch grid-border clearfix">
                                        {show_cat}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>


                </header>
                <Router>
                    <Route  exact path='/:cat_name/:sub_name' component={ShowUsers}/>
                </Router>
                {this.props.match? <Footer/>:null}
            </div>
        )
    }

}


const store = store => ({
    show_info: store.showInfo
});

const dispatch = dispatch => ({
    set_user_status: list => dispatch({type: 'SET_USER_STATUS', payload: list}),

});

export default connect(
    store,
    dispatch
)(SubCategories)



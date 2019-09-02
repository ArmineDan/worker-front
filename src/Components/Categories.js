import React from 'react';
import '../styles/category/category-comp.css';
import '../styles/category/construction-icons.css';
import {Link} from "react-router-dom";
import '../styles/category/bootstrap.css';
import {getActiveCategories} from "../firebase/fireManager";





class Categories extends React.Component{
    constructor(){
        super();
        this.state = {
            items:[],
            sub_items:[],
            show:false,
            breadcrumb:[],


        };
        this.click_counts=0;
        this.nav={};
      this.nav_arr=['Home'];
    }


    componentDidMount() {
        getActiveCategories().then(data => {
            for (let i=0; i<data.length; i++){
               let key= data[i].id;
                this.nav[key]=data[i].name
            }
         //console.log(nav," navvv");
            this.setState({items:data});
         //console.log(data,"datadatadata")
        });
    }

    GoHome=()=>{
        this.click_counts=0;
        this.nav_arr=[];
        this.nav_arr.push('Home');
        this.setState({
            show:false,
            breadcrumb:this.nav_arr });
        this.props.showUsers_Lists(false, []);
        };


    render(){

        const {items}=this.state;
        const div_cat = items.map((item, index)=>{
            return(
                <Link   key={index}   to={{ pathname:`/${item.name==='Others'?'Category/Others':item.name}`}} style={{width: '100%'}} className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
                    <div>
                        <div className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder cat" >
                            <div className="fbox-icon">
                                <i className={item.icon_class}/>
                            </div>
                            <span className="pointer" ><h3>{item.name}</h3></span>
                        </div>
                    </div>
            </Link>
            )
        });

        return(

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
                                        {div_cat}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
          </section>


        )
    }
}

export default  Categories;

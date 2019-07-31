import React from 'react';
import '../styles/category/category-comp.css';
import '../styles/category/construction-icons.css';
import {db} from '../fire';


import '../styles/category/bootstrap.css';
import {getActiveCategories,getsubCategories} from "../firebase/fireManager";

const nav={};
let nav_arr=['Home'];
export default  class Categories extends React.Component{
    state = {
        items:[],
        sub_items:[],
        show:false,
        breadcrumb:[]

    };

    componentDidMount() {
        getActiveCategories().then(data => {
            for (let i=0; i<data.length; i++){
               let key= data[i].id;
                nav[key]=data[i].name
            }
           // console.log(nav," navvv");
            this.setState({items:data});
           // console.log(data,"datadatadata")
        });
    }

    GoHome=()=>{
        nav_arr=[];
        nav_arr.push('Home');
        this.setState({
            show:false,
            breadcrumb:nav_arr      });
        }

    openSubCategories=(e,id)=>{
        e.stopPropagation();
        let cat_id;
        if(id ==='this-is-a-tag'){
           cat_id=e.target.parentNode.parentNode.id;
        }
        else{
            cat_id=e.target.id;
        }
       // console.log(cat_id,"eeeeeeee");

        nav_arr.push(nav[cat_id]);
       getsubCategories(cat_id).then(data =>{
               this.setState({
                   sub_items: this.render_sub_Categories(data),
                   show:true,
                   breadcrumb:nav_arr
               });

              // console.log(data,"data")
       }
          );
    };

    render_sub_Categories=(sub)=>{
        return sub.map((item, index)=>{
            return(
                <div key={index} className="col-lg-3 col-md-6">
                    <div id={item.id} className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                        <div className="fbox-icon">
                            <i className={item.icon_class}/>
                        </div>
                        <span  className="pointer" ><h3>{item.name}</h3></span>
                    </div>
                </div>
            )
        });
    };
    render(){

        const {items,breadcrumb}=this.state;

        const div_cat = items.map((item, index)=>{
            return(
                    <div key={index} className="col-lg-3 col-md-6">
                        <div id={item.id} className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder"
                             onClick={(e,id = 'div')=>{this.openSubCategories(e,id)}}>
                            <div className="fbox-icon" onClick={(e,elem = 'this-is-a-tag')=>{this.openSubCategories(e,elem)}}>
                                <i className={item.icon_class}/>
                            </div>
                            <span className="pointer" onClick={(e,elem = 'this-is-a-tag')=>{this.openSubCategories(e,elem)}}><h3>{item.name}</h3></span>
                        </div>
                    </div>
            )
        });
        const nav = breadcrumb.length===1?null: breadcrumb.map((item, index)=>{
            return(
                    <li key={index} className={`breadcrumb-item ${item ==='Home'?'active':null}`} onClick={item ==='Home'?this.GoHome:null}><a href="#">{item}</a></li>
            )
       });
        return(
          <section id="content" style={{marginBottom: '0px'}}>
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="row clearfix center divcenter" >
                                <div className="col-lg-12">
                                    <div className="heading-block center">
                                        <h3>Construction Job Carrers</h3>
                                        <span>Browse Construction &amp; Extraction Job Descriptions By Job Titles</span>
                                        <ol className="breadcrumb" >
                                            {nav}
                                        </ol>
                                    </div>

                                    <div id="faqs-list">
                                        <div  className="row align-items-stretch grid-border clearfix">
                                        {!this.state.show?div_cat:this.state.sub_items}
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


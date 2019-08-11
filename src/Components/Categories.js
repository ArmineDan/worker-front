import React from 'react';
import '../styles/category/category-comp.css';
import '../styles/category/construction-icons.css';
import {getUsers_IdBySkills,getUserData} from '../firebase/fireManager';


import '../styles/category/bootstrap.css';
import {getActiveCategories,getsubCategories} from "../firebase/fireManager";

const nav={};
let nav_arr=['Home'];

class Categories extends React.Component{
    constructor(){
        super();
        this.state = {
            items:[],
            sub_items:[],
            show:false,
            breadcrumb:[]

        };
    }


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
            breadcrumb:nav_arr });
        this.props.showUsers_Lists(false, []);
        };

  showUsers=(e)=>{
       e.stopPropagation();
       const elem = e.target.parentNode;
       const sub = document.getElementsByClassName('sub');
      let sub_id=e.target.getAttribute('data-id')


      if(!elem.classList.contains("check")){
          for(let i=0; i<sub.length; i++){
              if(sub[i].classList.contains("check")){
                  sub[i].classList.remove('check')
              }
          }
           elem.classList.add('check')
      }
      getUsers_IdBySkills(sub_id).then((data)=>{
             this.makeData(data)
          }).catch((err)=>{
              console.log(err)
          })


    }
 makeData=(e)=>{
   // console.log(e,"skizb")
     const self=this.props;
    const promises=[];
    let i=0;
    while(i<e.length){
        promises.push(getUserData(e[i]))
    i++;
    }
     Promise.all(promises).then(values => {
         self.showUsers_Lists(true, values);

     }).catch((e) => {
         self.showUsers_Lists(true,[]);
         console.log(e)})
     }




    openSubCategories=(e,id)=>{
       e.stopPropagation();
        let cat_id;
        cat_id=e.target.getAttribute('data-id')
       // console.log(cat_id,"cat_id")
       nav_arr.push(nav[cat_id]);
       getsubCategories(cat_id).then(data =>{
              // console.log(data,"data")
               this.setState({
                   sub_items: this.render_sub_Categories(data),
                   show:true,
                   breadcrumb:nav_arr
               });
       });
    };

    render_sub_Categories=(sub)=>{
        return sub.map((item, index)=>{
            return(
                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12 sub">
                    <div data-id={item.id}  className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder cat" onClick={(e)=>{this.showUsers(e)}}>
                        <div className="fbox-icon" data-id={item.id} onClick={(e)=>{this.showUsers(e)}}>
                            <i className={item.icon_class} data-id={item.id} onClick={(e)=>{this.showUsers(e)}}/>
                        </div>
                        <span  className="pointer"  data-id={item.id} onClick={(e)=>{this.showUsers(e)}}><h3 data-id={item.id} onClick={(e)=>{this.showUsers(e)}}>{item.name}</h3></span>
                    </div>
                </div>
            )
        });
    };
    render(){

        const {items,breadcrumb,sub_items,show}=this.state;

        const div_cat = items.map((item, index)=>{
            return(
                    <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
                        <div  data-id={item.id} className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder cat"
                             onClick={(e)=>{this.openSubCategories(e)}}>
                            <div className="fbox-icon" data-id={item.id}  onClick={(e)=>{this.openSubCategories(e)}}>
                                <i className={item.icon_class} data-id={item.id} onClick={(e)=>{this.openSubCategories(e)}} />
                            </div>
                            <span className="pointer" data-id={item.id}  onClick={(e)=>{this.openSubCategories(e)}}><h3 data-id={item.id}  onClick={(e)=>{this.openSubCategories(e)}}>{item.name}</h3></span>
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
                                        <h3>Construction Job Careers</h3>
                                        <span>Browse Construction Job Descriptions By Job Titles</span>
                                        <ol className="breadcrumb" >
                                            {nav}
                                        </ol>
                                    </div>

                                    <div id="faqs-list">
                                        <div  className="row align-items-stretch grid-border clearfix">
                                        {!show?div_cat:sub_items}
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

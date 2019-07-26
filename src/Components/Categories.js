import React from 'react';
import '../styles/category/category-comp.css';
import '../styles/category/construction-icons.css';
import {db} from '../fire';


import '../styles/category/bootstrap.css';

let categories=[];
export default  class Categories extends React.Component{
    state = {
       item:{},
        categories:[]
    };

    componentDidMount() {
        db.collection('Categories').where("status", "==", true).get().then((snapshot) => {
            snapshot.docs.forEach((doc)=>{
                console.log(doc.data());
                this.setState({
                    item: doc.data(),

                });
                categories.push(this.state.item)

            })
        })
    }
    render(){
        console.log(categories,"categories");
        const div_cat = categories.map((item, index)=>{
            return(

                    <div key ={index} className="col-lg-3 col-md-6">
                        <div className="feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder">
                            <div className="fbox-icon">
                                <i className={item.icon_class}/>
                            </div>
                            <a href="#"><h3>{item.name}</h3></a>
                        </div>
                    </div>

            )
        });


        return(
          <section id="content" style={{marginBottom: '0px'}}>
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="row clearfix center divcenter" style={{maxWidth: '960px'}}>
                                <div className="col-lg-12">
                                    <div className="heading-block center">
                                        <h3>Construction Job Carrers</h3>
                                        <span>Browse Construction &amp; Extraction Job Descriptions By Job Titles</span>
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


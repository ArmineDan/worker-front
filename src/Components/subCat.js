import React from 'react';
import {getCategityIdByName,getsubCategories} from "../firebase/fireManager";
import ShowUsers from "./showUsers";
import {connect} from 'react-redux';
import Loader from '../loader';




class SubCategories extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            cat_name:this.props.match.params.cat_name,
            sub:[],
            sub_name:this.props.match.params.sub_name
        };

    }

    componentDidMount() {
        const {cat_name}=this.state;

            getCategityIdByName(cat_name).then((cat_id)=>{
                this.getSub(cat_id);
                //console.log(cat_id,"cat_id")
            }).catch((e)=>{console.log(e,"error-sub")})


    }
    test=(e)=>{
        e.stopPropagation();
        const {cat_name}=this.state;
        const elem = e.target.parentNode;
        const sub = document.getElementsByClassName('sub');



        if(!elem.classList.contains("check")){
            for(let i=0; i<sub.length; i++){
                if(sub[i].classList.contains("check")){
                    sub[i].classList.remove('check')
                }
            }
            elem.classList.add('check')
        }
    //    console.log(e.target.getAttribute('data-id'),"teseeeeeeeeeeeeeeeeee")
        this.props.history.push(`/${cat_name}/${e.target.getAttribute('data-id')}`)
        this.setState({
            sub_name:e.target.getAttribute('data-id')
        })
    }

    getSub=(cat_id)=>{
    getsubCategories(cat_id).then(data =>{
   //   console.log(data,"data-getsubCategories")
        this.setState({
            sub:data
        })

        });
}

    render(){
        const {sub, sub_name,cat_name}=this.state;
   // console.log(sub_name,"cat_idcat_idcat_id");
        const show_cat= sub.length?sub.map((item, index)=>{
            return(

                <div key={index} className="col-lg-3 col-md-6 col-sm-6 col-xs-12 sub " data-id={item.id} onClick={this.test}>
                    <div data-id={item.id}  className="pointer feature-box fbox-center fbox-dark fbox-plain fbox-small nobottomborder cat"  onClick={this.test}>
                        <div className="fbox-icon"  data-id={item.id} onClick={this.test}>
                            <i className={item.icon_class}  data-id={item.id} onClick={this.test}/>
                        </div>
                        <span className="pointer"  data-id={item.id} onClick={this.test} ><h3  data-id={item.id} onClick={this.test}>{item.name}</h3></span>
                    </div>
                </div>

            )
        }):<Loader  bg = {'rgba(64, 64, 64, 0.8)'}/>;
        return(

        <div className="App">

                <header className="App-header">
            <section id="content" style={{marginBottom: '0px'}}>
                <div className="content-wrap">
                    <div className="container clearfix">
                        <div className="row clearfix center divcenter" >
                            <div className="col-lg-12">
                                <div className="heading-block title-center-own center">
                                    <h3>{cat_name}</h3>
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
                    {
                        sub_name?<ShowUsers sub_name={sub_name}/>:null
                    }
                </header>


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



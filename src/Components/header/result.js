import React from 'react'
import {getActiveUsers} from '../../firebase/fireManager';
import { Route , withRouter} from 'react-router-dom';
import "../../styles/App.css";
import MediaCard from '../workers';





class Result extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            search: this.props.match.params.srch,
        }
    };

    componentDidMount(){
        getActiveUsers().then(data=>{
            this.setState({list: data})
        })
    }

    componentWillReceiveProps(props){
        this.setState({search: props.match.params.srch,})


}
    render(){
        const {search,list}=this.state
        let filteredName=list.filter(
            (item)=>{
                return item.firstName.indexOf(search)!==-1 || item.lastName.indexOf(search)!==-1 || item.email.indexOf(search)!==-1
            }
        )
        let list_user='';
        if(list){
            list_user = filteredName.map((item,index)=>{
                return(
                        <MediaCard key={index} users_list={item} />
                )
            })
        }

        return(

        <div className="App">
            <header className="App-header">
                <section id="content" style={{marginBottom: '0px'}}>
                    <div className="content-wrap">
                        <div className="container clearfix">
                            <div className="row clearfix center divcenter" >
                                <div className="col-lg-12">
                                    <div className="heading-block title-center-own center">
                                        <h3 style={{textTransform: 'capitalize'}}>Search Result for "{search}"</h3>
                                    </div>
                                    {list?list_user:'Sorry, no result were found ...'}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </header>
        </div>

        )
    }

}
export default withRouter(Result);


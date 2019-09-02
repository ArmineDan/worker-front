import React from 'react'
import {getActiveUsers} from '../../firebase/fireManager';
import {db} from '../../firebase/fire';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import {fade, makeStyles} from '@material-ui/core/styles';
import "../../styles/App.css";




class Users extends React.Component{
    constructor(){
        super();
        this.state={
            list: [],
            search: ''
            }
        };

    componentDidMount(){

        getActiveUsers().then(data=>{
            this.setState({list: data})
        }) }


    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }

    render(){
     let filteredName=this.state.list.filter(
         (item)=>{
             return item.firstName.indexOf(this.state.search)!==-1 || item.lastName.indexOf(this.state.search)!==-1 || item.email.indexOf(this.state.search)!==-1
         }
     )
        let list_user='';
        if(this.state.list ){
            list_user =filteredName.map((item,index)=>{
                return(

                    <tr key={index} id='customers'>
                        <td>{++index}</td>
                        <td> First Name : {item.firstName}</td>
                        <td> Last Name : {item.lastName}</td>
                        <td> Email: {item.email}</td>
                        <td>Mobile: {item.mobile}</td>
                    </tr>

                )
            })

        }


        return(
            <div>
                <SearchIcon/>
                <InputBase
                  
                    id='in'
                    type='text'
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    placeholder='Search...'/>

                    {list_user}

            </div>
        )
    }

}
export default Users;

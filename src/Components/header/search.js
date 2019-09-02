import React from 'react'
import {getActiveUsers} from '../../firebase/fireManager';
import { Route , withRouter} from 'react-router-dom';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import "../../styles/App.css";




class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            list: [],
            search: this.props.match.url.srch || ''
            }
        };

    componentDidMount(){
        getActiveUsers().then(data=>{
            this.setState({list: data})
        }) }


    updateSearch(event){
        this.setState({search: event.target.value.substr(0,20)})
    }
    clear(){
        this.setState({search: ''})
    }
    handleKeyPress=(e)=>{
    if (e.which === 13) {
    // console.log(this.state.search,'keyyy')
        this.props.history.push(`/search/${this.state.search}`)
    }
};
    render(){
        // console.log(this.state.search,"this.state.searchthis.state.search")
        return(
            <div>
                <SearchIcon/>
                <InputBase
                    id='in'
                    type='text'
                    value={this.state.search}
                    onChange={this.updateSearch.bind(this)}
                    onKeyPress ={this.handleKeyPress}
                    onBlur={this.clear.bind(this)}
                    placeholder='Search...'/>


            </div>
        )
    }

}
export default withRouter(Users);
//export default Users;

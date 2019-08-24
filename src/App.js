import React from 'react';
import './styles/App.css';
import Categories from './Components/Categories';
import PrimarySearchAppBar from './Components/header/header';
import Footer from './Components/Footer/Footer';
import Steps from './Components/Steps/steps';
import MediaCard from './Components/workers';
import {fire} from './firebase/fire';
import {connect} from 'react-redux';



class App extends React.Component {
    constructor() {
        super();
        this.state = {
            open_users_list: false,
            users: [],
            show_user_details: false,
            current_user: [],
            user_status: null


        };
    }

    anim = (type, id) => {
        const elem = document.getElementById(id);
        if (elem) {
            elem.style.transition = 'opacity 0.4s  cubic-bezier(0.4, 0, 0.2, 1)';
            elem.style.opacity = type;
            elem.style.zIndex = type ? 0 : -1;
        }

    }


    showUsers = (e, data) => {
        this.setState({
            open_users_list: e,
            users: data,
        });
        const elem = document.getElementById("masters") && document.getElementById("masters").offsetTop;
        window.scroll(0, elem);
        this.anim(1, "gotoTop")

        //console.log(elem,"data-App")

    };


    goTop = () => {
        window.scroll(0, 0);
        this.anim(0, "gotoTop")
    };
    close_users_section = () => {
        if (this.state.open_users_list) {
            this.setState({
                open_users_list: false

            });
        }
    };

    componentDidUpdate() {
        window.addEventListener("scroll", () => {
            window.pageYOffset > 150 ? this.anim(1, "gotoTop") : this.anim(0, "gotoTop")
        })
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.set_user_status(user)

            } else {
               // console.log(user, "elsee")
            }
        })

    };


    componentDidMount() {
       
        fire.auth().onAuthStateChanged((user) => {
            if (user) {
                this.props.set_user_status(user)
                //console.log(user,"user")
            } else {
               // console.log(user, "elsee")
            }
        })
    }

    render() {
        const {open_users_list, users, user_status} = this.state;
        const draw_users = users.length ? users.map((item, index) => {
            return (
                <MediaCard key={index} users_list={item} />
            )
        }) : (
            <div className="no-masters col-lg-12"><h4>Unfortunately we do not have masters registered in this profession
                yet</h4></div>)

        return (
            <div className="App">
                <header className="App-header">
                    <PrimarySearchAppBar user_status={user_status} data="App"
                                         close_users_section={this.close_users_section}/>
                    {this.props.show_info ? <Steps/> :
                        <Categories showUsers_Lists={this.showUsers}/>}
                    {open_users_list && !this.props.show_info ?
                        <section id="masters" style={{marginBottom: '0px'}}>
                            <div className="container clearfix">
                                <div className="row clearfix center divcenter">
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
                        : null}
                </header>
                <div id="gotoTop" onClick={this.goTop}>
                    <i className="material-icons" style={{top: '6px', position: 'relative'}}>
                        keyboard_arrow_up
                    </i>
                </div>
                <Footer/>
            </div>
        );
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
)(App)


import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {browserHistory} from "react-router";
import login from "./Components/header/login";
import register from "./Components/header/register";
import MyAccountMain from "./Components/UserAccountPage/MyAccountMain/Main";
import Profile from "./Components/profile/profile";

import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import { Redirect } from 'react-router-dom';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import { routerMiddleware} from 'react-router-redux';
import {user_status,showInfo} from './reducers/reducers';
import SubCategories from "./Components/subCat";
import ShowUsers from "./Components/showUsers";
import PrimarySearchAppBar from "./Components/header/header";
import Footer from "./Components/Footer/Footer";
import Steps from "./Components/Steps/steps";




const theme = createMuiTheme({
    palette: {
        primary: orange,

    }

});

const store = createStore(
    combineReducers({
        user_status:user_status,
        showInfo:showInfo
    }),
    window.devToolsExtension && window.devToolsExtension()
    // composeWithDevTools(applyMiddleware(routerMiddleware))
);

const route=(
    <Provider store={store}>
<MuiThemeProvider theme={theme}>

    <Router  history={browserHistory}>
        <PrimarySearchAppBar  data="App"/>
    <Switch>
    <Route exact path="/" component ={App}/>
    <Route exact path="/login" component={login} marginRight='200px'/>
    <Route exact path="/register" component={register}/>
        <Route exact path="/guide" component={Steps}/>
    <Route exact path="/my-account" component={MyAccountMain}/>
    <Route  exact path='/profile/:handle' component={Profile}/>
    <Route exact  path='/:cat_name' component={SubCategories}/>
    <Route  exact path='/:cat_name/:sub_name' component={SubCategories}/>
    <Route render={() => <Redirect to="/" />} />
    </Switch>
        <Footer/>
      </Router>
</MuiThemeProvider>
    </Provider>
)

ReactDOM.render(
        route,
    document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

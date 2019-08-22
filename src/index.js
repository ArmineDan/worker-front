import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import {BrowserRouter as Router, Route} from "react-router-dom";
import {browserHistory} from "react-router";
import login from "./Components/header/login";
import register from "./Components/header/register";
import MyAccountMain from "./Components/UserAccountPage/MyAccountMain/Main";
import Steps from "./Components/Steps/steps";
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
//import { composeWithDevTools } from 'redux-devtools-extension';
//import { routerMiddleware} from 'react-router-redux';
import {user_status,showInfo} from './reducers/reducers';


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
    <Route exact path="/" component ={App}/>
    <Route path="/login/" component={login} marginRight='200px'/>
    <Route path="/register/" component={register}/>
      <Route path="/my-account" component={MyAccountMain}/>

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

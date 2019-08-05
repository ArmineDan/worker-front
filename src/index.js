import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import orange from '@material-ui/core/colors/orange';
import {BrowserRouter as Router, Route, Link} from "react-router-dom";
import {browserHistory} from "react-router";
import login from "./Components/header/login";
import register from "./Components/header/register";


const theme = createMuiTheme({
    palette: {
        primary: orange,

    }

});

const route=(
<MuiThemeProvider theme={theme}>
  <Router  history={browserHistory}>
    <Route exact path="/" component ={App}/>
    <Route path="/login/" component={login} marginRight='200px'/>
    <Route path="/register/" component={register}/>
  </Router>
</MuiThemeProvider>

)

ReactDOM.render(
        route,
    document.getElementById('root')

);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();

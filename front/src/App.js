import React from 'react';
import './App.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Home from './Home';
import Login from './components/Login/Login';
import SignUp from './components/SignUp/SignUp';
import Settings from './components/Settings/Settings';
import About from './components/About/About';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import DashboardIcon from "@material-ui/icons/Dashboard";
import { makeStyles } from '@material-ui/core/styles';
import PrivateRoute from "./PrivateRoute";
import API from "./utils/API";

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
    header: {
        backgroundColor: "#12ACDE",
        "&link": {
            textColor: "#FFFFFF",
        }
    },
}));

function App() {
    const disconnect = () => {
        API.logout();
        window.location = "/login";
    };
    const classes = useStyles();
    return (
        <div>
            <AppBar className={classes.header} position="static">
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" href='/'>
                        <DashboardIcon/>
                    </IconButton>
                    <Typography variant="h6" className={classes.title}>
                        Dashboard
                    </Typography>
                    {API.isAuth() && <Button color="inherit" href='/settings'>Settings</Button>}
                    {API.isAuth() && <Button color="inherit" onClick={() => disconnect()}>Logout</Button>}
                </Toolbar>
            </AppBar>
            <BrowserRouter>
                <Switch>
                    <PrivateRoute exact path='/' component={Home}/>
                    <PrivateRoute exact path='/settings' component={Settings}/>
                    <Route exact path='/login' component={Login}/>
                    <Route exact path='/signup' component={SignUp}/>
                    <Route exact path='/about.json' component={About}/>
                </Switch>
            </BrowserRouter>
        </div>

    );
}

export default App;

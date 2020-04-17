import React from 'react';
import { FormGroup, FormControl, FormLabel } from "react-bootstrap";
import { Button } from '@material-ui/core';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API.js';
import Cookie from 'js-cookie'
import '../../App.css';

class Login extends React.Component {

    constructor() {
        super();
        this.valError = 401;
    }
    state = {
        email: "",
        password: ""
    };
    send = async () => {
        const { email, password } = this.state;
        if (!email || email.length === 0) {
            return;
        }
        if (!password || password.length === 0) {
            return;
        }
        try {
            const { data } = await API.login(email, password);
            localStorage.setItem("log", data.token);
            Cookie.set('email', data.text, { expires: 7 });
            window.location = "/";
        } catch (error) {
            this.valError = error;
            console.error("error : ", this.valError);
        }
    };
    handleChange = (event) => {
        this.setState({
            [event.target.id]: event.target.value
        });
    };
    connect = () => {
        this.send();
        if (this.valError !== 200) {
            ToastsStore.error("Incorrect email or password");
        }
    }
    render() {
        const { email, password } = this.state;
        return (
        <div style={{display: 'flex',  justifyContent:'center', marginTop: '100px', height: '100vh'}}>
            <div className="Login">
                <Typography variant='h4' gutterBottom={true}>
                        Login
                </Typography>
            <CssBaseLine/>
                <FormGroup controlId="email" bssize="large">
                    <FormLabel>Email</FormLabel>
                    <FormControl
                        autoFocus
                        type="email"
                        value={email}
                        onChange={this.handleChange}
                    />
                </FormGroup>
                <FormGroup controlId="password" bssize="large">
                    <FormLabel>Password</FormLabel>
                    <FormControl
                        value={password}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button class='Custom-btn' onClick={this.connect}>
                    Connexion
                </Button>
                <ToastsContainer store={ToastsStore} lightBackground/>
                <a class='App-link' href="/signup">
                    Don't have an account yet? Sign up
                </a>
            </div>
            </div>
        );
    };
}

export default Login
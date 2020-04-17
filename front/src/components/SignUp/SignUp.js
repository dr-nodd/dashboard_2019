import React from 'react';
import { FormGroup, FormControl, FormLabel } from 'react-bootstrap';
import { Button } from '@material-ui/core';
import {ToastsContainer, ToastsStore} from 'react-toasts';
import CssBaseLine from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import API from '../../utils/API.js';

export default class Signup extends React.Component {
    state = {
        email: "",
        password: "",
        cpassword: ""
    };
    constructor() {
        super();
        this.valError = 400;
    }
    send = async () => {
        const { email, password, cpassword } = this.state;
        if (!email || email.length === 0)
            return;
        if (!password || password.length === 0 || password !== cpassword)
            return;
        try {
            const { data } = await API.signup({ email, password });
            localStorage.setItem("log", data.token);
            window.location = "/login";
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
            ToastsStore.error("Invalid email or password");
        }
    };
    render() {
        const { email, password, cpassword } = this.state;
        return (
            <div style={{display: 'flex',  justifyContent:'center',  marginTop:'100px', height: '100vh'}}>
            <div className="SignUp">
                <Typography variant="h4" gutterBottom={true}>
                    Sign Up
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
                <FormGroup controlId="cpassword" bssize="large">
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl
                        value={cpassword}
                        onChange={this.handleChange}
                        type="password"
                    />
                </FormGroup>
                <Button class='Custom-btn' onClick={this.connect}>
                    Sign up
                </Button>
                <ToastsContainer store={ToastsStore} lightBackground/>
                <a class='App-link' href="/login">
                    Already have an account? Sign in
                </a>
            </div>
            </div>
        );
    }
}
import axios from 'axios';
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import {Modal} from "react-bootstrap";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Button, Form, FormGroup, Input} from "reactstrap";

const useStyles = makeStyles(theme => ({
    exchangeHeader: {
        backgroundColor: "#A0A0A0",
        color: "#FFFFFF"
    },
    exchangeConfig: {
        align: "right",
    },
}));

const getExchangeDataStartEnd = async (base="EUR", symbols="", start="2019-01-01", end="2019-02-01") => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.exchangeratesapi.io/history?base=' + base + '&start_at=' + start + '&end_at=' + end + '&symbols=' + symbols,
        });
        return response.data;
    } catch (e) {
        console.log("error: ", e);
    }
};

const ExchangeGraphCard = () => {
    const classes = useStyles();
    const [data, setData] = useState(undefined);
    const [Base, setBase] = useState("EUR");
    const [BaseValue, setBaseValue] = useState(0);
    const [Currency, setCurrency] = useState("USD");
    const [CurrencyValue, setCurrencyValue] = useState(0);
    const [modalBase, setModalBase] = useState("EUR");
    const [modalExchange, setModalExchange] = useState("USD");



    var years = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    var day = new Date().getDate();


    const start_at = years + "-" + ("0" + (month - 1)).slice(-2) + "-" + ("0" + (day)).slice(-2);
    const end_at = years + "-" + ("0" + month).slice(-2) + "-" + ("0" + day).slice(-2);

    useEffect(
        () => { async function fetchData() {
            let res = await getExchangeDataStartEnd();
            setData(res);
        }
            fetchData();
        }, []);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            let base = data.base;
            let rates = data.rates;
            console.log(JSON.stringify(rates));
            // var list = rates.map(function(name, index){
            //     return <li key={index}>{index} : {name}</li>
            // });

            return (
                <div>
                    <p>Base :{base}</p>
                    <p>Start at : {start_at}</p>
                    <p>End at : {end_at}</p>
                    {/*<ul>{list}</ul>*/}
                </div>
            );
        }
    };

    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal);

    return (
        <Card>


            <Modal show={modal} onHide={toggle} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Params</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <label>Base currency</label>
                            <Input type="select" onChange={e => setModalBase(e.target.value)}>
                                <option selected={Base === "EUR"}>EUR</option>
                                <option selected={Base === "USD"}>USD</option>
                                <option selected={Base === "JPY"}>JPY</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Body>
                    <Form>
                        <FormGroup>
                            <label>Exchange currency</label>
                            <Input type="select" onChange={e => setModalExchange(e.target.value)}>
                                <option selected={Currency === "EUR"}>EUR</option>
                                <option selected={Currency === "USD"}>USD</option>
                                <option selected={Currency === "JPY"}>JPY</option>
                            </Input>
                        </FormGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className={classes.save} onClick={() => {setBase(modalBase); setCurrency(modalExchange); toggle()}}>Save</Button>
                </Modal.Footer>
            </Modal>


            <Toolbar position="static" className={classes.exchangeHeader}>
                <Grid container spacing={1}>
                    <Grid item xs={2}>
                        <IconButton edge="start" color="inherit" aria-label="menu">
                            <DashboardIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={8}>
                        <div style={{marginTop: "10px"}}>
                            <Typography style={{textAlign: "center"}} variant="h5">
                                Exchange
                            </Typography>
                        </div>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="inherit" aria-label="menu"  onClick={toggle}>
                            <SettingsIcon/>
                        </IconButton>
                    </Grid>
                    <Grid item xs={1}>
                        <IconButton color="inherit" aria-label="menu">
                            <DeleteIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Toolbar>
            <CardContent>
                {content(data)}
            </CardContent>
        </Card>
    );
};

export default ExchangeGraphCard;

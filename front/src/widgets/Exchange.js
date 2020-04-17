import axios from 'axios';
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import ExchangeIcon from "@material-ui/icons/AttachMoney";
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
    save: {
        backgroundColor: "#12ACDE",
        border: "#12ACDE",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#0F91BC"
        }
    },
    exchangeConfig: {
        align: "right",
    },
}));

const getLatestExchangeData = async (base="EUR") => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.exchangeratesapi.io/latest?base=' + base,
        });
        return response.data;
    } catch (e) {
        console.log("error: ", e);
    }
};

const ExchangeCard = () => {
    const classes = useStyles();
    const [data, setData] = useState(undefined);
    const [Base, setBase] = useState("EUR");
    const [BaseValue, setBaseValue] = useState(0);
    const [Currency, setCurrency] = useState("USD");
    const [CurrencyValue, setCurrencyValue] = useState(0);
    const [modalBase, setModalBase] = useState("EUR");
    const [modalExchange, setModalExchange] = useState("USD");
    const [hidden, setHidden] = useState(null);

    useEffect(
        () => {
            async function fetchData() {
                let res = await getLatestExchangeData(Base);
                setData(res);
                setCurrencyValue(0);
                setBaseValue(0);
            }

            fetchData();
        }, [Base, Currency]);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            let base = data.base;
            let date = data.date;
            let currency = data.rates[Currency];

            return (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                Date : {date}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                Base currency :
                            </Typography>
                            <Input value={BaseValue} onChange={(e) => {
                                setBaseValue(e.target.value);
                                setCurrencyValue(e.target.value * currency);
                            }} style={{width: "80%"}}/>
                            <Typography variant="body1" color="textSecondary">
                                {base}
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="h6">
                                Exchange currency :
                            </Typography>
                            <Input value={CurrencyValue} onChange={(e) => {
                                setCurrencyValue(e.target.value);
                                setBaseValue(e.target.value / currency);
                            }} style={{width: "80%"}}/>
                            <Typography variant="body1" color="textSecondary">
                                {Currency}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    };

    const [modal, setModal] = useState(true);

    const toggle = () => setModal(!modal);

    if (hidden === "hidden") {
        return (<Card hidden>Nasa</Card>);
    } else {
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
                                    <option selected={Base === "CAD"}>CAD</option>
                                    <option selected={Base === "HKD"}>HKD</option>
                                    <option selected={Base === "ISK"}>ISK</option>
                                    <option selected={Base === "PHP"}>PHP</option>
                                    <option selected={Base === "DKK"}>DKK</option>
                                    <option selected={Base === "HUF"}>HUF</option>
                                    <option selected={Base === "CZK"}>CZK</option>
                                    <option selected={Base === "AUD"}>AUD</option>
                                    <option selected={Base === "RON"}>RON</option>
                                    <option selected={Base === "SEK"}>SEK</option>
                                    <option selected={Base === "IDR"}>IDR</option>
                                    <option selected={Base === "INR"}>INR</option>
                                    <option selected={Base === "BRL"}>BRL</option>
                                    <option selected={Base === "RUB"}>RUB</option>
                                    <option selected={Base === "HRK"}>HRK</option>
                                    <option selected={Base === "THB"}>THB</option>
                                    <option selected={Base === "CHF"}>CHF</option>
                                    <option selected={Base === "SGD"}>SGD</option>
                                    <option selected={Base === "PLN"}>PLN</option>
                                    <option selected={Base === "BGN"}>BGN</option>
                                    <option selected={Base === "TRY"}>TRY</option>
                                    <option selected={Base === "CNY"}>CNY</option>
                                    <option selected={Base === "NOK"}>NOK</option>
                                    <option selected={Base === "NZD"}>NZD</option>
                                    <option selected={Base === "ZAR"}>ZAR</option>
                                    <option selected={Base === "MXN"}>MXN</option>
                                    <option selected={Base === "ILS"}>ILS</option>
                                    <option selected={Base === "GBP"}>GBP</option>
                                    <option selected={Base === "KRW"}>KRW</option>
                                    <option selected={Base === "MYR"}>MYR</option>
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
                                    <option selected={Currency === "CAD"}>CAD</option>
                                    <option selected={Currency === "HKD"}>HKD</option>
                                    <option selected={Currency === "ISK"}>ISK</option>
                                    <option selected={Currency === "PHP"}>PHP</option>
                                    <option selected={Currency === "DKK"}>DKK</option>
                                    <option selected={Currency === "HUF"}>HUF</option>
                                    <option selected={Currency === "CZK"}>CZK</option>
                                    <option selected={Currency === "AUD"}>AUD</option>
                                    <option selected={Currency === "RON"}>RON</option>
                                    <option selected={Currency === "SEK"}>SEK</option>
                                    <option selected={Currency === "IDR"}>IDR</option>
                                    <option selected={Currency === "INR"}>INR</option>
                                    <option selected={Currency === "BRL"}>BRL</option>
                                    <option selected={Currency === "RUB"}>RUB</option>
                                    <option selected={Currency === "HRK"}>HRK</option>
                                    <option selected={Currency === "THB"}>THB</option>
                                    <option selected={Currency === "CHF"}>CHF</option>
                                    <option selected={Currency === "SGD"}>SGD</option>
                                    <option selected={Currency === "PLN"}>PLN</option>
                                    <option selected={Currency === "BGN"}>BGN</option>
                                    <option selected={Currency === "TRY"}>TRY</option>
                                    <option selected={Currency === "CNY"}>CNY</option>
                                    <option selected={Currency === "NOK"}>NOK</option>
                                    <option selected={Currency === "NZD"}>NZD</option>
                                    <option selected={Currency === "ZAR"}>ZAR</option>
                                    <option selected={Currency === "MXN"}>MXN</option>
                                    <option selected={Currency === "ILS"}>ILS</option>
                                    <option selected={Currency === "GBP"}>GBP</option>
                                    <option selected={Currency === "KRW"}>KRW</option>
                                    <option selected={Currency === "MYR"}>MYR</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.save} onClick={() => {
                            setBase(modalBase);
                            setCurrency(modalExchange);
                            toggle()
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Toolbar position="static" className={classes.exchangeHeader}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <ExchangeIcon/>
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
                            <IconButton color="inherit" aria-label="menu" onClick={toggle}>
                                <SettingsIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={1}>
                            <IconButton color="inherit" aria-label="menu" onClick={() => setHidden("hidden")}>
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
    }
};

export default ExchangeCard;

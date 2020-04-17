import axios from 'axios';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import WeatherIcon from "@material-ui/icons/WbSunny";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {makeStyles} from "@material-ui/core";
import {Image} from "react-bootstrap";

const apiKey = "3cLQtZD1ekZ0pnWKYCZ5JMGqrp3BGAVQ";
const entryPoint = "http://dataservice.accuweather.com/";

const useStyles = makeStyles(theme => ({
    weatherHeader: {
        backgroundColor: "#e6005c",
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
}));

const getLocationKey = async (city) => {
    try {
        const response =  await axios ({
            method: 'GET',
            url: entryPoint + 'locations/v1/cities/search?q=' + city + '&apikey=' + apiKey,
        })
        return response.data;
    }
    catch (e) {
        console.log("error: ", e);
    }
};

const getInfoFromLocation = async (locationKey) => {
    try {
        const response = await axios({
            method: 'GET',
            url: entryPoint + 'forecasts/v1/daily/1day/' + locationKey + '?apikey=' + apiKey,
        });
        return response.data;
    } catch (e) {
        console.log("error: ", e);
    }
};

const AccuWeatherCard = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(undefined);
    const [city, setCity] = useState(props.city);
    const [hidden, setHidden] = useState(null);

    useEffect(
        () => { async function fetchData() {
            let location = await getLocationKey(city);
            if (location !== undefined) {
                var res = null;
                if (location[0] !== undefined) {
                    res = await getInfoFromLocation(location[0].Key);
                } else {
                    setCity("Lille");
                    res = await getInfoFromLocation(135564);
                }
                setData(res);
            }
        }
        fetchData();
    }, [city]);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            let date = data.DailyForecasts[0].Date.split('T')[0];
            let gmt = data.DailyForecasts[0].Date.split(":00:00")[1];
            let maxTemp = ((parseInt(data.DailyForecasts[0].Temperature.Maximum.Value, 10) - 32) * (5/9)).toFixed();
            let minTemp = ((parseInt(data.DailyForecasts[0].Temperature.Minimum.Value, 10) - 32) * (5/9)).toFixed();
            var dailyIcon = "";
            var nightlyIcon = "";
            if (data.DailyForecasts[0].Day.Icon < 10)
                dailyIcon = "https://developer.accuweather.com/sites/default/files/0" + data.DailyForecasts[0].Day.Icon + "-s.png";
            else
                dailyIcon = "https://developer.accuweather.com/sites/default/files/" + data.DailyForecasts[0].Day.Icon + "-s.png";
            if (data.DailyForecasts[0].Night.Icon < 10)
                nightlyIcon = "https://developer.accuweather.com/sites/default/files/0" + data.DailyForecasts[0].Night.Icon + "-s.png";
            else
                nightlyIcon = "https://developer.accuweather.com/sites/default/files/" + data.DailyForecasts[0].Night.Icon + "-s.png";

            return (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography gutterBottom variant="h6">
                                {city}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                {date}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                GMT : {gmt}
                            </Typography>
                        </Grid>
                        <Grid item xs={2} style={{textAlign: "center"}}>
                            <Typography variant="body2" color="textSecondary">
                                Max : {maxTemp} °C<br/>
                                Min : {minTemp} °C
                            </Typography>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                Day
                            </Typography>
                            <Image src={dailyIcon}/>
                        </Grid>
                        <Grid item xs={6}>
                            <Typography variant="body1" color="textSecondary">
                                Night
                            </Typography>
                            <Image src={nightlyIcon}/>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    };

    const [modal, setModal] = useState(true);
    const [myText, setMyText] = useState(null);

    const toggle = () => setModal(!modal);

    if (hidden === "hidden") {
        return (<Card hidden>Nasa</Card>);
    } else {
        return (
            <Card>
                <Modal show={modal} onHide={toggle} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose a city</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <Input onChange={e => setMyText(e.target.value)}/>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.save} onClick={() => {
                            setCity(myText);
                            toggle()
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Toolbar position="static" className={classes.weatherHeader}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <WeatherIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <div style={{marginTop: "10px"}}>
                                <Typography style={{textAlign: "center"}} variant="h5">
                                    AccuWeather
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

export default AccuWeatherCard;
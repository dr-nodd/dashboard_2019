import axios from 'axios';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import PotterIcon from "@material-ui/icons/FlashOn";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import LoopIcon from "@material-ui/icons/Loop";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {makeStyles} from "@material-ui/core";

const apiKey = "$2a$10$ShDxgu/CAJZd/j01jcAxs.7bKZy4/aeJ4fH.Z.Ss4gc0s/wYZ5hku";
const entryPoint = "https://www.potterapi.com/v1/";

const useStyles = makeStyles(theme => ({
    potterHeader: {
        backgroundColor: "#4ed64a",
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

const getCharactersFromHouse = async (house) => {
    try {
        const response =  await axios ({
            method: 'GET',
            url: entryPoint + 'characters?house=' + house + '&key=' + apiKey,
        })
        return response.data;
    }
    catch (e) {
        console.log("error: ", e);
    }
};

const PotterCard = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(undefined);
    const [house, setHouse] = useState("Hufflepuff");
    const [id, setId] = useState(0);
    const [reset, setReset] = useState(0);
    const [hidden, setHidden] = useState(null);

    useEffect(
        () => {
            async function fetchData() {
                let res = await getCharactersFromHouse(house);
                setData(res);
                setId(Math.floor(Math.random() * res.length));
            }

            fetchData();
        }, [house, reset]);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            let name = data[id].name;
            let house = data[id].house;
            let school = data[id].school;
            let bloodStatus = data[id].bloodStatus;
            let species = data[id].species;
            return (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="h6">
                                {name}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => {
                                setReset(reset + 1)
                            }}>
                                <LoopIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                Species : {species}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                Blood Status : {bloodStatus}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                School : {school}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                House : {house}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    };

    const [modal, setModal] = useState(true);
    const [modalHouse, setModalHouse] = useState("Hufflepuff");

    const toggle = () => setModal(!modal);

    if (hidden === "hidden") {
        return (<Card hidden>Nasa</Card>);
    } else {
        return (
            <Card>
                <Modal show={modal} onHide={toggle} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Choose a house</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <label>Houses</label>
                                <Input type="select" onChange={e => setModalHouse(e.target.value)}>
                                    <option selected={house === "Hufflepuff"}>Hufflepuff</option>
                                    <option selected={house === "Ravenclaw"}>Ravenclaw</option>
                                    <option selected={house === "Gryffindor"}>Gryffindor</option>
                                    <option selected={house === "Slytherin"}>Slytherin</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.save} onClick={() => {
                            setHouse(modalHouse);
                            toggle()
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Toolbar position="static" className={classes.potterHeader}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <PotterIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <div style={{marginTop: "10px"}}>
                                <Typography style={{textAlign: "center"}} variant="h5">
                                    Harry Potter
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

export default PotterCard;
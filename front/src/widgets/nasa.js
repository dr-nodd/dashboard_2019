import axios from 'axios';
import Card from "@material-ui/core/Card";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import NasaIcon from "@material-ui/icons/Public";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import {Image, Modal} from "react-bootstrap";
import {makeStyles} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import {Button, Form, FormGroup, Input} from "reactstrap";
import LoopIcon from "@material-ui/icons/Loop";

const useStyles = makeStyles(theme => ({
    nasaHeader: {
        backgroundColor: "#FFA500",
        color: "#FFFFFF"
    },
    nasaConfig: {
      align: "right",
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

const getMarsImgFromRover = async (rover, sol) => {
    try {
        const response = await axios({
            method: 'GET',
            url: 'https://api.nasa.gov/mars-photos/api/v1/rovers/' + rover + '/photos?sol=' + sol + '&api_key=pANfIB5rv8J2nbFIbpNfua8WgGYtpQ8BEa8fsZXk',
        });
        return response.data;
    } catch (e) {
        console.log("error: ", e);
    }
};

const NasaCard = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(undefined);
    const [sol, setSol] = useState(undefined);
    const [Param, setParam] = useState(props.param);
    const [Rover, setRover] = useState(props.rover);
    const [modalParam, setModalParam] = useState("random");
    const [modalRover, setModalRover] = useState("Spirit");
    const [reset, setReset] = useState(0);
    const [hidden, setHidden] = useState(null);

    useEffect(
        () => { async function fetchData() {
            let tmp = await getMarsImgFromRover(Rover, 1);
            let sol;
            if (Param === "random")
                sol = Math.floor(Math.random() * tmp.photos[0].rover.max_sol) + 1;
            else
                sol = tmp.photos[0].rover.max_sol;
            let res = await getMarsImgFromRover(Rover, sol);
            setData(res);
            setSol(sol);
        }
        fetchData();
    }, [Param, Rover, reset]);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            if (data.photos[0] !== undefined) {
                return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Typography gutterBottom variant="h6">
                                    {data.photos[0].rover.name}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => {setReset(reset + 1)}}>
                                    <LoopIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}  style={{textAlign: "center"}}>
                                <Image src={data.photos[0].img_src} fluid/>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography  style={{textAlign: "center"}} variant="body2" color="textSecondary">
                                    Picture was taken on {data.photos[0].earth_date} (sol : {sol}) by the {data.photos[0].camera.full_name}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={10}>
                                <Typography gutterBottom variant="h6">
                                    {Rover}
                                </Typography>
                            </Grid>
                            <Grid item xs={2}>
                                <IconButton onClick={() => {setReset(reset + 1)}}>
                                    <LoopIcon/>
                                </IconButton>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography  style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}} variant="body2" color="textSecondary">
                                    No picture was taken on sol {sol} by {Rover}
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                );
            }
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
                                <label>Rover</label>
                                <Input type="select" onChange={e => setModalRover(e.target.value)}>
                                    <option selected={Rover === "Opportunity"}>Opportunity</option>
                                    <option selected={Rover === "Curiosity"}>Curiosity</option>
                                    <option selected={Rover === "Spirit"}>Spirit</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <label>Photo</label>
                                <Input type="select" onChange={e => setModalParam(e.target.value)}>
                                    <option selected={Param === "last"}>last</option>
                                    <option selected={Param === "random"}>random</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.save} onClick={() => {
                            setRover(modalRover);
                            setParam(modalParam);
                            toggle()
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Toolbar position="static" className={classes.nasaHeader}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <NasaIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <div style={{marginTop: "10px"}}>
                                <Typography style={{textAlign: "center"}} variant="h5">
                                    Nasa
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

export default NasaCard;
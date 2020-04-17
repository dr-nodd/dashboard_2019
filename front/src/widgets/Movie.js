import {makeStyles} from "@material-ui/core";
import axios from "axios";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import {Image, Modal} from "react-bootstrap";
import React, {useEffect, useState} from "react";
import Card from "@material-ui/core/Card";
import {Button, Form, FormGroup, Input} from "reactstrap";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import MovieIcon from "@material-ui/icons/LocalMovies";
import SettingsIcon from "@material-ui/icons/Settings";
import DeleteIcon from "@material-ui/icons/Delete";
import CardContent from "@material-ui/core/CardContent";

const apiKey = "93b6db22";
const entryPoint = "http://www.omdbapi.com/?";

const useStyles = makeStyles(theme => ({
    movieHeader: {
        backgroundColor: "#719fe6",
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

const getInfoFromMovie = async (movie) => {
    try {
        const response = await axios({
            method: 'GET',
            url: entryPoint + 't=' + movie + '&apikey=' + apiKey,
        });
        return response.data;
    } catch (e) {
        console.log("error: ", e);
    }
};

const MovieCard = (props) => {
    const classes = useStyles();

    const [data, setData] = useState(undefined);
    const [movie, setMovie] = useState("Frozen");
    const [hidden, setHidden] = useState(null);

    useEffect(
        () => { async function fetchData() {
            let res = await getInfoFromMovie(movie);
            setData(res);
        }
            fetchData();
        }, [movie]);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            let response = data.Response;
            let movieTitle = data.Title;
            let releaseDate = data.Released;
            let runtime = data.Runtime;
            let poster = data.Poster;
            let rating = data.Metascore;
            let rating2 = data.imdbRating;
            let plot = data.Plot;
            let genre = data.Genre;
            let director = data.Director;
            let actors = data.Actors;
            let awards = data.Awards;

            if (response === "True") {
                return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={6}>
                                <Grid item xs={12}>
                                    <Typography gutterBottom variant="h5">
                                        {movieTitle}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Release date: {releaseDate}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Runtime: {runtime}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Genre: {genre}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <br/>
                                        Director: {director}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Actors: {actors}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        Awards: {awards}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        <br/>
                                        Metascore: {rating}
                                    </Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        imdbRating: {rating2}
                                    </Typography>
                                </Grid>
                                <Grid item xs={12}>
                                    <Typography variant="body2" color="textSecondary" style={{fontStyle: "italic"}}>
                                        <br/>
                                        {plot}
                                    </Typography>
                                </Grid>
                            </Grid>
                            <Grid item xs={6} style={{textAlign: "center"}}>
                                <Image src={poster} fluid/>
                            </Grid>
                        </Grid>
                    </div>
                );
            } else {
                return (
                    <div>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Typography gutterBottom variant="h5" style={{textAlign: "center"}}>
                                    The movie "{movie}" was not found.
                                </Typography>
                            </Grid>
                        </Grid>
                    </div>
                );
            }
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
                        <Modal.Title>Choose a movie</Modal.Title>
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
                            setMovie(myText);
                            toggle()
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Toolbar position="static" className={classes.movieHeader}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <MovieIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <div style={{marginTop: "10px"}}>
                                <Typography style={{textAlign: "center"}} variant="h5">
                                    Movie
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

export default MovieCard;

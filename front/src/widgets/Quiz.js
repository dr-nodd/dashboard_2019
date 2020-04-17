import axios from 'axios';
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import QuizIcon from "@material-ui/icons/SportsEsports";
import SettingsIcon from "@material-ui/icons/Settings";
import LoopIcon from "@material-ui/icons/Loop";
import DeleteIcon from "@material-ui/icons/Delete";
import Typography from "@material-ui/core/Typography";
import CardContent from "@material-ui/core/CardContent";
import React, {useEffect, useState} from "react";
import { Modal } from 'react-bootstrap';
import { Button, Form, FormGroup, Input} from 'reactstrap';
import {makeStyles} from "@material-ui/core";

const entryPoint = "https://opentdb.com/api.php?";

const useStyles = makeStyles(theme => ({
    nasaHeader: {
        backgroundColor: "#c51ec5",
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

const getQuestion = async (difficulty="", category=0) => {
    try {
        const response =  await axios ({
            method: 'GET',
            url: entryPoint + 'amount=1&difficulty=' + difficulty + '&category=' + category,
        })
        return response.data;
    }
    catch (e) {
        console.log("error: ", e);
    }
};

const QuizCard = (props) => {
    const classes = useStyles();
    const [data, setData] = useState(undefined);
    const [difficulty, setDifficulty] = useState("");
    const [clue, setClue] = useState("Click on me if you want a clue !");
    const [resAnswer, setResAnswer] = useState("Click on me if you want the answer !");
    const [category, setCategory] = useState(0);
    const [reset, setReset] = useState(0);
    const [hidden, setHidden] = useState(null);

    useEffect(
        () => {
            async function fetchData() {
                let res = await getQuestion(difficulty, category);
                setData(res);
            }

            fetchData();
        }, [difficulty, category, reset]);

    const content = (data) => {
        if (data === undefined) {
            return (
                <div style={{textAlign: "center", marginLeft: "15px", marginRight: "15px", marginTop: "15px"}}>
                    <h4>Loading</h4>
                </div>
            );
        } else {
            let theme = data.results[0].category;
            let diff = data.results[0].difficulty;
            let type = data.results[0].type;
            let question = data.results[0].question;
            let clue_answer = "You really think that you're getting a clue on a true or false ?";
            if (type !== "boolean") {
                clue_answer = "the answer isn't " + data.results[0].incorrect_answers[0];
            }
            let answer = "the answer is " + data.results[0].correct_answer;
            return (
                <div>
                    <Grid container spacing={2}>
                        <Grid item xs={10}>
                            <Typography variant="body1" color="textSecondary">
                                Category : {theme}<br/>Difficulty : {diff}
                            </Typography>
                        </Grid>
                        <Grid item xs={2}>
                            <IconButton onClick={() => {
                                setReset(reset + 1);
                                setResAnswer("Click on me if you want the answer !");
                                setClue("Click on me if you want a clue !")
                            }}>
                                <LoopIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="h6">
                                {question} {type === "boolean" ? "True or False ?" : ""}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary">
                                <Grid item xs={12}>
                                    {type === "boolean" ? "True or False ?" : data.results[0].correct_answer}
                                </Grid>
                                <Grid item xs={12}>
                                    {type === "boolean" ? "" : data.results[0].incorrect_answers[2]}
                                </Grid>
                                <Grid item xs={12}>
                                    {type === "boolean" ? "" : data.results[0].incorrect_answers[0]}
                                </Grid>
                                <Grid item xs={12}>
                                    {type === "boolean" ? "" : data.results[0].incorrect_answers[1]}
                                </Grid>
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary" onClick={() => {
                                setClue(clue_answer)
                            }}>
                                {clue}
                            </Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Typography variant="body1" color="textSecondary" onClick={() => {
                                setResAnswer(answer)
                            }}>
                                {resAnswer}
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            );
        }
    };

    const [modal, setModal] = useState(true);
    const [modalDifficulty, setModalDifficulty] = useState("");
    const [modalCategory, setModalCategory] = useState(0);

    const toggle = () => setModal(!modal);

    if (hidden === "hidden") {
        return (<Card hidden>Nasa</Card>);
    } else {
        return (
            <Card>
                <Modal show={modal} onHide={toggle} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>Quiz params</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <label>Quiz difficulty</label>
                                <Input type="select" onChange={e => setModalDifficulty(e.target.value)}>
                                    <option selected={difficulty === "easy"}>easy</option>
                                    <option selected={difficulty === "medium"}>medium</option>
                                    <option selected={difficulty === "hard"}>hard</option>
                                    <option value={""} selected={difficulty === ""}>random</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Body>
                        <Form>
                            <FormGroup>
                                <label>Quiz category</label>
                                <Input type="select" onChange={e => setModalCategory(e.target.value)}>
                                    <option value={0} selected={category == 0}>random</option>
                                    <option value={31} selected={category == 31}>Entertainment: Japanese Anime & Manga</option>
                                    <option value={32} selected={category == 32}>Entertainment: Cartoon & Animations</option>
                                    <option value={30} selected={category == 30}>Science: Gadgets</option>
                                    <option value={29} selected={category == 29}>Entertainment: Comics</option>
                                    <option value={28} selected={category == 28}>Vehicles</option>
                                    <option value={27} selected={category == 27}>Animals</option>
                                    <option value={26} selected={category == 26}>Celebrities</option>
                                    <option value={25} selected={category == 25}>Art</option>
                                    <option value={24} selected={category == 24}>Politics</option>
                                    <option value={23} selected={category == 23}>History</option>
                                    <option value={22} selected={category == 22}>Geography</option>
                                    <option value={21} selected={category == 21}>Sports</option>
                                    <option value={20} selected={category == 20}>Mythology</option>
                                    <option value={19} selected={category == 19}>Science: Mathematics</option>
                                    <option value={18} selected={category == 18}>Science: Computers</option>
                                    <option value={17} selected={category == 17}>Science & Nature</option>
                                    <option value={16} selected={category == 16}>Entertainment: Board Games</option>
                                    <option value={15} selected={category == 15}>Entertainment: Video Games</option>
                                    <option value={14} selected={category == 14}>Entertainment: Television</option>
                                    <option value={13} selected={category == 13}>Entertainment: Musicals & Theatres</option>
                                    <option value={12} selected={category == 12}>Entertainment: Music</option>
                                    <option value={11} selected={category == 11}>Entertainment: Film</option>
                                    <option value={10} selected={category == 10}>Entertainment: Books</option>
                                    <option value={9} selected={category == 9}>General Knowledge</option>
                                </Input>
                            </FormGroup>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className={classes.save} onClick={() => {
                            setDifficulty(modalDifficulty);
                            setCategory(modalCategory);
                            toggle()
                        }}>Save</Button>
                    </Modal.Footer>
                </Modal>
                <Toolbar position="static" className={classes.nasaHeader}>
                    <Grid container spacing={1}>
                        <Grid item xs={2}>
                            <IconButton edge="start" color="inherit" aria-label="menu">
                                <QuizIcon/>
                            </IconButton>
                        </Grid>
                        <Grid item xs={8}>
                            <div style={{marginTop: "10px"}}>
                                <Typography style={{textAlign: "center"}} variant="h5">
                                    Quiz
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

export default QuizCard;
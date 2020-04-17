import React, {useState} from "react";
import './App.css';
import DashboardCard from "./components/Card/card";
import NasaCard from "./widgets/nasa";
import AccuWeatherCard from "./widgets/accuWeather";
import FluidGrid from 'react-fluid-grid'
import Fab from '@material-ui/core/Fab'
import AddIcon from '@material-ui/icons/Add'
import {Button, Modal} from "react-bootstrap";
import {makeStyles} from "@material-ui/core";
import ExchangeCard from "./widgets/Exchange";
import PotterCard from "./widgets/Potter";
import QuizCard from "./widgets/Quiz";
import MovieCard from "./widgets/Movie";
import Cookie from 'js-cookie';
import API from './utils/API';

const useStyles = makeStyles(theme => ({
    add: {
        backgroundColor: "#12ACDE",
        position: "fixed",
        zIndex:99,
        top:"90%",
        left:"95%",
        border: "#12ACDE",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#0F91BC"
        }
    },
    save: {
        backgroundColor: "#12ACDE",
        border: "#12ACDE",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#0F91BC"
        }
    },
    close: {
        backgroundColor: "#B0B0B0",
        border: "#B0B0B0",
        color: "#FFFFFF",
        "&:hover": {
            backgroundColor: "#8C8C8C"
        }
    },
    radio: {
        marginRight: "8px",
        backgroundColor: "#12ACDE",
        border: "#12ACDE",
        color: "#FFFFFF",
    },
}));

const styleStrategies = [
    { mediaQuery: '(max-width: 719.9px)', style: { numberOfColumns: 1, gutterHeight: 5, gutterWidth: 0 } },
    { mediaQuery: '(min-width: 720px) and (max-width: 1023.9px)', style: { numberOfColumns: 2, gutterHeight: 15, gutterWidth: 15 } },
    { mediaQuery: '(min-width: 1024px)', style: { numberOfColumns: 3, gutterHeight: 30, gutterWidth: 30 } }
];

const transition = 'top 100ms ease-in-out, left 100ms ease-in-out';

function Home() {
    const classes = useStyles();
    const email = Cookie.get('email');
    const [show, setShow] = useState(false);
    const [array, setArray] = useState([]);
    // const [tmp, setTmp] = useState(null);
    const [options, setOptionChange] = useState("nasa");

    // const dashboard = async () => {
    //     let res = await API.getDashboard({email});
    //     console.log(res.text);
    //     setTmp(res.text);
    //     if (tmp !== null && tmp.text !== [])
    //         setArray(JSON.parse(tmp.text));
    // };

    // useEffect(() => { async function fetchData() {
    //     let res = await API.getDashboard({email});
    //     console.log(res.text);
    //     setTmp(res.text);
    //     if (tmp !== null && tmp.text !== [])
    //         setArray(JSON.parse(tmp.text));
    // }
    //     fetchData();
    // },[]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const handleOptionChange = changeEvent => setOptionChange(changeEvent.target.value);
    const handleFormSubmit = () => {
        console.log("You have submitted:", options);
    };

    const addCard = (tag) => {
        handleClose();
        handleFormSubmit();
        setArray([...array, tag]);
        send();
    };

    const send = async () => {
        const dashboard = JSON.stringify(array);
        await API.saveDashboard({email, dashboard});
    };

    const handleCard = () => {
        if (options === 'nasa') {
            return addCard(<NasaCard rover={"Spirit"} param={"random"}/>);
        } else if (options === 'meteo') {
            return addCard(<AccuWeatherCard city={"Los angeles"}/>);
        } else if (options === 'exchange') {
            return addCard(<ExchangeCard/>);
        } else if (options === 'potter') {
            return addCard(<PotterCard/>);
        } else if (options === 'quiz') {
            return addCard(<QuizCard/>);
        } else if (options === 'movie') {
            return addCard(<MovieCard/>);
        } else {
            return addCard(<DashboardCard/>);
        }
    };

    return (
        <div>
            <div style={{padding: 10}}>
                <FluidGrid styleStrategies={styleStrategies} transition={transition}>
                    {
                        array.map(card => (
                            card
                        ))
                    }
                </FluidGrid>
            </div>
            <Fab className={classes.add} onClick={handleShow}><AddIcon/></Fab>
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Add a service</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <label>
                        <input
                            type="radio"
                            value="nasa"
                            checked={options === "nasa"}
                            onChange={handleOptionChange}
                            className={classes.radio}
                        />
                        Nasa Service
                    </label>
                </Modal.Body>
                <Modal.Body><label>
                    <input
                        type="radio"
                        value="meteo"
                        checked={options === "meteo"}
                        onChange={handleOptionChange}
                        className={classes.radio}
                    />
                    Weather Service
                </label></Modal.Body>
                <Modal.Body><label>
                    <input
                        type="radio"
                        value="exchange"
                        checked={options === "exchange"}
                        onChange={handleOptionChange}
                        className={classes.radio}
                    />
                    Exchange Service
                </label></Modal.Body>
                <Modal.Body><label>
                    <input
                        type="radio"
                        value="potter"
                        checked={options === "potter"}
                        onChange={handleOptionChange}
                        className={classes.radio}
                    />
                    Harry Potter Service
                </label></Modal.Body>
                <Modal.Body><label>
                    <input
                        type="radio"
                        value="quiz"
                        checked={options === "quiz"}
                        onChange={handleOptionChange}
                        className={classes.radio}
                    />
                    Quiz Service
                </label></Modal.Body>
                <Modal.Body><label>
                    <input
                        type="radio"
                        value="movie"
                        checked={options === "movie"}
                        onChange={handleOptionChange}
                        className={classes.radio}
                    />
                    Movie Service
                </label></Modal.Body>
                <Modal.Footer>
                    <Button className={classes.close} onClick={handleClose}>
                        Close
                    </Button>
                    <Button className={classes.save} onClick={handleCard}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default Home;

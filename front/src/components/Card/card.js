import React from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import DashboardIcon from "@material-ui/icons/Dashboard";
import {makeStyles} from "@material-ui/core";

const useStyles = makeStyles(theme => ({
    templateHeader: {
        backgroundColor: "#A0A0A0",
        color: "#FFFFFF"
    }
}));

const DashboardCard = (props) => {
    const classes = useStyles();
    return (
        <Card>
            <Toolbar position="static" className={classes.templateHeader}>
                <IconButton edge="start" color="inherit" aria-label="menu">
                    <DashboardIcon/>
                </IconButton>
                <Typography variant="h6">
                    Template
                </Typography>
            </Toolbar>
            <CardContent>
                <Typography color="textSecondary" gutterBottom>
                    template
                </Typography>
                <Typography variant="body2" component="p">
                    template
                </Typography>
            </CardContent>
        </Card>
    );
};

export default DashboardCard;
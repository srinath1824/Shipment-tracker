import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";

const useStyles = makeStyles({
    root: {
      minWidth: 275,
      margin: 50,
      padding: 20
    },
    actions: {
        display: "flex",
        textAlign: "center",
        alignItems: "center",
        justifyContent: "center",
    },
    center: {
        textAlign: "center"
    }
  });

export default function Login(props) {
    const classes = useStyles();

    return (
        <div>
            <Card className={classes.root}>
            <CardContent>
                <div className={classes.center}><h2 >Login</h2></div>
                <Grid container className={classes.actions}>
                <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <strong>Username:</strong> 
                    </Grid>
                    <Grid item xs={4}>
                        <TextField required id="outlined-basic" name="username" onChange={(e) => props.handleTextChange(e)} label={`Enter Username`} variant="outlined" />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
                <br/>
                <Grid container className={classes.actions}>
                <Grid item xs={2}></Grid>
                    <Grid item xs={4}>
                        <strong>Password:</strong>
                    </Grid>
                    <Grid item xs={4}>
                        <TextField type="password" required id="outlined-basic" name="password" onChange={(e) => props.handleTextChange(e)} label={`Enter Password`} variant="outlined" />
                    </Grid>
                    <Grid item xs={2}></Grid>
                </Grid>
            </CardContent>
            <CardActions className={classes.actions}>
                <Button variant="contained" color="primary" size="large" onClick={props.handleLogin}>Login</Button>
            </CardActions>
            </Card>
        </div>
    )
}

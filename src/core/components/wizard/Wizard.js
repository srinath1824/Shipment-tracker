import React from 'react';
import TextField from '@material-ui/core/TextField';
import { Grid } from "@material-ui/core";
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

export default function Wizard(props) {
    const { values, uiComponent, step } = props;
    let leftView = Object.values(uiComponent[step - 1])[0].map((data, index) => {
        if(index % 2 === 0) {
            return (
                <div style={{margin: "10px"}} key={index}>
                <Grid container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Grid item xs={4}>{data.label}:</Grid>
                    <Grid item xs={8}>
                    { data.element === "textField" ? 
                        <TextField type={typeof values !== "object" && "number" } required id="outlined-basic" value={typeof values === "object" ? values[data.label] : values} name={data.label} onChange={(e) => props.handleTextFieldChange(e)} label={`Enter ${data.label}`} variant="outlined" />
                        : <FormControl variant="outlined" style={{minWidth: 150}}>
                            <InputLabel id="demo-simple-select-outlined-label">shipping option</InputLabel>
                            <Select
                            labelId="demo-simple-select-outlined-label"
                            id="demo-simple-select-outlined"
                            value={values}
                            onChange={e => props.handleShipingOption(e)}
                            label="shipping option"
                            >
                            <MenuItem value={1}>Ground</MenuItem>
                            <MenuItem value={2}>Priority</MenuItem>
                            </Select>
                        </FormControl>
                        }
                    </Grid>
                </Grid>
                </div>
            )
        }
    });
    let rightView = Object.values(uiComponent[step - 1])[0].map((data, index) => {
        if(index % 2 !== 0) {
            return (
                <div style={{margin: "10px"}} key={index}>
                { data.element === "textField" &&
                <Grid container style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
                    <Grid item xs={4}>{data.label}:</Grid>
                    <Grid item xs={8}>
                        <TextField required id="outlined-basic" value={typeof values === "object" ? values[data.label] : values} name={data.label} onChange={(e) => props.handleTextFieldChange(e)} label={`Enter ${data.label}`} variant="outlined" />
                    </Grid>
                </Grid>
                }
                </div>
            )
        }
    });
    return (
        <div style={{display: "flex", alignItems: "center", padding: "20px"}}>
            <Grid container>
                <Grid item xs={6}>
                    {leftView}
                </Grid>
                <Grid item xs={6}>
                    {rightView}
                </Grid>
            </Grid>
        </div>
    )
}

import React from 'react';
import { Grid } from "@material-ui/core";

function ShippingLableMaker(props) {
    let val = Object.values(props.data);
    const priceCalculation = () => {
        const ShippingOption = { 
            ground: 1,
            priority: 2 
        }
        const shippingRate = 0.40; 
        let shippingCost = val[2] * shippingRate * (val[3] === ShippingOption.ground ? 1 : 1.5);
        return shippingCost.toFixed(1);
    }

    const preview = val.map((d, index) => {
        if(typeof d === "object") {
            return (
                <div key={index} style={{padding: "20px 0px"}}>
                <div style={{margin: "10px 0px", fontWeight: "bold"}}>{index === 0 ? "Receiver's address" : "Sender's address"}</div>
                <Grid container>
                    {Object.keys(d).map((keys, index) => {
                        return (
                            <React.Fragment key={index}>
                                <Grid item xs={4}>{keys}&nbsp;:&nbsp;</Grid>
                                <Grid item xs={8}>{d[keys]}</Grid>
                            </React.Fragment>
                        )
                    })}
                </Grid>
                </div>
            )
        } else {
            return (
            <Grid container>
                <Grid item xs={4}>
                    <div style={{margin: "10px 0px", fontWeight: "bold"}}>{index === 2 ? "Weight" : "Shipping options"}</div>
                </Grid>
            <Grid item xs={8}>
                <div style={{margin: "10px 0px"}}>{d}</div>
            </Grid>
            </Grid>
            )}
    });
    return (
        <div>
            {preview}
            <Grid container>
                <Grid item xs={4}>
                    <div style={{margin: "10px 0px", fontWeight: "bold"}}>Total price</div>
                </Grid>
                <Grid item xs={8}>
                    <div style={{margin: "10px 0px", fontWeight: "bold"}}>{priceCalculation()}$</div>
                </Grid>
            </Grid>
        </div>
    )
}

export default ShippingLableMaker;


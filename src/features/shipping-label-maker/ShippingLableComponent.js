import React, { useState } from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import LinearProgress from '@material-ui/core/LinearProgress';
import Wizard from "../../core/components/wizard/Wizard";
import ShipplingLabelMarker from "./ShippingLableMaker";

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 10,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor: theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#1a90ff',
  },
}))(LinearProgress);

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: 50,
    padding: 20
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 25,
  },
  pos: {
    marginBottom: 12,
  },
  actions: {
      display: "flex",
      textAlign: "center",
      alignItems: "center",
      justifyContent: "center",
  }
});

export default function ShipingLabelComponent() {
  const classes = useStyles();
  const [ step, setStep ] = useState(1);
  const [ percent, setPercent] = useState(0);
  const [error, setError] = useState('');
  const [ shippingData, setShippingData ] = useState({
      from: {
        Name: "", 
        Street: "", 
        City: "",
        State: "",
        Zip: ""
      },
      to: {
        Name: "", 
        Street: "", 
        City: "",
        State: "",
        Zip: ""
      },
      weight: "",
      shippingOption: ""
  });

  let uiComponent = [{
      from: [
        {
            label: "Name",
            element: "textField"
        },
        {
            label: "Street",
            element: "textField"
        },
        {
            label: "City",
            element: "textField"
        },
        {
            label: "State",
            element: "textField"
        },
        {
            label: "Zip",
            element: "textField"
        }
    ]},
    {to: [
        {
            label: "Name",
            element: "textField"
        },
        {
            label: "Street",
            element: "textField"
        },
        {
            label: "City",
            element: "textField"
        },
        {
            label: "State",
            element: "textField"
        },
        {
            label: "Zip",
            element: "textField"
        }
    ]},
    {weight: [
        {
            label: "Weight",
            element: "textField"
        }
    ]},
    {shippingOption: [
        {
            label: "Shipping Option",
            element: "radio"
        },
        {
            label: "Shipping Option",
            element: "radio"
        }
    ]
  }]

  const handleStepChange = (action) => {
    let currentStep = step;
    let err = false;
    if (currentStep === 1 ) {
        for (let i in shippingData.from) {
            if(shippingData.from[i] === "") {
                setError(`Please enter ${i} field`);
                err = true;
            }
        }
    } else if (currentStep === 2 ) {
        for (let i in shippingData.to) {
            if(shippingData.to[i] === "") {
                setError(`Please enter ${i} field`);
                err = true;
            }
        }
    } else if (currentStep === 3) {
        if(shippingData.weight === "") {
            setError(`Please enter weight field`)
            err = true;
        }
    } else if (currentStep == 4) {
        if(shippingData.shippingOption === "") {
            setError(`Please enter shippingOption field`)
            err = true;
        }
    }
        if (currentStep !== 0 && action === "prev") {
            setError("");
            setStep(currentStep - 1);
            setPercent( percent - 25 );
        } else if (action === "next"){
            if(!err) {
            setError("");
            setStep(currentStep + 1);
            setPercent( percent + 25 );
        }
    }
  };

  let title = '';
  let values = null;
  switch(step) {
    case 1: 
        title = "Enter the receiver\'s address";
        values = shippingData.from;
        break;
    case 2: 
        title = "Enter the sender\'s address";
        values = shippingData.to;
        break;
    case 3: 
        title = "Enter the weight in Kg";
        values = shippingData.weight;
        break;
    case 4: 
        title = "Select the shipping option";
        values = shippingData.shippingOption;
        break;
  }

  const handleTextFieldChange = (e) => {
    if(step === 1) {
        setShippingData({...shippingData, from: {
            ...shippingData.from,
            [e.target.name]: e.target.value
        }});
    } else if(step === 2) {
        setShippingData({...shippingData, to: {
            ...shippingData.to,
            [e.target.name]: e.target.value
        }});
    } else if(step === 3) {
        setShippingData({...shippingData, weight: parseInt(e.target.value)});
    }
};

const handleShipingOption = e => {
    setShippingData({...shippingData, shippingOption: e.target.value});
  }

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h1" color="textPrimary" gutterBottom>
          Shipping Label Maker
        </Typography>
        <BorderLinearProgress variant="determinate" value={percent} />
        <div style={{padding: "20px 0px"}}>
            <Typography variant="h6" component="h2">
            {title}
            </Typography>
            { step <= 4 ? <Wizard step={step} values={values} uiComponent={uiComponent} shippingData={shippingData} setShippingData={setShippingData} handleTextFieldChange={(e) => handleTextFieldChange(e)} handleShipingOption={e => handleShipingOption(e)}/>
               :  <ShipplingLabelMarker data={shippingData}/>
            }
        </div>
        <div style={{ color: "red", textAlign: "center" }}>{error}</div>
      </CardContent>
      <CardActions className={classes.actions}>
        <Button variant="contained" color="primary" size="large" disabled={step === 1} onClick={() => handleStepChange('prev')}>Previous</Button>
        <Button variant="contained" color="primary" size="large" disabled={step === 5}onClick={() => handleStepChange('next')}>Next</Button>
      </CardActions>
    </Card>
  );
}

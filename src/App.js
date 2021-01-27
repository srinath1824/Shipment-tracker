import React, {useState} from 'react';
import Container from '@material-ui/core/Container';
import Login from "./Login"
import ShippingLabelComponent from "./features/shipping-label-maker/ShippingLableComponent";

function App() {
  const [login, setLogin] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleTextChange = (e) => {
    if(e.target.name === "username") {
        setUsername(e.target.value);
    } else {
        setPassword(e.target.value);
    }
};

  const handleLogin = () => {
    if(username === "guest" && password === "guest") {
        setLogin(true);
    }
}

  return (
    <div>
      <Container maxWidth="md">
        { !login ? <Login handleLogin={handleLogin} handleTextChange={(e) => handleTextChange(e)}/> : <ShippingLabelComponent />
        }
      </Container>
    </div>
  );
}

export default App;

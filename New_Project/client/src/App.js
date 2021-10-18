import Axios from 'axios';
import './App.css';
import React from "react";

function App() {
  const [emailReg, setEmailReg] = React.useState("");
  const [passwordReg, setPasswordReg] = React.useState("");
  const [fNameReg, setFNameReg] = React.useState("");
  const [lNameReg, setLNameReg] = React.useState("");

  const [emailLogin, setEmailLogin] = React.useState("");
  const [passwordLogin, setPasswordLogin] = React.useState("");
  const[loginStatus, setLoginStatus] = React.useState("Login or Register");

  const [data, setData] = React.useState(null);

  Axios.defaults.withCredentials = true;
  const register = () => {
    Axios.post('http://localhost:3001/register', {
      fName: fNameReg, 
      lName: lNameReg, 
      email: emailReg, 
      password: passwordReg},)
      .then((response) =>{
        console.log(response);
      })
  };

  const login = () => {
    console.log("Pressed");
    Axios.post('http://localhost:3001/login', {
      email: emailLogin, 
      password: passwordLogin})
      .then((response) =>{
        console.log(response);

      })
  };

  // const user = () => {
  //   console.log("Pressed");
  //   Axios.get('http://localhost:3001/user')
  //     .then((response) =>{
  //       console.log(response.data);
  //       setData(response.data);
  //     })
  // };

  React.useEffect( () => {
    Axios.get('http://localhost:3001/user')
      .then((response) =>{
        console.log(response.data);
        //setData(response.data);
      })
  }, []);

  return (
    <div className="App">
      <div className="registration">
        <label>First Name</label>
        <input type="text" onChange={(e) => {setFNameReg(e.target.value)}}/>
        <label>Last Name</label>
        <input type="text" onChange={(e) => {setLNameReg(e.target.value)}}/>
        <label>Email</label>
        <input type="text" onChange={(e) => {setEmailReg(e.target.value)}}/>
        <label>Password</label>
        <input type="text" onChange={(e) => {setPasswordReg(e.target.value)}}/>
        <button onClick={register}>Register</button>
      </div>

      <div className = "login">
        <label>Email</label>
        <input type="text" onChange={(e) => {setEmailLogin(e.target.value)}}/>
        <label>Password</label>
        <input type="text" onChange={(e) => {setPasswordLogin(e.target.value)}} />
        <button onClick={login}>Login</button>
      </div>

      <h1>{loginStatus}</h1>
    </div>
  );
}

export default App;

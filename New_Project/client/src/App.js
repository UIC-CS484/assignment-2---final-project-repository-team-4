import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";


import Login from "./components/login.component";
import SignUp from "./components/signup.component";
import Dashboard from "./components/dashboard.component";

function App() {
  return ( 
    <Router>
    <div className="App">
    <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/sign-in"}>Tidal</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-in"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/sign-up"}>Sign up</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Login}>
              <Login />
            </Route>
            <Route path="/sign-in" component={Login}>
              <Login />
            </Route>
            <Route path="/sign-up" component={SignUp}>
              <SignUp/>
            </Route>
            <Route path="/dashboard" component={Dashboard}>
              <Dashboard authed={true}/>
            </Route>
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}


//this.setState({stateVar: newVal});

// function App() {
//   const [emailReg, setEmailReg] = React.useState("");
//   const [passwordReg, setPasswordReg] = React.useState("");
//   const [fNameReg, setFNameReg] = React.useState("");
//   const [lNameReg, setLNameReg] = React.useState("");

//   const [emailLogin, setEmailLogin] = React.useState("");
//   const [passwordLogin, setPasswordLogin] = React.useState("");
//   const[loginStatus, setLoginStatus] = React.useState("Login or Register");

//   const [data, setData] = React.useState(null);

//   Axios.defaults.withCredentials = true;
//   const register = () => {
//     Axios.post('http://localhost:3001/register', {
//       fName: fNameReg, 
//       lName: lNameReg, 
//       email: emailReg, 
//       password: passwordReg},)
//       .then((response) =>{
//         console.log(response);
//       })
//   };

//   const login = () => {
//     console.log("Pressed");
//     Axios.post('http://localhost:3001/login', {
//       email: emailLogin, 
//       password: passwordLogin})
//       .then((response) =>{
//         console.log(response);

//       })
//   };

//   // const user = () => {
//   //   console.log("Pressed");
//   //   Axios.get('http://localhost:3001/user')
//   //     .then((response) =>{
//   //       console.log(response.data);
//   //       setData(response.data);
//   //     })
//   // };

//   React.useEffect( () => {
//     Axios.get('http://localhost:3001/user')
//       .then((response) =>{
//         console.log(response.data);
//         //setData(response.data);
//       })
//   }, []);

//   return (
//     <div className="App">
//       <div className="registration">
//         <label>First Name</label>
//         <input type="text" onChange={(e) => {setFNameReg(e.target.value)}}/>
//         <label>Last Name</label>
//         <input type="text" onChange={(e) => {setLNameReg(e.target.value)}}/>
//         <label>Email</label>
//         <input type="text" onChange={(e) => {setEmailReg(e.target.value)}}/>
//         <label>Password</label>
//         <input type="text" onChange={(e) => {setPasswordReg(e.target.value)}}/>
//         <button onClick={register}>Register</button>
//       </div>

//       <div className = "login">
//         <label>Email</label>
//         <input type="text" onChange={(e) => {setEmailLogin(e.target.value)}}/>
//         <label>Password</label>
//         <input type="text" onChange={(e) => {setPasswordLogin(e.target.value)}} />
//         <button onClick={login}>Login</button>
//       </div>

//       <h1>{loginStatus}</h1>
//     </div>
//   );
// }

export default App;

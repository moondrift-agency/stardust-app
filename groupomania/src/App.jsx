import {BrowserRouter, Switch, Route} from "react-router-dom";
import "./App.css";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

//components
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import UserList from "./components/UserList/UserList";

//logo
import logo from './assets/logos/logo-groupomania.png';

//redux
import store from './redux/store';
import {updateUser, logout} from "./redux/actions/userActions";

import JwtDecode from "jwt-decode";
import Profile from "./components/Profile/Profile";

const App = () => {
    const token = JSON.parse(localStorage.getItem("userToken"));

    if (token) {
        const decodedToken = JwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
            store.dispatch(logout())
        } else {
            store.dispatch(updateUser(decodedToken.sub));
        }
    }

    return (
        <div className="App">
            <BrowserRouter>
                <Navbar
                    logo={logo}
                />

                <Switch>
                    <Route exact path={["/", "/home"]} component={Home}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <Route exact path="/user/:id?" component={Profile}/>
                    <Route exact path="/users" component={UserList}/>
                </Switch>

                <Footer/>
            </BrowserRouter>
        </div>
    );
};

export default App;
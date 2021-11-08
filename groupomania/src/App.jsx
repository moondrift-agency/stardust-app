import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import "./App.css";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

//components
import PrivateRoute from './components/PrivateRoute/PrivateRoute';
import Navbar from './components/Navbar/Navbar';
import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";
import UserList from "./components/UserList/UserList";

//logo
import logo from './assets/logos/logo-groupomania.png';

//redux
import {logout} from "./redux/actions/userActions";

import Profile from "./components/Profile/Profile";

//notifications
import toast, { Toaster } from 'react-hot-toast';

const App = (props) => {
    const notify = () => {
        toast.success('Here is your toast.');
    }

    return (
        <div className="App">
            <button onClick={notify}>Make me a toast</button>
            <Toaster />

            <BrowserRouter>
                <Navbar
                    logo={logo}
                />

                <Switch>
                    <PrivateRoute exact path={["/", "/home"]} component={Home} />
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={Signup}/>
                    <PrivateRoute exact path="/user/:id?" component={Profile}/>
                    <PrivateRoute exact path="/users" component={UserList}/>
                </Switch>

                <Footer/>
            </BrowserRouter>
        </div>
    );
};

const mapActionsToProps = {
    logout
};

export default connect(null, mapActionsToProps)(App);
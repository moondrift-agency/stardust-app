import {BrowserRouter, Switch, Route} from "react-router-dom";
import {connect} from "react-redux";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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


const App = (props) => {
    return (
        <div className="App">
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
                <ToastContainer
                    position="bottom-center"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                />
                <Footer/>
            </BrowserRouter>
        </div>
    );
};

const mapActionsToProps = {
    logout
};

function mapStateToProps(state) {
    const {toastMessage} = state.toast
    return {
        toastMessage,
    };
}

export default connect(null, mapActionsToProps)(App);
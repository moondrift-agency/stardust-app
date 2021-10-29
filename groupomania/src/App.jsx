import {BrowserRouter, Switch, Route} from "react-router-dom";

//bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap';

//components
import Navbar from './components/Navbar/Navbar';
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Home from "./components/Home/Home";

//logo
import logo from './assets/logos/icon-left-font.svg';

//redux
import store from './redux/store';
import {updateUser, logout} from "./redux/actions/userActions";

import JwtDecode from "jwt-decode";

const App = (props) => {
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
                <Navbar/>
            </BrowserRouter>
        </div>
    );
};

export default App;
import {history} from "../../helpers/history";
import {Link, Route, Router, Switch} from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import logo from "../../assets/logos/icon-left-font.svg";
import Home from "../Home/Home";
import Login from "../Login/Login";
import Signup from "../Signup/Signup";
import Profile from "../Profile/Profile";

import { logout } from "../../redux/actions/userActions";

const Navbar = (state) => {
    const currentUser = useSelector((state) => state.user);

    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
    }

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                    <div className="container-fluid">
                        <Link to={"/"} className="navbar-brand">
                            <img className="d-inline-block align-text-top" alt="" src=""></img>
                        </Link>
                        <div className="collapse navbar-collapse">
                            <div className="navbar-nav me-auto mb-2 mb-lg-0">
                                <li className="nav-item">
                                    <Link to={"/home"} className="nav-link">
                                        Accueil
                                    </Link>
                                </li>

                                {currentUser.isLoggedIn && (
                                    <li className="nav-item">
                                        <Link to={"/profile"} className="nav-link">
                                            Utilisateurs
                                        </Link>
                                    </li>
                                )}
                            </div>
                            <div className="d-flex">
                                {currentUser.isLoggedIn ? (
                                    <div className="navbar-nav ml-auto">
                                        <div className="btn-group">
                                            <button type="button" className="btn btn-secondary dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                                                {currentUser.data.firstname + ' ' + currentUser.data.lastname}
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-end">
                                                <li><Link to={"/profile"} className="nav-link"><button className="dropdown-item" type="button">Voir mon profil</button></Link></li>
                                                <li><hr className="dropdown-divider"></hr></li>
                                                <li><button className="dropdown-item" type="button" onClick={ logOut }>Se déconnecter</button></li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="navbar-nav ml-auto">
                                        <li className="nav-item">
                                            <Link to={"/login"} className="nav-link">
                                                Se connecter
                                            </Link>
                                        </li>

                                        <li className="nav-item">
                                            <Link to={"/signup"} className="nav-link">
                                                S'inscrire
                                            </Link>
                                        </li>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path={["/", "/home"]} component={Home} />
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/signup" component={Signup} />
                        <Route exact path="/profile/:id" component={Profile} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
}

function mapStateToProps(state) {
    const { user } = state.user;
    return {
        user,
    }
}

export default connect(mapStateToProps)(Navbar);
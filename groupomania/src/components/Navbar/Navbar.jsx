import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";
import {logout} from "../../redux/actions/userActions";
import "./NavBar.css";

const Navbar = (props) => {
    const currentUser = useSelector((state) => state.user);
    const currentUserProfile = "/user/"+currentUser.id;
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light sticky-top">
            <div className="container d-flex">
                <Link to={"/"} className="navbar-brand">
                    <img className="d-inline-block align-text-top" height="28" alt="" src={props.logo}></img>
                </Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                        data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                        aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavDropdown">
                    <div className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <Link to={"/home"} className="nav-link">
                                Accueil
                            </Link>
                        </li>

                        {currentUser.isLoggedIn && (
                            <li className="nav-item">
                                <Link to={"/users"} className="nav-link">
                                    Utilisateurs
                                </Link>
                            </li>
                        )}
                    </div>
                    <div className="d-flex">
                        {currentUser.isLoggedIn ? (
                            <div className="navbar-nav ml-auto">
                                <button className="btn btn-danger" type="button" onClick={logOut}>
                                    <i className="fas fa-sign-out-alt"></i> Se déconnecter
                                </button>
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
    );
}

function mapStateToProps(state) {
    const {user} = state.user;
    return {
        user,
    }
}

export default connect(mapStateToProps)(Navbar);
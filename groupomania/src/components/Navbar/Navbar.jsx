import {Link} from "react-router-dom";
import {connect, useDispatch, useSelector} from "react-redux";

import {logout} from "../../redux/actions/userActions";

const Navbar = (state) => {
    const currentUser = useSelector((state) => state.user);
    const currentUserProfile = "/user/"+currentUser.id;
    const dispatch = useDispatch();

    const logOut = () => {
        dispatch(logout());
    }

    return (
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
                                <Link to={"/users"} className="nav-link">
                                    Utilisateurs
                                </Link>
                            </li>
                        )}
                    </div>
                    <div className="d-flex">
                        {currentUser.isLoggedIn ? (
                            <div className="navbar-nav ml-auto">
                                <div className="btn-group">
                                    <button type="button" className="btn btn-secondary dropdown-toggle"
                                            data-bs-toggle="dropdown" aria-expanded="false">
                                        {currentUser.data.firstname + ' ' + currentUser.data.lastname}
                                    </button>
                                    <ul className="dropdown-menu dropdown-menu-end">
                                        <li><Link to={"/user"} className="nav-link">
                                            <button className="dropdown-item" type="button">Voir mon profil</button>
                                        </Link></li>
                                        <li>
                                            <hr className="dropdown-divider"></hr>
                                        </li>
                                        <li>
                                            <button className="dropdown-item" type="button" onClick={logOut}>Se
                                                déconnecter
                                            </button>
                                        </li>
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
    );
}

function mapStateToProps(state) {
    const {user} = state.user;
    return {
        user,
    }
}

export default connect(mapStateToProps)(Navbar);
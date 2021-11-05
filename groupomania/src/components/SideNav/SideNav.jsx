import {Link} from "react-router-dom";
import {connect, useSelector} from "react-redux";
import defaultAvatar from "../../assets/default-avatar.png";
import "./SideNav.css";

const SideNav = () => {
    const currentUser = useSelector((state) => state.user);
    const currentUserProfile = "/user/"+currentUser.data.id;

    let avatar;
    if (currentUser.data.avatar === null) {
        avatar = defaultAvatar;
    } else if (currentUser.data.avatar !== null) {
        avatar = currentUser.data.avatar;
    }

    return (
        <div className="card">
            <div className="card-body text-center">
                <img className="card-sidenav-avatar img-fluid img-thumbnail rounded-circle border-0 mb-3" src={avatar} alt="User"></img>
                <h5 className="card-title card-sidenav-name">{currentUser.data.firstname} {currentUser.data.lastname}</h5>
                {currentUser.data.job === undefined ? (
                    <p className="badge-job text-secondary mb-1">{currentUser.data.job}</p>
                ) : null}
                {currentUser.data.department === undefined ? (
                    <p className="text-muted font-size-sm">{currentUser.data.department}</p>
                ) : null}
            </div>
            <div className="card-footer card-sidenav-footer d-flex justify-content-center">
                <Link to={currentUserProfile} className="nav-link">
                    <button className="btn-groupomania" type="button">
                        Voir mon profil
                    </button>
                </Link>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {user} = state.user;
    return {
        user,
    }
}

export default connect(mapStateToProps)(SideNav);
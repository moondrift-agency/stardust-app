import {useEffect, useRef, useState} from "react";
import {connect, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getUser} from "../../services/user.service";
import "./Profile.css"

const Profile = () => {
    let {id} = useParams();

    const [profile, setProfile] = useState()
    const user = useSelector((state) => state.user);

    //let [Owned, setOwned] = useState(false);

    useEffect(() => {
        if (id && id !== user.data.id) {
            getUser(id)
                .then(data => {
                    setProfile(data);
                });
        } else {

            //setOwned(true);
        }
    }, [])


    return (
        <div className="container h-100 d-flex justify-content-center align-items-center">
            <div className="col-md-8 card user-card-full">
                <div className="row">
                    <div className="col-sm-3 bg-c-lite-green user-profile">
                        <div className="card-block text-center text-white">
                            <img className="user-profile-avatar"
                                 src={user.data.avatar}
                                 alt="user avatar">
                            </img>
                            <h6 className="card-user-name">{user.data.firstname} {user.data.lastname}</h6>
                            <p>{user.data.job}</p>
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <div className="card-block">
                            <h6 className="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">E-mail</p>
                                    <h6 className="text-muted f-w-400">{user.data.email}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Membre depuis</p>
                                    <h6 className="text-muted f-w-400">{user.data.createdAt}</h6>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Département</p>
                                    <h6 className="text-muted f-w-400">{user.data.department}</h6>
                                </div>
                                <div className="col-sm-6">
                                    <p className="m-b-10 f-w-600">Poste occupé</p>
                                    <h6 className="text-muted f-w-400">{user.data.job}</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {user} = state.user
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);
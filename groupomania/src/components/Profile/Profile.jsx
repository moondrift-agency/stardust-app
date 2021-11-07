import React, {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {useParams} from "react-router";
import "./Profile.css"
import {getUser} from "../../services/user.service";
import EditProfile from "../EditProfile/EditProfile"

const Profile = (props) => {
    const {id} = useParams();

    const currentUser = useSelector((state) => state.user.data);
    const [user, setUser] = useState({});
    const [displayEdit, setDisplayEdit] = useState(false);
    const [isOwner, setIsOwner] = useState(false);

    useEffect(() => {
        if(id) {
            console.log(currentUser.id)
            if (id != currentUser.id) {
                getUser(id).then((response) => {
                    setIsOwner(false);
                    setUser(response);
                });
            } else if(id == currentUser.id) {
                setIsOwner(true);
                setUser(currentUser);
            }
        }

    }, [])

    const handleDisplayEdit = event => {
        if(displayEdit === true) {
            setDisplayEdit(false);
        } else {
            setDisplayEdit(true);
        }
    }

    return (
        <div>
            <div className="container h-100 d-flex justify-content-center align-items-center">
                <div className="col-md-8 card user-card-full">
                    <div className="row">
                        <div className="col-sm-3 bg-c-lite-green user-profile">
                            <div className="card-block text-center text-white">
                                <img className="user-profile-avatar"
                                     src={user.avatar}
                                     alt="user avatar">
                                </img>
                                <h6 className="card-user-name">{user.firstname} {user.lastname}</h6>
                            </div>
                        </div>
                        <div className="col-sm-9">
                            <div className="card-block">
                                <h6 className="">Information</h6>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="">E-mail</p>
                                        <h6 className="text-muted">{user.email}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="">Membre depuis</p>
                                        <h6 className="text-muted">{user.createdAt}</h6>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-sm-6">
                                        <p className="">Département</p>
                                        <h6 className="text-muted">{user.department}</h6>
                                    </div>
                                    <div className="col-sm-6">
                                        <p className="">Poste occupé</p>
                                        <h6 className="text-muted">{user.job}</h6>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="row">
                        {isOwner || currentUser.isAdmin ? (
                            <button className="btn-groupomania" onClick={handleDisplayEdit}>
                                <span>Editer</span>
                            </button>
                        ): null}
                        {displayEdit ? (
                            <EditProfile
                                id={user.id}
                                firstname={user.firstname}
                                lastname={user.lastname}
                                department={user.department}
                                job={user.job}
                            />
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const {user} = state.user.data
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);
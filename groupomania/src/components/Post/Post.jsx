import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import defaultAvatar from "../../assets/default-avatar.png";

import {deletePost} from "../../redux/actions/contentActions";

import "./Post.css";

const Post = (props) => {
    const userProfile = "/user/"+props.User.id;
    const [Owned, setOwned] = useState(false);
    const [userAvatar, setUserAvatar] = useState();
    const [postDate, setDate] = useState();
    const currentUser = useSelector((state) => state.user.data);

    useEffect(() => {
        if(currentUser.id === props.User.id ){
            setOwned(true);
        }

        if(props.User.avatar === null){
            setUserAvatar(defaultAvatar);
        } else if(props.User.avatar !== null) {
            setUserAvatar(props.User.avatar);
        }

        setDate(
            "Le " +
            new Date(props.createdAt).getDay() + "/" +
            new Date(props.createdAt).getMonth() + "/" +
            new Date(props.createdAt).getFullYear() + " à " +
            new Date(props.createdAt).getHours() + "h" +
            new Date(props.createdAt).getMinutes()
        );

    }, [])

    const onDeleteClick = () => {
        props.deletePost(props.id);
    }

    return(
        <div className="card mt-4 mb-4">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="45" src={userAvatar} alt=""></img>
                            <a className="user-link" href={userProfile}>{props.User.firstname} {props.User.lastname}</a>
                        </div>
                        <div className="ml-2">

                        </div>
                    </div>
                    {Owned ? (
                        <div>
                            <div className="dropdown">
                                <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    <i className="fas fa-ellipsis-h"></i>
                                </button>
                                <ul className="dropdown-menu dropdown-menu-right">
                                    <li className="dropdown-item red-li-button" onClick={onDeleteClick} type="button" href="#"><i className="fas fa-trash"></i> Supprimer</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div>

                        </div>
                    )
                    }
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{props.title}</h5>
                <div className="text-muted h7 mb-2"><i className="far fa-clock"></i> {postDate}</div>
                <img className="card-img" src={props.attachment}></img>

                <p className="card-text">
                    {props.content}
                </p>
            </div>
            <div className="card-footer">
                <a href="#" className="card-link"><i className="fa fa-gittip"></i> <i className="far fa-heart"></i></a>
                <a href="#" className="card-link"><i className="fa fa-comment"></i> Commentaires</a>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { user } = state.user.data;
    return {
        user,
    }
}

const mapActionsToProps = {
    deletePost,
};

export default connect(mapStateToProps, mapActionsToProps)(Post);
import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import defaultAvatar from "../../assets/default-avatar.png";

import {deletePost, likePost} from "../../redux/actions/contentActions";

import "./Post.css";
import CommentsContainer from "../CommentsContainer/CommentsContainer";

const Post = (props) => {
    //booleans
    const [displayComments, setDisplayComments] = useState(false);

    const userProfile = "/user/"+props.User.id;
    const [Owned, setOwned] = useState(false);
    const [userAvatar, setUserAvatar] = useState();
    const [postDate, setDate] = useState();
    const currentUser = useSelector((state) => state.user.data);
    const [isLiked, updateLike] = useState(false);
    
    useEffect(() => {
        if(currentUser.id === props.User.id ){
            setOwned(true);
        }

        if(props.User.avatar === null){
            setUserAvatar(defaultAvatar);
        } else if(props.User.avatar !== null) {
            setUserAvatar(props.User.avatar);
        }

        props.Likes.forEach(element => {
            if(hasValue(element, "UserId", currentUser.id)){
                updateLike(true);
            }   
        });
        
        setDate(
            "Le " +
            new Date(props.createdAt).getDay() + "/" +
            new Date(props.createdAt).getMonth() + "/" +
            new Date(props.createdAt).getFullYear() + " à " +
            new Date(props.createdAt).getHours() + "h" +
            new Date(props.createdAt).getMinutes()
        );

    }, [])

    const handleLike = () => {
        console.log('post liked');
        if(!isLiked){
            props.Likes.push(currentUser.id);
            likePost(props.id);
            updateLike(true);
        } else {
            props.Likes.pop(currentUser.id);
            likePost(props.id);
            updateLike(false);
        }
    }
    function hasValue(obj, key, value) {
        return obj.hasOwnProperty(key) && obj[key] === value ;
    }

    const onDeleteClick = () => {
        props.deletePost(props.id);
    }

    const handleDisplayComment = event => {
        if(displayComments === true) {
            setDisplayComments(false);
        } else {
            setDisplayComments(true);
        }
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
                    {(Owned || currentUser.isAdmin) ? (
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
                    ) : null
                    }
                </div>
            </div>
            <div className="card-body post-card-body">
                <div className="card-body-header d-flex flex-column">
                    <h5 className="post-card-title">{props.title}</h5>
                    <div className="post-card-date text-muted h7"><i className="far fa-clock"></i> {postDate}</div>
                </div>

                {props.attachment ? (
                    <img className="card-img" src={props.attachment}></img>
                ) : null
                }
                <p className="card-text">
                    {props.content}
                </p>
            </div>
            <div className="card-footer d-flex">
                <a onClick={handleLike} href className="card-link">
                { isLiked ?
                    <i onClick={handleLike} className="fas fa-heart"></i>  :  <i className="far fa-heart"></i>
                }
                {props.Likes.length}
                </a>
                <a className="card-link" onClick={handleDisplayComment}><i className="fa fa-comment"></i> Commentaires  {props.Comments.length}</a>
            </div>
            {displayComments ? (
                <CommentsContainer
                    id={props.id}
                    comments={props.Comments}
                />
            ) : null
            }

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
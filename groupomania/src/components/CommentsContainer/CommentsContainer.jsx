import CreateComment from "../CreateComment/CreateComment";
import {connect, useSelector} from "react-redux";
import './CommentsContainer.css';
import {useState} from "react";
import {deleteComment} from "../../redux/actions/contentActions";

const CommentsContainer = (props) => {
    const currentUser = useSelector((state) => state.user.data);
    const comments = useSelector((state) => state.content.posts);

    const [Owned, setOwned] = useState(false);

    const onDeleteClick = () => {
        props.deletePost(props.id);
    }

    return(
        <div className="container">
            {props.comments?.map(({id,User,message}) =>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <div className="post-comment mt-2 mb-2">
                            <div className="post-comment-author">
                                {User.firstname} {User.lastname}
                                {(Owned || currentUser.isAdmin) ? (
                                    <div>
                                        <div className="dropdown">
                                            <button className="post-btn post-ellipsis-btn dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                                <i className="fas fa-ellipsis-h"></i>
                                            </button>
                                            <ul className="dropdown-menu dropdown-menu-right">
                                                <li className="dropdown-item post-delete-button text-muted" onClick={onDeleteClick} type="button" href="#"><i className="fas fa-trash"></i> Supprimer</li>
                                            </ul>
                                        </div>
                                    </div>
                                ) : null
                                }
                            </div>
                            <div className="post-comment-message">
                                {message}
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <CreateComment
                id={props.id}
            />
        </div>
    );
}

const mapActionsToProps = {
    deleteComment,
};

export default connect(null, mapActionsToProps)(CommentsContainer);
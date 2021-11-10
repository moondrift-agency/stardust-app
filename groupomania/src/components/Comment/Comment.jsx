import React, {useEffect, useState} from 'react';
import {deleteComment} from "../../redux/actions/contentActions";
import {connect, useSelector} from "react-redux";

const Comment = (props) => {
    const currentUser = useSelector((state) => state.user.data);

    const [Owned, setOwned] = useState(false);

    const onDeleteClick = () => {
        props.deleteComment(props.id);
    }

    useEffect(() => {
        if(currentUser.id === props.author.id ){
            setOwned(true);
        }

    }, []);

    return (
        <div className="d-flex flex-column">
            <div className="d-flex flex-row">
                <div className="post-comment mt-2 mb-2">
                    <div className="post-comment-author">
                        {props.author.firstname} {props.author.lastname}
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
                        {props.message}
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapActionsToProps = {
    deleteComment,
};

export default connect(null, mapActionsToProps)(Comment);

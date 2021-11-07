import CreateComment from "../CreateComment/CreateComment";
import {useSelector} from "react-redux";
import './CommentsContainer.css';

const CommentsContainer = (props) => {
    const comments = useSelector((state) => state.content.posts);

    console.log(props.comments);

    return(
        <div className="container">
            {props.comments?.map(({id,User,message}) =>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        <div className="post-comment mt-2 mb-2">
                            <div className="post-comment-author">
                                {User.firstname} {User.lastname}
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

export default CommentsContainer;
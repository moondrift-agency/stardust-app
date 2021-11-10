import CreateComment from "../CreateComment/CreateComment";
import {useSelector} from "react-redux";
import './CommentsContainer.css';
import Comment from "../Comment/Comment";

const CommentsContainer = (props) => {
    const comments = useSelector((state) => state.content.posts);

    console.log(comments.Comments)

    return(
        <div className="container">
            {props.comments?.map(({id,User,message}) =>
                <Comment
                    id={id}
                    author={User}
                    message={message}
                />
            )}
            <CreateComment
                id={props.id}
            />
        </div>
    );
}

export default CommentsContainer;
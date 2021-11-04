import CreateComment from "../CreateComment/CreateComment";
import {useSelector} from "react-redux";

const CommentsContainer = (props) => {
    //const comments = useSelector((state) => state.content.posts);

    console.log(props.comments);

    return(
        <div className="container">
            {props.comments?.map(({id,User,message}) =>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        {User.firstname} {User.lastname} : {message}
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
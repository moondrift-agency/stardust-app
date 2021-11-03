import CreateComment from "../CreateComment/CreateComment";

const CommentsContainer = (props) => {


    return(
        <div className="container">
            <CreateComment
                id={props.id}
            />
        </div>
    );
}

export default CommentsContainer;
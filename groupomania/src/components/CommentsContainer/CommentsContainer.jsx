import CreateComment from "../CreateComment/CreateComment";

const CommentsContainer = (props) => {
    console.log(props.comments);

    return(
        <div className="container">
            {props.comments?.map(({id,UserId,User,message}) =>
                <div className="d-flex flex-column">
                    <div className="d-flex flex-row">
                        {message}
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
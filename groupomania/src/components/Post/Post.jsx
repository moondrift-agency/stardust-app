import { deletePost } from "../../services/posts.service";

const Post = ({id,content,attachment,title,createdAt,User,Likes,Comments,deleteClickHandler}) => {
    const userProfile = "/profile/"+User.id;

    const onDeleteClick = () => {
        deleteClickHandler();
        deletePost(id);
    }

    return(
        <div className="card mt-3 mb-3">
            <div className="card-header">
                <div className="d-flex justify-content-between align-items-center">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="mr-2">
                            <img className="rounded-circle" width="45" src={User.avatar} alt=""></img>
                            <a className="user-link" href={userProfile}>{User.firstname} {User.lastname}</a>
                        </div>
                        <div className="ml-2">

                        </div>
                    </div>
                    <div>
                        <div className="dropdown">
                            <button className="btn btn-link dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                <i className="fas fa-ellipsis-h"></i>
                            </button>
                            <ul className="dropdown-menu dropdown-menu-right">
                                <li className="dropdown-item" type="button" href="#">Modifier</li>
                                <li className="dropdown-item red-li-button" onClick={onDeleteClick} type="button" href="#"><i className="fas fa-trash"></i> Supprimer</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body">
                <h5 className="card-title">{title}</h5>
                <div className="text-muted h7 mb-2"><i className="far fa-clock"></i> {createdAt}</div>
                <img className="card-img" src={attachment}></img>

                <p className="card-text">
                    {content}
                </p>
            </div>
            <div className="card-footer">
                <a href="#" className="card-link"><i className="fa fa-gittip"></i> Like</a>
                <a href="#" className="card-link"><i className="fa fa-comment"></i> Commentaires</a>
            </div>
        </div>
    );
}

export default Post;
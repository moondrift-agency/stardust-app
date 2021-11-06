import PostsContainer from "../PostsContainer/PostsContainer";
import {connect, useSelector} from "react-redux";

const Home = (props) => {
    const currentUser = useSelector((state) => state.user);

    return(
        <div className="container mt-4 mb-4">
            {currentUser.isLoggedIn ? (
                <PostsContainer/>
            ) : (
                <div className="alert alert-danger" role="alert">
                    Vous devez être connecté pour voir les posts !
                </div>
            )
            }
        </div>
    );
}

function mapStateToProps(state) {
    const { user } = state.user;
    return {
        user,
    }
}

export default connect(mapStateToProps)(Home);
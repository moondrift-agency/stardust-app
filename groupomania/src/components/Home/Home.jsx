import PostsContainer from "../PostsContainer/PostsContainer";
import {connect, useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

const Home = (props) => {
    const currentUser = useSelector((state) => state.user);

    return(
        <div className="container mt-4 mb-4">
            {currentUser.isLoggedIn ? (
                <PostsContainer/>
            ) : (
                <Redirect to="/login" />
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
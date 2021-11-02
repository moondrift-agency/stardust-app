import React, {useEffect} from 'react';
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";

import { getPosts } from "../../redux/actions/contentActions";
import {connect, useSelector} from "react-redux";
import SideNav from "../SideNav/SideNav";

const PostsContainer = (props) => {
    const posts = useSelector((state) => state.content.posts);

    useEffect(() => {
        props.getPosts();
    },[]);

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <SideNav/>
                </div>
                <div className="col-md-9">
                    <CreatePost/>
                    <div className='posts-container'>
                        {posts?.map(({id,content,attachment,title,createdAt,User,Likes,Comments}) =>
                            <Post
                                key={"post-"+id}
                                id={id}
                                content={content}
                                attachment={attachment}
                                title={title}
                                createdAt={createdAt}
                                User={User}
                                Likes={Likes}
                                Comments={Comments}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

const mapActionsToProps = { getPosts };

function mapStateToProps(state) {
    const { posts } = state.content;
    return {
        posts,
    }
}

export default connect(mapStateToProps, mapActionsToProps)(PostsContainer);
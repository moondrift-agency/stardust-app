import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";

import { getPosts } from "../../redux/actions/postsActions";
import {connect, useDispatch, useSelector} from "react-redux";

const PostsContainer = (props) => {
    const posts = useSelector((state) => state.content.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts());
    },[]);

    /*const addCardPost = () => {

    }*/

    const deleteCardPost = (id) => {
        console.log(id);
    }

    return(
        <div className="container">
            <CreatePost/>
            <div className='posts-container'>
                {posts?.map(({id,content,attachment,title,createdAt,User,Likes,Comments}) =>
                    <Post
                        id={id}
                        content={content}
                        attachment={attachment}
                        title={title}
                        createdAt={createdAt}
                        User={User}
                        Likes={Likes}
                        Comments={Comments}
                        deleteClickHandler={deleteCardPost}
                    />
                )}
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    const { posts } = state.content;
    return {
        posts,
    }
}

export default connect(mapStateToProps)(PostsContainer);
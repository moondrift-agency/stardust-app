import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";

import {addPost, getPosts, removePost} from "../../redux/actions/contentActions";
import {connect, useDispatch, useSelector} from "react-redux";

const PostsContainer = (props) => {
    const posts = useSelector((state) => state.content.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts()); //call les données sur le serveur
    },[]);

    const addCardPost = (post) => {
        console.log(post.post)
        dispatch(addPost(post.post));
    }

    const deleteCardPost = (id) => {
        dispatch(removePost(id));
    }

    return(
        <div className="container">
            <CreatePost
                addClickHandler={addCardPost}
            />
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
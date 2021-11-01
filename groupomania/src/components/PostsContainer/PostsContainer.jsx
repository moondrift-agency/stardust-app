import React, {useEffect, useState} from 'react';
import Post from "../Post/Post";
import CreatePost from "../CreatePost/CreatePost";

import { getPosts } from "../../redux/actions/contentActions";
import {connect, useDispatch, useSelector} from "react-redux";
import SideNav from "../SideNav/SideNav";

const PostsContainer = (props) => {
    const posts = useSelector((state) => state.content.posts);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getPosts()); //call les données sur le serveur
    },[]);

    const addCardPost = () => {
        console.log('Maintenant on update le store')
        dispatch(getPosts());
    }

    const deleteCardPost = (id) => {
        console.log('Maintenant on update le store')
        dispatch(getPosts());
    }

    return(
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                    <SideNav/>
                </div>
                <div className="col-md-9">
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
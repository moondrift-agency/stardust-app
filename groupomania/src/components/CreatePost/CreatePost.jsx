import React, {useState} from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { createPost} from "../../services/posts.service";

import './CreatePost.css';

const CreatePost = (props) => {
    const [title, setTitle] = useState();
    const [content, setContent] = useState();
    const [file, setFile] = useState();

    const onSend = (e) => {
        e.preventDefault();

        const postData = new FormData();
        postData.append('title',title);
        postData.append('content',content);
        postData.append('file',file);

        createPost(postData);
    }

    return(
        <div className="card">
            <div className="card-header">
                <div className="h4">Créer un post</div>
            </div>
            <div className="card-body">
                <Form onSubmit={onSend}>
                    <div className="form-group">
                        <div className="input-group mb-2 d-flex flex-column">
                            <label className="form-label">Titre</label>
                            <Input name="title" value={title} onChange={(e) => {setTitle(e.target.value);}} className="form-control form-control-sm title-form" type="text"></Input>
                        </div>
                        <div className="input-group mb-3 d-flex flex-column">
                            <label className="form-label">Contenu</label>
                            <textarea name="content" value={content}  onChange={(e) => {setContent(e.target.value);}} className="form-control form-control-sm content-form" rows="3"></textarea>
                        </div>
                        <div className="input-group mb-3">
                            <Input name="file" onChange={(e) => {setFile(e.target.files[0])}} className="form-control form-control-sm upload-form" type="file"></Input>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" className="btn btn-primary">Poster</button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}

export default CreatePost;
import React, {useState} from "react";
import {connect} from "react-redux";
import { useFormik } from 'formik';

import {createPost} from "../../redux/actions/contentActions";

import './CreatePost.css';

const CreatePost = (props) => {
    //const [title, setTitle] = useState();
    //const [content, setContent] = useState();
    const [file, setFile] = useState();

    const initialValues = {
        title: '',
        content: ''
    }

    const onSubmit = (e) => {
        e.preventDefault();

        const postData = new FormData();
        //postData.append('title', title);
        //postData.append('content', content);
        postData.append('file', file);

        props.createPost(postData);
    }

    const validate = values => {
        const errors = {};

        if(!values.title) {
            errors.title = "Tu ne peux pas mettre un titre vide !";
        } else if (values.title.length < 10) {
            errors.title = "Ton titre dois contenir au moins 10 caractères.";
        }

        if(!values.content) {
            errors.content = "Tu ne peux pas mettre un contenu vide !";
        } else if (values.content.length < 50) {
            errors.content = "Ton post dois contenir au moins 30 caractères.";
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-createpost-title text-muted"><i className="far fa-plus-square"></i> Créer un post</div>
            </div>
            <div className="card-body">
                <form onSubmit={formik.handleSubmit}>
                    <div className="form-group">
                        <div className="input-group mb-2 d-flex flex-column">
                            <label className="form-label">Titre</label>
                            <input
                                className="form-control form-control-sm title-form"
                                name="title"
                                type="text"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            >
                            </input>
                            {formik.errors.title ? (
                                <div className="form-error">
                                    {formik.errors.title}
                                </div>
                            ) : null
                            }
                        </div>
                        <div className="input-group mb-3 d-flex flex-column">
                            <label className="form-label">Contenu</label>
                            <textarea
                                className="form-control form-control-sm content-form"
                                name="content"
                                value={formik.values.content}
                                onChange={formik.handleChange}
                                rows="4"
                            >
                            </textarea>
                            {formik.errors.title ? (
                                <div className="form-error">
                                    {formik.errors.content}
                                </div>
                            ) : null
                            }
                        </div>
                        <div className="input-group mb-3">
                            <input
                                className="form-control form-control-sm upload-form"
                                name="file"
                                type="file"
                                onChange={(e) => {
                                    setFile(e.target.files[0])
                                }}
                            >
                            </input>
                        </div>
                        <div className="btn-toolbar justify-content-between">
                            <div className="btn-group">
                                <button type="submit" className="btn-groupomania">Poster</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

const mapActionsToProps = {
    createPost,
};

export default connect(null, mapActionsToProps)(CreatePost);
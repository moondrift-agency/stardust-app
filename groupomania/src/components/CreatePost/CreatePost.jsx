import {connect} from "react-redux";
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from 'yup';

import {createPost} from "../../redux/actions/contentActions";

import './CreatePost.css';

const CreatePost = (props) => {
    const onSubmit = values => {
        const postData = new FormData();
        postData.append('title', values.title);
        postData.append('content', values.content);
        postData.append('file', values.file);

        props.createPost(postData);
    }

    const validationSchema = Yup.object({
        title: Yup.string().required('Ce champ ne peut être vide !'),
        content: Yup.string().required('Ce champ ne peut être vide !')
    })

    return (
        <div className="card">
            <div className="card-header">
                <div className="card-createpost-title text-muted"><i className="far fa-plus-square"></i> Créer un post</div>
            </div>
            <div className="card-body">
                <Formik
                    initialValues={{
                        title: '',
                        content: '',
                        file: ''
                    }}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}>
                    {(formProps) => (
                        <Form>
                            <div className="form-group">
                                <div className="input-group mb-2 d-flex flex-column">
                                    <label className="form-label">Titre</label>
                                    <Field
                                        className="form-control form-control-sm title-form"
                                        name="title"
                                        type="text"
                                    >
                                    </Field>
                                    <ErrorMessage name="title" />
                                </div>
                                <div className="input-group mb-3 d-flex flex-column">
                                    <label className="form-label">Contenu</label>
                                    <Field
                                        as="textarea"
                                        rows="4"
                                        className="form-control form-control-sm content-form"
                                        name="content"
                                    >
                                    </Field>
                                    <ErrorMessage name="content" />
                                </div>
                                <div className="input-group mb-3">
                                    <input
                                        className="form-control form-control-sm upload-form"
                                        name="file"
                                        type="file"
                                        onChange={(event) =>{
                                            formProps.setFieldValue("file", event.currentTarget.files[0]);
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
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    );
}

const mapActionsToProps = {
    createPost,
};

export default connect(null, mapActionsToProps)(CreatePost);
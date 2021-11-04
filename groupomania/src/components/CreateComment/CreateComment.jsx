import { useFormik } from 'formik';
import React from "react";
import {connect} from "react-redux";
import {createComment} from "../../redux/actions/contentActions";

const CreateComment = (props) => {
    const initialValues = {
        message: ''
    }

    const onSubmit = values => {
        props.createComment(formik.values, props.id);
    }

    const validate = values => {
        const errors = {};

        if(!values.message) {
            errors.message = "Tu ne peux pas envoyer de commentaire vide !";
        } else if (values.message.length < 10) {
            errors.message = "Ton message est trop court !";
        }

        return errors;
    }

    const formik = useFormik({
        initialValues,
        onSubmit,
        validate
    })

    return(
        <div className="container">
            <form onSubmit={formik.handleSubmit}>
                <div className="d-flex flex-column">
                    <textarea
                        name="message"
                        className="form-control form-control-sm content-form"
                        rows="3"
                        onChange={formik.handleChange}
                        value={formik.values.message}
                    />
                    {formik.errors.message ? (
                        <div className="form-error">
                            {formik.errors.message}
                        </div>
                    ) : null
                    }

                    <button type="submit" className="btn btn-primary">Envoyer</button>
                </div>
            </form>
        </div>
    );
}

const mapActionsToProps = {
    createComment,
}

export default connect(null,mapActionsToProps)(CreateComment);
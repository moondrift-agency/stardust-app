import {Formik, Form, Field, ErrorMessage} from 'formik';
import React from "react";
import {connect} from "react-redux";
import {createComment} from "../../redux/actions/contentActions";
import * as Yup from "yup";

const CreateComment = (props) => {
    const onSubmit = (values, {resetForm}) => {
        const message = {
            message: values.message
        }

        resetForm({ values: '' });

        props.createComment(message, props.id);
    }

    const validationSchema = Yup.object({
        message: Yup.string().required('Ce champ ne peut être vide !')
    })

    return(
        <div className="container">
            <Formik
                initialValues={{
                    message: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formProps) => (
            <Form>
                <div className="d-flex flex-column">
                    <div className="row">
                        <Field
                            as="textarea"
                            name="message"
                            className="form-control form-control-sm content-form"
                            rows="3"
                        />
                        <button type="submit" className="btn-groupomania mt-4 mb-3">Envoyer</button>
                    </div>
                    <div className="row">
                        <ErrorMessage name="message"/>
                    </div>
                </div>
            </Form>
                )}
            </Formik>
        </div>
    );
}

const mapActionsToProps = {
    createComment,
}

export default connect(null,mapActionsToProps)(CreateComment);
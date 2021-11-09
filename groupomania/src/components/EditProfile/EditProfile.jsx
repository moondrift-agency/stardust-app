import React, {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";

import {updateUserData , deleteAccount} from "../../redux/actions/userActions";

const EditProfile = (props) => {
    const onSubmit = (values) => {
        const newUserFormData = new FormData();
            newUserFormData.append("firstname", values.firstname);
            newUserFormData.append("lastname", values.lastname);
            newUserFormData.append("department", values.department);
            newUserFormData.append("job", values.job);
            newUserFormData.append("file", values.file);

        props.updateUserData(props.id, newUserFormData)
            .then((response) => {
                window.location.reload(false);
            });
        //resetForm({ values: '' });
    };

    const onDelete = () => {
        props.deleteAccount(props.id);
    }

    const validationSchema = Yup.object({
        firstname: Yup.string().required('Ce champ ne peut être vide !'),
        lastname: Yup.string().required('Ce champ ne peut être vide !'),
    })

    return (
        <div className="row">
            <Formik
                initialValues={{
                    firstname: props.firstname,
                    lastname: props.lastname,
                    department: props.department,
                    job: props.job,
                    file: ''
                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formProps) => (
                    <Form>
                        <div>
                            <div className="col-md-10 form-group mx-auto">
                                <label
                                    htmlFor="file"
                                    className="col-form-label text-md-right"
                                >
                                    Avatar
                                </label>
                                <input
                                    className="form-control form-control-sm upload-form"
                                    name="file"
                                    type="file"
                                    onChange={(event) =>{
                                        formProps.setFieldValue("file", event.currentTarget.files[0]);
                                    }}
                                >
                                </input>
                                <ErrorMessage name='avatar'/>
                            </div>


                            <div className="col-md-10 form-group mx-auto">
                                <label
                                    htmlFor="firstname"
                                    className="col-form-label text-md-right"
                                >
                                    Prénom
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="firstname"
                                />
                                <ErrorMessage name='firstname'/>
                            </div>

                            <div className="col-md-10 form-group mx-auto">
                                <label
                                    htmlFor="lastname"
                                    className="col-form-label text-md-right"
                                >
                                    Nom
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="lastname"
                                />
                                <ErrorMessage name='lastname'/>
                            </div>

                            <div className="col-md-10 form-group mx-auto">
                                <label
                                    htmlFor="department"
                                    className="col-form-label text-md-right"
                                >
                                    Département
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="department"
                                />
                                <ErrorMessage name='email'/>
                            </div>

                            <div className="col-md-10 form-group mx-auto">
                                <label
                                    htmlFor="job"
                                    className="col-form-label text-md-right"
                                >
                                    Poste Occupé
                                </label>
                                <Field
                                    type="text"
                                    className="form-control"
                                    name="job"
                                />
                                <ErrorMessage name='job'/>
                            </div>

                            <div className="form-group d-flex justify-content-center mt-4 mb-4">
                                <button className="btn-groupomania">Enregistrer</button>
                            </div>
                            <div className="form-group d-flex justify-content-center mt-4 mb-4">
                                <button className="btn-groupomania" onClick={onDelete}>Supprimer le compte</button>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

const mapActionsToProps = {
    updateUserData,
    deleteAccount
};

export default connect(null, mapActionsToProps)(EditProfile);

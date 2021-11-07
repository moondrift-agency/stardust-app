import React, {useEffect} from 'react';
import {ErrorMessage, Field, Form, Formik} from "formik";
import * as Yup from "yup";
import {connect} from "react-redux";

import {updateUserData} from "../../redux/actions/userActions";

const EditProfile = (props) => {
    const onSubmit = values => {
        const newUserFormData = new FormData();
            newUserFormData.append("firstname", values.firstname);
            newUserFormData.append("lastname", values.lastname);
            newUserFormData.append("department", values.department);
            newUserFormData.append("job", values.job);

        props.updateUserData(props.id, newUserFormData)
            .then((response) => {
                console.log(response);
            });
    };

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
                    job: props.job

                }}
                validationSchema={validationSchema}
                onSubmit={onSubmit}>
                {(formProps) => (
                    <Form>
                        <div>
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

                            <div className="form-group d-flex justify-content-center mt-4">
                                <button className="btn-groupomania">Enregistrer</button>
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
};

export default connect(null, mapActionsToProps)(EditProfile);

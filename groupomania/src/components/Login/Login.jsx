import React, {useState} from "react";
import {connect} from "react-redux";

//forms
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

//actions
import {login} from "../../redux/actions/userActions";

const Login = (props) => {
    const [loading, setLoading] = useState(false);

    const onSubmit = values => {
        const {history} = props;

        const loginData = {
            "email": values.email,
            "password": values.password
        }

        props.login(loginData)
            .then((response) => {
                history.push("/home");
            })
            .catch(() => {
                setLoading(false);
            });
    };

    const validationSchema = Yup.object({
        email: Yup.string().required('Ce champ ne peut être vide !'),
        password: Yup.string().required('Ce champ ne peut être vide !')
    })

    return (
        <div className="d-flex container h-100 align-items-center justify-content-center">
            <div className="col-md-4">
                <div className="card card-connexion">
                    <div className="card-header text-muted">CONNEXION</div>
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                email: '',
                                password: ''
                            }}
                            validationSchema={validationSchema}
                            onSubmit={onSubmit}>
                            {(formProps) => (
                                <Form>
                                    <div className="col-md-10 form-group mx-auto">
                                        <label
                                            htmlFor="email"
                                            className="col-form-label text-md-right"
                                        >
                                            E-mail
                                        </label>
                                        <Field
                                            type="email"
                                            className="form-control"
                                            name="email"
                                        />
                                        <ErrorMessage name='email'/>
                                    </div>

                                    <div className="col-md-10 form-group mx-auto">
                                        <label
                                            htmlFor="password"
                                            className="col-form-label text-md-right"
                                        >
                                            Mot-de-passe
                                        </label>
                                        <Field
                                            type="password"
                                            className="form-control"
                                            name="password"
                                        />
                                        <ErrorMessage name='password'/>
                                    </div>

                                    <div className="form-group d-flex justify-content-center mt-4">
                                        <button className="btn-groupomania" disabled={loading}>
                                            {loading && (
                                                <span className="spinner-border spinner-border-sm"></span>
                                            )}
                                            <span>Se connecter</span>
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
};

const mapActionsToProps = {
    login,
};

export default connect(null, mapActionsToProps)(Login);
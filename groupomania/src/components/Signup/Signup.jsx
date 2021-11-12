import {connect} from "react-redux";

//forms
import {Formik, Form, Field, ErrorMessage} from 'formik';
import * as Yup from "yup";

//actions
import {signup} from "../../redux/actions/userActions";

const Signup = (props) => {
    const onSubmit = values => {
        const newUserData = {
            "firstname": values.firstname,
            "lastname": values.lastname,
            "email": values.email,
            "password": values.password,
        };

        props.signup(newUserData);
    };

    const validationSchema = Yup.object({
        firstname: Yup.string()
            .required("Ce champ ne peut être vide !")
            .min(2, "Ton prénom doit avoir plus d'un caractère !")
            .max(50, ""),
        lastname: Yup.string()
            .required("Ce champ ne peut être vide !")
            .min(2, "Ton nom doit avoir plus d'un caractère !")
            .max(50, ""),
        email: Yup.string()
            .required("Ce champ ne peut être vide !")
            .email("Votre adresse mail semble invalide !"),
        password: Yup.string()
            .required("Ce champ ne peut être vide !")
            .min(10, "Ton mot-de-passe doit avoir au moins 10 caractères !")
            .max(20, "Ton mot-de-passe ne peut avoir plus de 20 caractères !")
    })

    return (
        <div className="d-flex container h-100 align-items-center justify-content-center">
            <div className="col-md-4">
                <div className="card card-inscription">
                    <div className="card-header text-muted">INSCRIPTION</div>
                    <div className="card-body">
                        <Formik
                            initialValues={{
                                firstname: '',
                                lastname: '',
                                email: '',
                                password: ''
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
                                                htmlFor="email"
                                                className="col-form-label text-md-right"
                                            >
                                                E-mail
                                            </label>
                                            <Field
                                                type="text"
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
                                            <button className="btn-groupomania">S'inscrire</button>
                                        </div>
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
    signup,
};

export default connect(null, mapActionsToProps)(Signup);
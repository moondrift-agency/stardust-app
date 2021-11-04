import React, { useState } from "react";
import {connect, useDispatch} from "react-redux";
import {useFormik} from "formik";

//redux
import { signup } from "../../redux/actions/userActions";

const Signup = (props) => {
  //const { message } = this.props;

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();

  const dispatch = useDispatch();

  const initialValues = {
    firstname: '',
    lastname: '',
    email: '',
    password: ''
  }

  const onSubmit = () => {
    const newUserData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    dispatch(signup(newUserData))
      .then(() => {
        //setSuccessful(true);
      })
  };

  const validate = values => {
    const errors = {};

    if(!values.email) {
      errors.email = "Ce champ est requis !";
    }

    if(!values.password) {
      errors.password = "Ce champ est requis !";
    }

    return errors;
  }

  const formik = useFormik({
    initialValues,
    onSubmit,
    validate
  })

  return (
    <div className="d-flex container h-100 align-items-center justify-content-center">
      <div className="col-md-4">
        <div className="card card-inscription">
          <div className="card-header text-muted">INSCRIPTION</div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
              <div>
                <div className="col-md-10 form-group mx-auto">
                  <label
                      htmlFor="firstname"
                      className="col-form-label text-md-right"
                  >
                    Prénom
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      name="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange}
                  />
                </div>

                <div className="col-md-10 form-group mx-auto">
                  <label
                      htmlFor="lastname"
                      className="col-form-label text-md-right"
                  >
                    Nom
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange}
                  />
                </div>

                <div className="col-md-10 form-group mx-auto">
                  <label
                      htmlFor="email"
                      className="col-form-label text-md-right"
                  >
                    E-mail
                  </label>
                  <input
                      type="text"
                      className="form-control"
                      name="email"
                      value={formik.values.email}
                      onChange={formik.handleChange}
                  />
                </div>

                <div className="col-md-10 form-group mx-auto">
                  <label
                      htmlFor="password"
                      className="col-form-label text-md-right"
                  >
                    Mot-de-passe
                  </label>
                  <input
                      type="password"
                      className="form-control"
                      name="password"
                      value={formik.values.password}
                      onChange={formik.handleChange}
                  />
                </div>

                <div className="form-group d-flex justify-content-center mt-4">
                  <button className="btn-groupomania">S'inscrire</button>
                </div>
              </div>
            </form>
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
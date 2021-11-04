import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useFormik } from 'formik';
import { connect } from "react-redux";

import logo from "../../assets/logos/icon-above-font.svg";
import { login } from "../../redux/actions/userActions";

const Login = (props) => {
  const [message] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const initialValues = {
    email: '',
    password: ''
  }

  const onSubmit = values => {
    const { history } = props;

    dispatch(login(formik.values))
      .then(() => {
        history.push("/home");
      })
      .catch(() => {
        setLoading(false);
      });
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
        <div className="card card-connexion">
          <div className="card-header text-muted">CONNEXION</div>
          <div className="card-body">
            <form onSubmit={formik.handleSubmit}>
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
                {formik.errors.email ? (
                    <div className="form-error">
                      {formik.errors.email}
                    </div>
                ) : null
                }

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
                {formik.errors.password ? (
                    <div className="form-error">
                      {formik.errors.password}
                    </div>
                ) : null
                }

              </div>

              <div className="form-group d-flex justify-content-center mt-4">
                <button className="btn-groupomania" disabled={loading}>
                  {loading && (
                      <span className="spinner-border spinner-border-sm"></span>
                  )}
                  <span>Se connecter</span>
                </button>
              </div>

              {message && (
                  <div className="form-group">
                    <div className="alert alert-danger" role="alert">
                      {message}
                    </div>
                  </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

function mapStateToProps(state) {
  const { isLoggedIn } = state;

  return {
    isLoggedIn,
  };
}

const mapActionsToProps = {
  login,
};

export default connect(mapStateToProps, mapActionsToProps)(Login);
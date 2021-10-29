import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

import { connect } from "react-redux";

import { login } from "../../redux/actions/userActions";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        Ce champ est requis !
      </div>
    );
  }
};

const Login = (props) => {
  const [message] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const onSend = (e) => {
    e.preventDefault();

    setLoading(true);

    const userData = {
      email: email,
      password: password,
    };

    const { history } = props;

    dispatch(login(userData))
      .then(() => {
        history.push("/home");
        //window.location.reload();
      })
      .catch(() => {
        setLoading(false);
      });
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">Connexion</div>
            <div className="card-body">
              <Form onSubmit={onSend}>
                <div className="form-group row">
                  <label
                    for="email"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    E-Mail
                  </label>
                  <div className="col-md-6">
                    <Input
                      type="text"
                      className="form-control"
                      name="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                      }}
                      validations={[required]}
                    />
                  </div>
                </div>

                <div class="form-group row">
                  <label
                    for="password"
                    className="col-md-4 col-form-label text-md-right"
                  >
                    Mot-de-passe
                  </label>
                  <div className="col-md-6">
                    <Input
                      type="password"
                      className="form-control"
                      name="password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                      }}
                      validations={[required]}
                    />
                  </div>
                </div>

                <div className="col-md-6 offset-md-5">
                  <button className="btn btn-primary" disabled={loading}>
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
              </Form>
            </div>
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
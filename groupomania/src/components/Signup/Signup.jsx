import React, { useState } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { isEmail } from "validator";

import {connect, useDispatch} from "react-redux";

//redux
import { signup } from "../../redux/actions/userActions";

const Signup = (props) => {
  //const { message } = this.props;

  const [firstname, setFirstname] = useState();
  const [lastname, setLastname] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [successful, setSuccessful] = useState(false);

  const dispatch = useDispatch();

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          Ce champ est requis !
        </div>
      );
    }
  };

  const vemail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
  };

  const vfirstname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The firstname must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const vlastname = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The lastname must be between 3 and 20 characters.
        </div>
      );
    }
  };

  const vpassword = (value) => {
    if (value.length < 6 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 6 and 40 characters.
        </div>
      );
    }
  };

  const onSend = () => {
    const newUserData = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
    };

    dispatch(signup(newUserData))
      .then(() => {
        setSuccessful(true);
      })
  };

  return (
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card">
            <div class="card-header">Inscription</div>
            <div class="card-body">
              <Form onSubmit={onSend}>
                {!successful && (
                  <div>
                    <div class="form-group row">
                      <label
                        for="firstname"
                        class="col-md-4 col-form-label text-md-right"
                      >
                        Prénom
                      </label>
                      <div class="col-md-6">
                        <Input
                          type="text"
                          className="form-control"
                          name="firstname"
                          value={firstname}
                          onChange={(e) => {
                            setFirstname(e.target.value);
                          }}
                          validations={[required, vfirstname]}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label
                        for="lastname"
                        class="col-md-4 col-form-label text-md-right"
                      >
                        Nom
                      </label>
                      <div class="col-md-6">
                        <Input
                          type="text"
                          className="form-control"
                          name="lastname"
                          value={lastname}
                          onChange={(e) => {
                            setLastname(e.target.value);
                          }}
                          validations={[required, vlastname]}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label
                        for="email"
                        class="col-md-4 col-form-label text-md-right"
                      >
                        E-Mail
                      </label>
                      <div class="col-md-6">
                        <Input
                          type="text"
                          className="form-control"
                          name="email"
                          value={email}
                          onChange={(e) => {
                            setEmail(e.target.value);
                          }}
                          validations={[required, vemail]}
                        />
                      </div>
                    </div>

                    <div class="form-group row">
                      <label
                        for="password"
                        class="col-md-4 col-form-label text-md-right"
                      >
                        Mot-de-passe
                      </label>
                      <div class="col-md-6">
                        <Input
                          type="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={(e) => {
                            setPassword(e.target.value);
                          }}
                          validations={[required, vpassword]}
                        />
                      </div>
                    </div>

                    <div class="col-md-6 offset-md-4">
                      <button className="btn btn-primary">S'inscrire</button>
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

const mapStateToProps = (state) => {
  const { isLoggedIn } = state;

  return {
    isLoggedIn,
  };
}

const mapActionsToProps = {
  signup,
};

export default connect(mapStateToProps, mapActionsToProps)(Signup);
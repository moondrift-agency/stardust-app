import { useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { logout } from "../../redux/actions/userActions";
import { deleteProfile, updateProfile } from "../../services/user.service";


const UpdateProfile = (props) => {
    const dispatch = useDispatch();
    const history  = useHistory();
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState();
    const [job, setJob] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastName] = useState();
    const [department, setDepartment] = useState();
    const [avatar, setAvatar] = useState();

    useEffect(() => {
    }, [])

    const onSend = e => {

        const userData = {
            firstname : firstname,
            lastname  : lastname,
            email : email,
            job : job,
            department :department,
        }

        dispatch(updateProfile(user.data?.id,userData))
            .then((resp) => {
                console.log(resp)
            }).catch((err) => {
            setLoading(false);
        })
    }

    const handleDelete = e =>{
        e.preventDefault();
        dispatch(deleteProfile());
        dispatch(logout());
        history.push("/login");
    }

    const required = (value) => {
        if (!value) {
            return (
                <div className="alert alert-danger" role="alert">
                    Ce champ est requis !
                </div>
            );
        }
    };

    return (
        <>
            <h6 class="m-b-20 m-t-40 p-b-5 b-b-default f-w-600">Edit profile</h6>
            <Form
                onSubmit={onSend}
            >
                <div className="form-group">

                    <Input
                        type="text"
                        placeholder={user.data?.firstname}
                        className="form-control"
                        name="firstname"
                        value={firstname}
                        onChange={(e) => {
                            setFirstname(e.target.value);
                        }}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <Input
                        type="text"
                        placeholder={user.data?.lastname}
                        className="form-control"
                        name="lastname"
                        value={lastname}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <Input
                        type="text"
                        placeholder={user.data?.email}
                        className="form-control"
                        name="email"
                        value={email}
                        onChange={(e) => {
                            setEmail(e.target.value)
                        }}
                        validations={[required]}
                    />
                </div>

                <div className="form-group">
                    <Input
                        type="text"
                        placeholder={user.data?.department}
                        className="form-control"
                        name="department"
                        value={department}
                        onChange={(e) => {
                            setDepartment(e.target.value);
                        }}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="text"
                        placeholder={user.data?.job}
                        className="form-control"
                        name="job"
                        value={job}
                        onChange={(e) => {
                            setJob(e.target.value);
                        }}
                        validations={[required]}
                    />
                </div>
                <div className="form-group">
                    <Input
                        type="file"
                        className="form-control-file"
                        name="avatar"
                        value={avatar}
                        onChange={(e) => {
                            setAvatar(e.target.value)
                        }}
                        validations={[required]}
                    />
                </div>
                <button className="btn btn-primary" disabled={loading}>
                    {loading && (
                        <span className="spinner-border spinner-border-sm"></span>
                    )}
                    <span>Modifier</span>
                </button>
            </Form>
            <button onClick={handleDelete}>Delete account</button>
        </>
    );
}

function mapStateToProps(state) {
    const {user} = state.user;
    return {
        user,
    };
}

export default connect(mapStateToProps)(UpdateProfile);
import { useRef, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import { logout } from "../../../redux/actions/userActions"
import { deleteProfile, updateProfile } from "../../../services/user.service";

const RootProfile = (props) => {

    const dispatch = useDispatch();
    const history  = useHistory();

    //boolean
    const [loading, setLoading] = useState(false);
    const [isClicked, setClicked] = useState(false);

    //User data states
    const user = useSelector((state) => state.user);
    const [email, setEmail] = useState();
    const [job, setJob] = useState();
    const [firstname, setFirstname] = useState();
    const [lastname, setLastName] = useState();
    const [department, setDepartment] = useState();


    const hiddenFileInput = useRef(null);
    const [fileUploaded, setFileUploaded] = useState("");

    const onSend = e => {
        let form = new FormData();
        form.append('firstname', firstname);
        form.append('lastname', lastname);
        form.append('email',email);
        form.append('job', job);
        form.append('department', department);
        form.append('file', fileUploaded);

        dispatch(updateProfile(user.data?.id, form))
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

    const handleEdit = e =>{
        e.preventDefault();
        setClicked(true);
    }

    const handleClick = event => {
        hiddenFileInput.current.click();
    };
    return (
        <div className="container">
            <div class="page-content page-container" id="page-content">
                <div class="padding">
                    <div class="row container d-flex justify-content-center">
                        <div class="col-xl-6 col-md-12">
                            <div class="card user-card-full">
                                <div class="row m-l-0 m-r-0">
                                    <div class="col-sm-4 bg-c-lite-green user-profile">
                                        <div class="card-block text-center text-white">
                                            <div class="m-b-25">
                                                <img src={user.data?.avatar} class="img-radius" alt="User-Profile-Image" onClick={handleClick}></img>
                                                <button style={{display: 'none'}} onClick={handleClick}>
                                                </button>
                                                <input name="file" type="file"
                                                       ref={hiddenFileInput}
                                                       onChange={(e) => {setFileUploaded(e.target.files[0])}}
                                                       style={{display: 'none'}}
                                                />
                                            </div>
                                            <h6 class="f-w-600">{user.data?.firstname} {user.data?.lastname}</h6>
                                            <p>{user.data?.job}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                        </div>
                                    </div>
                                    <div class="col-sm-8">
                                        <div class="card-block">
                                            <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                            <div class="row">
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">Email</p>
                                                    <h6 class="text-muted f-w-400">{user.data?.email}</h6>
                                                </div>
                                                <div class="col-sm-6">
                                                    <p class="m-b-10 f-w-600">AREA</p>
                                                    <h6 class="text-muted f-w-400">{user.data?.department}</h6>
                                                </div>
                                            </div>
                                            <>
                                                <button className="btn btn-primary" onClick={handleEdit} disabled={loading}>
                                                    {loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                    )}
                                                    <span>Modifier</span>
                                                </button>
                                            </>
                                            {isClicked &&
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
                                                    <button className="btn btn-primary" disabled={loading}>
                                                        {loading && (
                                                            <span className="spinner-border spinner-border-sm"></span>
                                                        )}
                                                        <span>Send</span>
                                                    </button>
                                                </Form>
                                                <button  className="btn btn-primary" onClick={handleDelete} disabled={loading}>
                                                    {loading && (
                                                        <span className="spinner-border spinner-border-sm"></span>
                                                    )}
                                                    <span>Delete account</span>
                                                </button>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
function mapStateToProps(state) {
    const {user} = state.user
    return {
        user,
    };
}

export default connect(mapStateToProps)(RootProfile);
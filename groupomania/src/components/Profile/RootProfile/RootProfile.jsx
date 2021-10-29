import { forwardRef, useEffect, useImperativeHandle, useState } from "react";
import { connect, useSelector } from "react-redux";
import UpdateProfile from "../../UpdateProfile/UpdateProfile";

const RootProfile = forwardRef((props, ref) => {
    const [isClicked, setClicked] = useState(false);
    const user = useSelector((state) => state.user);

    const handleEdit = e =>{
        e.preventDefault();
        setClicked(true);
    }

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
                                            <div class="m-b-25"> <img src={user.data?.avatar} class="img-radius" alt="User-Profile-Image"></img> </div>
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
                                            {isClicked &&
                                            <UpdateProfile />
                                            }
                                            <>
                                                <button onClick={handleEdit}>EDIT</button>
                                            </>
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
});
function mapStateToProps(state) {
    const {user} = state.user
    return {
        user,
    };
}

export default connect(mapStateToProps)(RootProfile);
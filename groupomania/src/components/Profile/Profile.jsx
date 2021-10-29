import { useEffect, useState } from "react";
import { connect, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getUser } from "../../services/user.service";
import "./Profile.css"
import RootProfile from "./RootProfile/RootProfile";

/*
  http://localhost:8081/api/users/accounts/{id}

  ASK API TO RETRIEVE DETAILS ABOUT A SPECIFIC USER TO CREATE A PROFILE
  ----------------------------------------------------------------------
    ID IS FETCHED AS AN URL PARAMETER
    DISPATCH() IS USED TO STORE DATA RETRIEVED BY API AS A STATE IN THE STORE
    MAPSTATETOSTORE()  IS USED TO REFLECT ANY UPDATES TO THE REDUX STORE AND MERGE THEM INTO PROPS
    USESELECTOR() IS USED TO READ THE STATE
    COMPONENT DISPLAYED :
      avatar
      firstname
      lastname
      email
      department
      job
*/
const Profile = (props) => {
    let { id } = useParams();
    let [Owned, setOwned] = useState(false);
    const [profile, setProfile] = useState("")
    const user = useSelector((state) => state.user);

    useEffect(() => {
        if(id && id !== user.data.id ){
            getUser(id)
                .then(data => {
                    setProfile(data);
                });
        } else {
            setOwned(true);
        }
    }, [])


    return (
        <>
            {Owned ?
                <RootProfile /> :
                <div className="container">
                    <div class="page-content page-container" id="page-content">
                        <div class="padding">
                            <div class="row container d-flex justify-content-center">
                                <div class="col-xl-6 col-md-12">
                                    <div class="card user-card-full">
                                        <div class="row m-l-0 m-r-0">
                                            <div class="col-sm-4 bg-c-lite-green user-profile">
                                                <div class="card-block text-center text-white">
                                                    <div class="m-b-25"> <img src={profile.data?.avatar} class="img-radius" alt='img'></img> </div>
                                                    <h6 class="f-w-600">{profile.data?.firstname} {profile.data?.lastname}</h6>
                                                    <p>{profile.data?.job}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                                                </div>
                                            </div>
                                            <div class="col-sm-8">
                                                <div class="card-block">
                                                    <h6 class="m-b-20 p-b-5 b-b-default f-w-600">Information</h6>
                                                    <div class="row">
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">Email</p>
                                                            <h6 class="text-muted f-w-400">{profile.data?.email}</h6>
                                                        </div>
                                                        <div class="col-sm-6">
                                                            <p class="m-b-10 f-w-600">AREA</p>
                                                            <h6 class="text-muted f-w-400">{profile.data?.department}</h6>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            }
        </>
    );
}
function mapStateToProps(state) {
    const {user} = state.user
    return {
        user,
    };
}
export default connect(mapStateToProps)(Profile);
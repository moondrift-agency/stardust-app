import {useEffect, useState} from "react";
import {connect, useSelector} from "react-redux";
import {useParams} from "react-router";
import {getUser} from "../../services/user.service";
import "./Profile.css"

const Profile = (props) => {
    const {id} = useParams();

    const currentUser = useSelector((state) => state.user.data);
    const [user, setUser] = useState();
    const [Owned, setOwned] = useState();

    useEffect(() => {
        console.log(currentUser)

        if (id && id !== currentUser.id) {
            getUser(id)
                .then(response => {
                    setUser(response.data);
                });
        } else {
            console.log('test 2')
            setUser({currentUser},function () {
                console.log(user);
            });
        }

        console.log(user)
    }, [])

    return (
        <div>

        </div>
    );
}

function mapStateToProps(state) {
    const {user} = state.user.data
    return {
        user,
    };
}

export default connect(mapStateToProps)(Profile);
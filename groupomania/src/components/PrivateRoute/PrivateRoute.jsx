import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect, useSelector} from "react-redux";

const PrivateRoute = ({component: Component, ...rest}) => {
    const currentUser = useSelector((state) => state.user);

    return (
        <Route {...rest} render={props => {
            if (!currentUser.isLoggedIn) {
                return <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            }

            return <Component {...props} />
        }} />
    );
};

function mapStateToProps(state) {
    const {user} = state.user;
    return {
        user,
    }
}

export default connect(mapStateToProps)(PrivateRoute);
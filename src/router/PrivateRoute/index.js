import React from 'react'
import {Route, Redirect,} from 'react-router-dom'
import {isAuthenticated} from '../../util/Session'

const path = ["/home/md"];

const PrivateRoute = ({component: Component, ...rest}) => (
    <Route {...rest} render={(props) => (
        console.log("path", rest.path),
            rest.path == "/home/md" ?
                !!isAuthenticated() ?
                    <Component {...props} />
                    : <Redirect to={{
                        pathname: '/login',
                        state: {from: props.location}
                    }}/>
                : <Component {...props}/>
    )}/>
);

export default PrivateRoute
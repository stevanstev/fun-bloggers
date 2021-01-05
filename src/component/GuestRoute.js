import {Redirect, Route } from 'react-router-dom';

const GuestRoute = ({component: Component, authed, ...rest}) => {
  return (
    <Route
      {...rest}
      render={(props) => authed === ""
        ? <Component {...props} />
        : <Redirect to={{pathname: '/home', state: {from: props.location}}} />}
    />
  )
}

export default GuestRoute;
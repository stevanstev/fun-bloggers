import React, {Component} from 'react';
import Login from './container/guest/login/Login';
import Home from './container/auth/home/Home';
import Posts from './container/auth/posts/Posts';
import Explore from './container/auth/explore/Explore';
import Relations from './container/auth/relations/Relations';
import Profile from './container/auth/profile/Profile';
import {BrowserRouter as Router, Switch } from 'react-router-dom';
import {connect} from 'react-redux';
import PrivateRoute from './component/PrivateRoute';
import GuestRoute from './component/GuestRoute';
import {GET_TOKEN} from './redux/actionTypes';

class App extends Component {
    componentDidMount() {
        this.props.getToken();
    }

    render() {
        let isAuth = this.props.authToken;

        return (
            <Router>
                <Switch>
                    <GuestRoute authed={isAuth} exact path="/" component={Login} />
                    <GuestRoute authed={isAuth} exact path="/login" component={Login} />
                    <PrivateRoute authed={isAuth} exact path="/home" component={Home} />
                    <PrivateRoute authed={isAuth} exact path="/posts" component={Posts} />
                    <PrivateRoute authed={isAuth} exact path="/profile" component={Profile} />
                    <PrivateRoute authed={isAuth} exact path="/relations" component={Relations} />
                    <PrivateRoute authed={isAuth} exact path="/explore" component={Explore} />
                </Switch>
            </Router>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getToken: () => dispatch({type: GET_TOKEN})
    }
}

const mapStateToProps = (state) => {
    return {
        authToken: state.authReducer.authToken
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

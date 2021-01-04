import React, {Component} from 'react';
import Login from './container/guest/login/login';
import Home from './container/auth/home/home';
import Posts from './container/auth/posts/posts';
import Profile from './container/auth/profile/profile';
import {BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class App extends Component {
    render() {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/home" component={Home} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/profile" component={Profile} />
                </Switch>
            </Router>
        );
    }
}

export default App;

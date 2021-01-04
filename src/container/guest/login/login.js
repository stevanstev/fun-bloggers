import React, {Component} from "react";
import { 
	TextField,
	CircularProgress,
	Grid,
	Button,
	Backdrop,
	Fade,
} from "@material-ui/core";
import "./login.css";
import loginImage from "../../../assets/images/login_image.jpg";
import appLogo from "../../../assets/images/app_logo.png";
import Register from '../register/register';
import {withRouter} from 'react-router-dom';

class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			email: "",
			password: "",
			isLoading: false,
			showRegister: false,
		};

		this.onemailChanged = this.onemailChanged.bind(this);
		this.onPasswordChanged = this.onPasswordChanged.bind(this);
		this.onFormSubmit = this.onFormSubmit.bind(this);
	}

	onFormSubmit = (event) => {
		this.setState({
			isLoading: !this.state.isLoading,
		});
		event.preventDefault();
		this.props.history.replace('/home');
	}

	onemailChanged = (event) => {
		this.setState({
			email: event.target.value
		});
	}

	onPasswordChanged = (event) => {
		this.setState({
			password: event.target.value
		})
	}

	changeForm = (value) => {
		this.setState({
			showRegister: value,
		});
	}

	render() {
		return(
			<React.Fragment>
			<Backdrop className="backdrop" open={this.state.isLoading}>
			    <CircularProgress color="secondary" />
			</Backdrop>
			<div className="login-container"> 
				<Grid container>
					<Grid item xs={0} sm={2}></Grid>
					<Grid item xs={12} sm={8} className="login-form-container">
						<Grid container>
							<Grid item xs={12} sm={6}>
								<img src={loginImage} className="login-image" alt="loginimage"/>
							</Grid>
							<Grid item xs={12} sm={6} className="form-container">
								<img src={appLogo} className="app-logo" alt="applogo"/>
								<p className="sub-title">Welcome to Fun Bloggers</p>
								{
									this.state.showRegister === false ?
									<Fade in={!this.state.showRegister}>
										<div>
											<form method="post" onSubmit={this.onFormSubmit}>
												<p>Login</p>
												<TextField 
													onChange={this.onemailChanged} 
													type="text"
													value={this.state.email} 
													label="Email"
													placeholder="someone@mail.com" /> 
												<p></p>
												<TextField
													type="password"
													label="Password" 
													placeholder="******"
													value={this.state.password}
													onChange={this.onPasswordChanged} /> 
												<p></p>
												<Button type="submit" variant="contained" color="primary">
												  	Sign In
												</Button>
												<p></p>
												<h6> -- Or -- </h6>
											</form>
											<Button 
												onClick={() => this.changeForm(true)}
												type="submit" 
												className="register-button">
											  	Sign Up
											</Button>
										</div>
									</Fade>
									:
									<Fade in={this.state.showRegister}>
										<Register onClick={() => this.changeForm(false)}/>
									</Fade>
								}
							</Grid>
						</Grid>
					</Grid>
					<Grid item xs={0} sm={2}></Grid>
				</Grid>
			</div>
			</React.Fragment>
		);
	}
}

export default withRouter(Login);
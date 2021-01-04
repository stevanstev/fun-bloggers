import React, {Component} from "react";
import { 
	TextField,
	CircularProgress,
	Grid,
	Button,
	Backdrop,
} from "@material-ui/core";
import "./login.css";
import loginImage from "../../../assets/images/login_image.jpg";
import appLogo from "../../../assets/images/app_logo.png";

class Login extends Component {
	constructor(props) {
		super(props);
		
		this.state = {
			email: "",
			password: "",
			isLoading: false,
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

	render() {
		return(
			<React.Fragment>
			<Backdrop className="backdrop" open={this.state.isLoading}>
			    <CircularProgress color="inherit" />
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
								<form onSubmit={this.onFormSubmit}>
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
									<p></p>
									<Button 
										type="submit" 
										className="register-button">
									  	Sign Up
									</Button>
									<p></p>
								</form>
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

export default Login;
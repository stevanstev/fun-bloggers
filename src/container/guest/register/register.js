import React, {Component} from 'react';
import './register.css';
import { 
	TextField,
	Button,
} from "@material-ui/core";

class Register extends Component {
	constructor(props) {
		super(props);

		this.state = {
			registerEmail: "",
			registerPassword: "",
			registerRePassword: "",
			registerFullName: "",
		};

		this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
		this.onRegisterEmailChanged = this.onRegisterEmailChanged.bind(this);
		this.onRegisterPasswordChanged = this.onRegisterPasswordChanged.bind(this);
		this.onRegisterRePasswordChanged = this.onRegisterRePasswordChanged.bind(this);
		this.onRegisterFullNameChanged = this.onRegisterFullNameChanged.bind(this);
		this.onRegisterSubmit = this.onRegisterSubmit.bind(this);
	}

	onRegisterSubmit(event) {
		event.preventDefault();
	}	

	onRegisterEmailChanged = (event) => {
		this.setState({
			registerEmail: event.target.value
		});
	}

	onRegisterPasswordChanged = (event) => {
		this.setState({
			registerPassword: event.target.value
		});
	}

	onRegisterRePasswordChanged = (event) => {
		this.setState({
			registerRePassword: event.target.value
		});
	}

	onRegisterFullNameChanged = (event) => {
		this.setState({
			registerFullName: event.target.value
		});
	}

	render() {
		return(
			<div>
				<form method="post" onSubmit={this.onRegisterSubmit}>
					<p>Register</p>
					<TextField
						onChange={this.onRegisterEmailChanged}
						type="text"
						value={this.state.registerEmail} 
						label="Email"
						placeholder="someone@mail.com" /> 
					<p></p>
					<TextField
						onChange={this.onRegisterPasswordChanged}
						type="password"
						label="Password" 
						placeholder="******"
						value={this.state.registerPassword}/> 
					<p></p>
					<TextField
						onChange={this.onRegisterRePasswordChanged}
						type="password"
						label="Re-Type Password" 
						placeholder="******"
						value={this.state.registerRePassword}/> 
					<p></p>
					<TextField
						onChange={this.onRegisterFullNameChanged}
						type="text"
						label="Fullname" 
						placeholder="your name"
						value={this.state.registerFullName}/> 
					<p></p>
					<Button type="submit" variant="contained" color="primary">
					  	Sign Up
					</Button>
					<p></p>
					<h6> -- Or -- </h6>
				</form>
				<Button 
					onClick={this.props.onClick}
					type="submit" 
					className="register-button">
				  	Sign In
				</Button>
			</div>
		);
	}
}

export default Register;
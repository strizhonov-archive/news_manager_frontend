import React, {Component} from 'react';
import './login.css';


export default class Login extends Component {

    displayRegister = () => {
        document.getElementById("register-form").style.display = "block";
        document.getElementById("login-form").style.display = "none";
    };

    displayLogin = () => {
        document.getElementById("register-form").style.display = "none";
        document.getElementById("login-form").style.display = "block";
    };

    render() {
        return (
            <div className="main-holder">
                <div className="inside-block">
                    <form
                        id="register-form"
                        className="register-form">
                        <input id="username"
                               name="username"
                               type="text"
                               placeholder="Username"/>
                        <input id="password"
                               name="password"
                               type="password"
                               placeholder="Password"
                        />
                        <input id="password_confirmation"
                               name="password_confirmation"
                               type="password"
                               placeholder="Password Confirmation"
                        />
                        <input id="email"
                               name="email"
                               type="text"
                               placeholder="email"/>
                        <button id="submit"
                                className="generic-button">
                            Register
                        </button>
                        <div className="message">
                            Already registered?&nbsp;
                            <a href="#" onClick={this.displayLogin}>
                                Sign In
                            </a>
                        </div>
                    </form>
                    <form
                        id="login-form"
                        className="login-form">
                        <input type="text" placeholder="username" name="username"/>
                        <input type="password" placeholder="password" name="password"/>
                        <button className="generic-button">
                            Sign In
                        </button>
                        <div className="message">
                            Not registered?&nbsp;
                            <a href="#" onClick={this.displayRegister}>
                                Create account
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        )
    }
}
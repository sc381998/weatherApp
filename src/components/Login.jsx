import React from "react";
import { NavLink } from "react-router-dom";
import users from "./../data/users";
import authService from "./../service/autoService";

export default function Login(props) {
  const MIN_USERNAME_LENGTH = 5;
  const MIN_PASSWORD_LENGTH = 5;

  const [account, setAccount] = React.useState({ username: "", password: "" });
  const [error, setError] = React.useState({ username: "", password: "" });

  const handleChange = (property, event) => {
    
    const accountCopy = {
      ...account
    };

    accountCopy[property] = event.target.value;
    setAccount(accountCopy);

    validate(property);
  };

  const validate = (property) => {
    property === "username" ? validateUsername() : validatePassword();
  };

  const handleLogin = (event) => {
    event.preventDefault();
    if (isValidUser(account.username, account.password)) {
      authService.doLogin(account.username);
      props.history.push("/");
    } else {
      setError({
          username: "Enter valid username",
          password: "Enter valid password"
        
      });
      props.history.push("/login");
      
      
    }
    return;
  };

  const isValidUser = (username, password) => {
    return users.find(
      (user) => user.username === username && user.password === password
    );
  };

  const validateUsername = () => {
    const errorCopy = { ...error };
    if (account.username.includes(" ")) {
      errorCopy.username = "Username cannot contain a space";
    } else if (account.username.length < MIN_USERNAME_LENGTH) {
      errorCopy.username = `Username should be greater than ${MIN_USERNAME_LENGTH} chars`;
    } else {
      errorCopy.username = "";
    }

    setError(errorCopy);
  };

  const validatePassword = () => {
    const errorCopy = { ...error };
    if (account.password.length < MIN_PASSWORD_LENGTH) {
      errorCopy.password = `Password should be greater than ${MIN_PASSWORD_LENGTH} chars`;
    } else {
      errorCopy.password = "";
    }
    setError(errorCopy);
  };
  return (
    <div className="signin-form">
      <form>
        <h2>Log in</h2>
       
        <div className="form-group">
          <input
            type="text"
            className="form-control input-lg"
            name="username"
            onChange={(event) => handleChange("username", event)}
            placeholder="Username"
            required="required"
          />
           <small className="text-danger">{account.username.length > 3 && error.username}</small>
        </div>
        <div className="form-group">
          <input
            type="password"
            className="form-control input-lg"
            name="password"
            onChange={(event) => handleChange("password", event)}
            placeholder="Password"
            required="required"
          />
           <small className="text-danger">{account.password.length > 3 &&  error.username !== `Username should be greater than ${MIN_PASSWORD_LENGTH} chars` && error.password}</small>
        </div>
        <div className="form-group">
          <button
          
            className="btn btn-success btn-lg btn-block signin-btn"
            onClick={handleLogin}
          >
            Log in
          </button>
        </div>
        <div className="text-center small">
          <NavLink to="/">Forgot Your password?</NavLink>
        </div>
      </form>
      <div className="text-center small">
        Don't have an account? <NavLink to="/signup">Sign up</NavLink>
      </div>
    </div>
  );
}

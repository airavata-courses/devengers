import React, { Component } from "react";
import { Link, Redirect, withRouter } from "react-router-dom";
import { signin, authenticate } from "../auth";
import { createMuiTheme } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
//import withStyles from './css/Styles'
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";
import SocialLogin from "./SocialLogin";

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Copyright © "}
      <Link color="inherit" href="https://material-ui.com/">
        SQUADIFY
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createMuiTheme({
  spacing: 4
});
const styles = {
  root: {
    height: "100vh"
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1)
  },
  submit: {
    margin: theme.spacing(3, 0, 2)
  }
};

class SignInSide extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      error: "",
      redirectToReferer: false,
      loading: false,
      errorMessage: ""
    };
  }

  handleChange = passInValue => event => {
    this.setState({ error: "" });
    this.setState({ [passInValue]: event.target.value });
  };

  clickSubmit = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const { email, password } = this.state;
    const user = {
      email: email,
      password: password
    };
    // console.log(user);
    signin(user).then(data => {
      if (data.error) {
        this.setState({ error: data.error, loading: false });
      } else {
        this.setState({ errorMessage: "" });
        // authenticate user
        authenticate(data, () => {
          this.setState({ redirectToReferer: true });
        });

        // redirect
      }
    });
  };
  signinForm = (email, password) => (
    
    <div className="container col-8 mt-5">
      <form>
        <div>
          <div class="form-group">
            <label className="text-muted ">Email</label>
            <input
              onChange={this.handleChange("email")}
              type="email"
              className="form-control"
              value={email}
            ></input>
          </div>
          <div class="form-group">
            <label className="text-muted">Password</label>
            <input
              onChange={this.handleChange("password")}
              type="password"
              className="form-control"
              value={password}
            ></input>
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-info mx-auto d-block mt-5"
          >
            Sign In
          </button>
          
          {/* <SocialLogin /> */}
          <div className="row mt-2">
            <Link className="nav-link mx-auto text-info" to="/signup">
              Don't have an account? Sign Up
            </Link>
            <Link
              to="/forgot-password"
              className=" nav-link mx-auto text-info"
            >
              Forgot Password? Reset it
            </Link>
          </div>

        </div>
      </form>
    </div>
  );

  render() {
    const { email, password, error, redirectToReferer, loading } = this.state;

    const { classes } = this.props;
    if (redirectToReferer) {
      return <Redirect to="/home" />;
    }
    return (
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <h1>Version 2</h1>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {error && <div className="alert alert-danger mb-2">{error}</div>}
            {this.signinForm(email, password)}
          </div>
        </Grid>
      </Grid>
    );
  }
}
//export default SignInSide
SignInSide.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SignInSide);

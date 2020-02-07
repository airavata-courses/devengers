import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Menu from "./Menu";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";

class Home extends Component {
  state = {
    user: "",
    redirectToSignin: false,
    error: "",
    latitude:"",
    longitude:"",
    reloadPage: false
  };

  componentDidMount() {
    const { reloadPage } = this.state;
    if (reloadPage) {
      window.location.reload();
    }
    const userId = isAuthenticated().user._id;
    this.init(userId);
  }

  init = userId => {
    const token = isAuthenticated().token;
    read(userId, token).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
        //this.loadPosts(data._id); // pass userId to loadPosts by this user
      }
    });
  };

  handleChange = passInValue => event => {
    this.setState({ error: "" });
    this.setState({ [passInValue]: event.target.value });
  };
  
  render() {
    const { redirectToSignin, latitude,longitude } = this.state;

    if (redirectToSignin) {
      return <Redirect to="/signin" />;
    }

    return (
      <>
        <div>
          <Menu />
        </div>
        <div
           style={{
           }}
        >
          <div className="container col-8 mt-5">
          <form>
          
        <div>
          <div class="form-group">
            <label className="text-muted ">Latitude</label>
            <input
              onChange={this.handleChange("latitude")}
              type="text"
              className="form-control"
              value={latitude}
            ></input>
          </div>
          </div>
          <div>
          <div class="form-group">
            <label className="text-muted ">Longitude</label>
            <input
              onChange={this.handleChange("latitude")}
              type="text"
              className="form-control"
              value={longitude}
            ></input>
          </div>
          </div>
          <button
            onClick={this.clickSubmit}
            className="btn btn-raised btn-info mx-auto d-block mt-5"
          >
            Show
          </button>
          </form>
          {/* </div> */}
        </div>
        </div>
      </>
    );
  }
}

export default Home;

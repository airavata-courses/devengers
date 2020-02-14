import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import { read } from "../user/apiUser";

class Session extends Component {
  constructor() {
    super();
    this.state = {
      user:"",
      session_data:[]
    };
  }


  componentDidMount() {
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


  render() {
    const { session_data, user } = this.state;
    return (
      <>
        <div>
          <Menu/>
          <div className="container fluid mt-5 ml-5">
            <div>
              {session_data.map((i) => {
                return (
                  <div key={i}>
                    <div
                      className="card bwm-card"
                      style={{ width: "23rem", marginBottom: "8px" }}
                    >
                      <div className="card-block">
                        <h4 class="card-title text-info">{user._id}</h4>
                        <br />
                        <br />
                        <h5 class="card-subtitle">
                          {user.name.substring(0, 100)}
                        </h5>
                        <p class="card-text">
                          <br />
                        </p>
                        <br />
                        
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </>
    );
  }
}

export default Session;

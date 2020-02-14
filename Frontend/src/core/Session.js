import React, { Component } from "react";
import { isAuthenticated } from "../auth";
import Menu from "../core/Menu";
import { read } from "../user/apiUser";
import {receiveData} from "../weather/apiWeather";

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
    const id = isAuthenticated().user._id;

    read(userId).then(data => {
      if (data.error) {
        this.setState({ redirectToSignin: true });
      } else {
        this.setState({ user: data });
        //this.loadPosts(data._id); // pass userId to loadPosts by this user
      }
    });
    console.log(id);
    receiveData(id).then(data => {
        if (data.error) {
          console.log(data.error);
        } else {
          this.setState({ session_data: data });
        }
      });

  };


  render() {
    const { session_data, user } = this.state;
    const items = session_data.map((item, key) =>
    <ul>
   <div>
   <h5>Correlation id</h5> <li key={item.key}>{item.correlationId}</li>
    <h5>no_of_files</h5><li key={item.key}>{item.no_of_files}</li>
    </div>
    <br></br>
    </ul>
        );    

    return (
      <>
        <div>
          <Menu/>
          <div className="container fluid mt-5 ml-5">
            
           <div>
            {items}
           </div>
          </div>
        </div>
      </>
    );
  }
}

export default Session;

import React, { Component } from "react";
import { Redirect, Link } from "react-router-dom";
import Menu from "./Menu";
import { read } from "../user/apiUser";
import { isAuthenticated } from "../auth";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
  KeyboardTimePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";
import {sendData} from "../weather/apiWeather";

class Home extends Component {
  state = {
    user: "",
    redirectToSignin: false,
    error: "",
    latitude:"",
    longitude:"",
    dataJson:"",
    date: new Date(),
    starttime:new Date(),
    endtime:new Date(),
    station:"",
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

  handleDateChange = date => {
    this.setState({ date: date });
  };

  handleStartTimeChange = time => {
    // console.log(new Date(this.eventData.get("eventdate")));
    // console.log(time.toString().substring(4, 15));
    let dateString = this.eventData.get("eventdate").toString().substring(4, 15);
    let timeString1 = time.toString().substring(0, 4).concat(dateString);
    let timeString2 = time.toString().substring(15);
    let eventTime = timeString1.concat(timeString2);
    this.setState({ starttime: new Date(eventTime) });
    this.eventData.set("starttime", new Date(eventTime));
  };

  handleEndTimeChange = time => {
    let dateString = this.eventData.get("eventdate").toString().substring(4, 15);
    let timeString1 = time.toString().substring(0, 4).concat(dateString);
    let timeString2 = time.toString().substring(15);
    let eventTime = timeString1.concat(timeString2);
    this.setState({ endtime: new Date(eventTime) });
    this.eventData.set("endtime", new Date(eventTime));
  };

  handleStationChange = s => {
    console.log(s.target.value); 
    this.setState({ station: s.target.value});
  };

  clickShow = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const {user,date,station,latitude,longitude} = this.state;
     console.log(user);
      const dataWeather={
        date: date,
        station:station,
        latitude: latitude,
        longitude: longitude
}
// console.log(dataWeather);

sendData(dataWeather).then(data => {
  if (data.error) {
    console.log(data.error);
  } else {
    console.log("data sent");
  }
});
  };

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
    const { redirectToSignin, latitude,longitude ,date,starttime,endtime} = this.state;

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
          <div className="form-group">
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <Grid container>
            <KeyboardDatePicker
              variant="inline"
              format="MM/dd/yyyy"
              margin="normal"
              id="eventdate"
              label="Event Date "
              value={date}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Start Time For Event "
              value={starttime}
              onChange={this.handleStartTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="End Time For Event"
              value={endtime}
              onChange={this.handleEndTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </div>
      <div class="form-group">
      <div class="dropdown">
      <label>Station</label>
      <select class="form-control"
          onChange={this.handleStationChange}>
        <option selected>Choose...</option>
        <option value="A">A</option> 
        <option value="B">B</option> 
        <option value="C">C</option>
        <option value="D">D</option>
      </select>
          </div>
        </div>
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
              onChange={this.handleChange("longitude")}
              type="text"
              className="form-control"
              value={longitude}
            ></input>
          </div>
          </div>
          <button
            onClick={this.clickShow}
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

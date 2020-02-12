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
    radarids:['DAN1', 'KABR', 'KABX', 'KAKQ', 'KAMA', 'KAMX', 'KAPX', 'KARX', 'KATX', 'KBBX', 'KBGM', 'KBHX', 'KBIS', 'KBLX', 'KBMX', 'KBOX', 'KBRO', 'KBUF', 'KBYX', 'KCAE', 'KCBW', 'KCBX', 'KCCX', 'KCLE', 'KCLX', 'KCRP', 'KCXX', 'KCYS', 'KDAX', 'KDDC', 'KDFX', 'KDGX', 'KDLH', 'KDMX', 'KDOX', 'KDTX', 'KDVN', 'KEAX', 'KEMX', 'KENX', 'KEOX', 'KEPZ', 'KESX', 'KEVX', 'KEWX', 'KEYX', 'KFCX', 'KFDR', 'KFFC', 'KFSD', 'KFSX', 'KFTG', 'KFWS', 'KGGW', 'KGJX', 'KGLD', 'KGRB', 'KGRK', 'KGRR', 'KGSP', 'KGWX', 'KGYX', 'KHDX', 'KHGX', 'KHNX', 'KHPX', 'KHTX', 'KICT', 'KICX', 'KILN', 'KILX', 'KIND', 'KINX', 'KIWA', 'KIWX', 'KJAX', 'KJGX', 'KJKL', 'KLBB', 'KLCH', 'KLGX', 'KLIX', 'KLNX', 'KLOT', 'KLRX', 'KLSX', 'KLTX', 'KLVX', 'KLWX', 'KLZK', 'KMAF', 'KMAX', 'KMBX', 'KMHX', 'KMKX', 'KMLB', 'KMOB', 'KMPX', 'KMQT', 'KMRX', 'KMSX', 'KMTX', 'KMUX', 'KMVX', 'KMXX', 'KNKX', 'KNQA', 'KOAX', 'KOHX', 'KOKX', 'KOTX', 'KPAH', 'KPBZ', 'KPDT', 'KPOE', 'KPUX', 'KRAX', 'KRGX', 'KRIW', 'KRLX', 'KRTX', 'KSFX', 'KSGF', 'KSHV', 'KSJT', 'KSOX', 'KSRX', 'KTBW', 'KTFX', 'KTLH', 'KTLX', 'KTWX', 'KTYX', 'KUDX', 'KUEX', 'KVNX', 'KVTX', 'KVWX', 'KYUX', 'PHKI', 'PHKM', 'PHMO', 'PHWA', 'TJUA'],
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
    
    console.log(time.getHours());
    this.setState({ starttime: new Date(time) });
  };

  handleEndTimeChange = time => {
    console.log(time.getHours());
    this.setState({ endtime: new Date(time) });
  };

  handleStationChange = s => {
    console.log(s.target.value); 
    this.setState({ station: s.target.value});
  };

  clickShow = event => {
    event.preventDefault();
    this.setState({ loading: true });
    const {user,date,station,starttime,endtime} = this.state;
    var min = 1;
    var max = 1000000;
    var rand =  min + (Math.random() * (max-min));
     console.log(isAuthenticated().user._id);
      const dataWeather={
        userid:isAuthenticated().user._id,
        correlationid : parseInt(rand),
        year:date.getFullYear(),
        month:date.getMonth(),
        day:date.getDate(),
        station:station,
        starthour: starttime.getHours(),
        startmin: starttime.getMinutes(),
        endhour:endtime.getHours(),
        endmin:endtime.getMinutes()
}
 console.log(dataWeather);

sendData(dataWeather,isAuthenticated().token).then(data => {
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
    const { redirectToSignin, latitude,longitude ,date,starttime,endtime,radarids} = this.state;

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
              id="date"
              label="Date "
              value={date}
              onChange={this.handleDateChange}
              KeyboardButtonProps={{
                "aria-label": "change date"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Start Time"
              value={starttime}
              onChange={this.handleStartTimeChange}
              KeyboardButtonProps={{
                "aria-label": "change time"
              }}
            />
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="End Time"
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
      <label className="text-muted ">Radar Station Id</label>
      <select class="form-control"
          onChange={this.handleStationChange}>
             <option selected>Choose...</option>
            {radarids.map((x,y) => <option key={y}>{x}</option>)}
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

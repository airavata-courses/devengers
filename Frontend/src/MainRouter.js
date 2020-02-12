import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "./core/Home";
import Signup from "./user/Signup";
import Profile from "./user/Profile";
import EditProfile from "./user/EditProfile";
// import Users from "./user/Users";
import SignInSide from "./user/Signin";
import PrivateRoute from "./auth/PrivateRoute";
import Signout from "./user/Signout";
import ForgotPassword from "./user/ForgotPassword";
import ResetPassword from "./user/ResetPassword";

const MainRouter = () => (
  <div>
    {/* <Menu /> */}
    <Switch>
      {/* Routes for authentications */}
      <Route exact path="/signin" component={SignInSide} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/forgot-password" component={ForgotPassword} />
      <Route exact path="/reset-password/:resetPasswordToken" component={ResetPassword} />
      <Route exact path="/" component={SignInSide} />
      {/* <Route exact path="/users" component={Users} /> */}
      <Route exact path="/signup" component={Signup} />
      <Route exact path="/signout" component={Signout} />

      Routes for profile
      <Route exact path="/user/:userId" component={Profile} />
      <PrivateRoute exact path="/user/edit/:userId" component={EditProfile} />
      
      {/* Routes for Weather Report */}
      
    </Switch>
  </div>
);

export default MainRouter;

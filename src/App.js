import React from "react";
import Navbar from "./components/Navbar";
import Jobs from "./components/Jobs";
import Companies from "./components/Companies";
import Signin from "./components/Signin";
import Footers from "./components/Footers";
import Postjob from "./components/Postjob";
import Jobdetails from "./components/Jobdetails";
import { BrowserRouter, Route } from "react-router-dom";
import "./App.css";
import Companydetail from "./components/Companydetail";
import { Provider } from "react-redux";
import { store } from "./reducers/store";
import Home from "./components/Home";
import Account from "./components/Account";

export default function App() {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className="App">
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/jobs" component={Jobs} />
          <Route exact path="/postjob" component={Postjob} />
          <Route path="/job/:id" component={Jobdetails} />
          <Route path="/companies" component={Companies} />
          <Route path="/company/:id" component={Companydetail} />
          <Route path="/signin" component={Signin} />
          <Route path="/account" component={Account} />
          <Footers />
        </div>
      </Provider>
    </BrowserRouter>
  );
}

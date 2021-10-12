import React from "react";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { Box, Button, withStyles } from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import { connect } from "react-redux";
import compose from "recompose/compose";
import * as actions from "../../actions";
import GoogleLogin from 'react-google-login';
const emailRegex = RegExp(
  /^[a-zA-Z0-9_!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
);
const styles = {
  root: {
    "& > *": {
      width: "100%",
      display: "block"
    }
  },
  box: {
    margin: "5rem auto"
  },
  submit: {
    width: "100%",
    margin: "2rem auto"
  }
};

class Signin extends React.Component {
  /*state = {
    name: "",
    email: "",
    password: "",
    account: "",
    pass: "",
    issignin: false
  };
*/
  handleSubmit = event => {
    event.preventDefault();
    this.props.saveaccount(this.state);
    if (this.state.name.trim() == "") {
      alert("Name Null. Name must be fill");
    } else if (
      emailRegex.test(this.state.email) == false ||
      this.state.email.trim() == ""
    ) {
      alert("invalid email");
    } else if (this.state.password.trim() == "") {
      alert("Password Null. Password must be fill");
    } else {
      alert("Register sucessfully");
    }
  };
  handleSignIn = event => {
    event.preventDefault();
    if (
      emailRegex.test(this.state.account) == false ||
      this.state.account.trim() == ""
    ) {
      alert("invalid account");
    } else if (this.state.pass.trim() == "") {
      alert("Password Null. Password must be fill");
    } else if (this.state.account != this.state.email) {
      alert("Failed email account");
    } else if (this.state.pass != this.state.password) {
      alert("Failed password account");
    } else {
      alert("Succesfully");
      this.props.changeStatus();
    }
  };

  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  responseGoogle = (response) => {
    console.log(response);
  }
  render() {
    return (
      <Box>
        <Box mx="auto" width="30vw" className={this.props.classes.box}>
          {
            <Tabs>
              <TabList>
                <Tab>Create Account</Tab>
                <Tab>Sign In</Tab>
              </TabList>
              <TabPanel>
                <form
                  className={this.props.classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSubmit}
                >
                  <TextField
                    id="standard-basic"
                    label="Name"
                    name="name"
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Email"
                    name="email"
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Password"
                    name="password"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={this.props.classes.submit}
                    type="submit"
                  >
                    Create My Account
                  </Button>
                </form>
              </TabPanel>
              <TabPanel>
                <GoogleLogin
                  clientId="658977310896-knrl3gka66fldh83dao2rhgbblmd4un9.apps.googleusercontent.com"
                  buttonText="Login"
                  onSuccess={this.responseGoogle}
                  onFailure={this.responseGoogle}
                  cookiePolicy={'single_host_origin'}
                />
                {/* <form
                  className={this.props.classes.root}
                  noValidate
                  autoComplete="off"
                  onSubmit={this.handleSignIn}
                >
                  <TextField
                    id="standard-basic"
                    label="Email"
                    name="account"
                    onChange={this.handleChange}
                  />
                  <TextField
                    id="standard-basic"
                    label="Password"
                    name="pass"
                    type="password"
                    onChange={this.handleChange}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={this.props.classes.submit}
                    type="submit"
                    variant="outlined"
                  >
                    Sign In
                  </Button>
                </form> */}
              </TabPanel>
            </Tabs>
          }
        </Box>
      </Box>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    changeStatus: () => dispatch(actions.status()),
    saveaccount: acc => dispatch(actions.infoaccount(acc))
  };
};

export default compose(
  withStyles(styles, { name: "Signin" }),
  connect(null, mapDispatchToProps)
)(Signin);

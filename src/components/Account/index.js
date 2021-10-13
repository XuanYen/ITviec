import React from "react";
import { Box, Button, withStyles, TextField } from "@material-ui/core";
import { connect } from "react-redux";
import compose from "recompose/compose";
const styles = {
  root: {
    "& > *": {
      width: "100%",
      margin: "0.7rem"
    },
    "& a": {
      textDecoration: "none",
      color: "white"
    }
  }
};

class Account extends React.Component {
  handleSubmit = event => {
    event.preventDefault();
  };
  handleChange = event => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  };
  render() {
    const { name, email, hobby, school } = this.props.account;
    return (
      <Box mx="auto" width="60vw">
        <form
          className={this.props.classes.root}
          noValidate
          autoComplete="off"
          onSubmit={this.handleSubmit}
        >
          <TextField
            id="standard-basic"
            label="Name"
            placeholder={name}
            name="name"
            onChange={this.handleChange}
          ></TextField>
          <TextField
            id="standard-basic"
            label="Email"
            placeholder={email}
            name="email"
            onChange={this.handleChange}
          ></TextField>
          <TextField
            id="standard-basic"
            label="School"
            placeholder={school}
            name="school"
            onChange={this.handleChange}
          ></TextField>
          <TextField
            id="standard-basic"
            placeholder={hobby}
            label="Hobby"
            name="hobby"
            onChange={this.handleChange}
          />
          <Button variant="contained" color="secondary" type="submit">
            Update
          </Button>
        </form>
      </Box>
    );
  }
}
const mapStateToProps = state => {
  return {
    account: state.acc
  };
};
export default compose(
  withStyles(styles, { name: "Account" }),
  connect(mapStateToProps, null)
)(Account);

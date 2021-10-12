import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Typography } from "@material-ui/core";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import * as actions from "../../actions";
function Navbar(props) {
  const style = {
    textDecoration: "none",
    color: "white"
  };

  return (
    <div>
      <AppBar
        position="static"
        color="inherit"
        style={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <Link style={style} to="/">
            <img
              style={{ height: "50px" }}
              src={window.location.origin + "/job.png"}
            />
          </Link>
          <Box ml="auto">
            <Button color="inherit">
              <Link style={style} to="/jobs">
                All Jobs
              </Link>
            </Button>
            <Button>
              <Link style={style} to="/companies">
                Companies
              </Link>
            </Button>
            <Button>
              <Link style={style} to="/cv">
                Create CV
              </Link>
            </Button>
            {/* {props.issignin ? (
              <Button>
                <Link style={style} to="/account">
                  <AccountCircleIcon />
                </Link>
                <Typography style={style}>{props.account[0].name}</Typography>
              </Button>
            ) : (
              <Button>
                <Link style={style} to="/signin">
                  Sign in
                </Link>
              </Button>
            )} */}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    issignin: state.status,
    account: state.acc
  };
};

export default connect(mapStateToProps, null)(Navbar);

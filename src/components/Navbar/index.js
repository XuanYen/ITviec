import React from "react";
import { Link } from "react-router-dom";
import { AppBar, Toolbar, Button, Box } from "@material-ui/core";
import { connect } from "react-redux";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
function Navbar(props) {
  const style = {
    textDecoration: "none",
    color: "white"
  };

  return (
    <div>
      <AppBar
        position="fixed"
        color="inherit"
        style={{ backgroundColor: "black" }}
      >
        <Toolbar>
          <img
            style={{ height: "50px" }}
            src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png"
          />

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
            {props.issignin ? (
              <Button style={style}>
                <AccountCircleIcon />
              </Button>
            ) : (
              <Button>
                <Link style={style} to="/signin">
                  Sign in
                </Link>
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </div>
  );
}
const mapStateToProps = state => {
  return {
    issignin: state.status
  };
};
const mapDispatchToProps = null;

export default connect(mapStateToProps, null)(Navbar);

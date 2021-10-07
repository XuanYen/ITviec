import React from "react";
import { Grid, Typography, withStyles, Box, Button } from "@material-ui/core";
import Job from "../Job";
import axios from "axios";
import { Link } from "react-router-dom";
import AccessibilityNewIcon from "@material-ui/icons/AccessibilityNew";
import { connect } from "react-redux";
import compose from "recompose/compose";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import HomeIcon from "@material-ui/icons/Home";
import BorderColorIcon from "@material-ui/icons/BorderColor";
import TextField from "@material-ui/core/TextField";
import * as actions from "../../actions";
import fetchJob from '../../actions/fetchJob'
const styles = {
  post: {
    textDecoration: "none",
    fontSize: "1.5rem",
    color: "black",
    fontWeight: "bold",
    textAlign: "left",
    "& div": {
      textAlign: "center"
    }
  },

  list: {
    width: "100%",
    maxWidth: 360
  },
  item: {
    margin: "5rem 0"
  }
};
class Jobs extends React.Component {
  state = {
    page: 1,
    page_size: 6
  };
  componentDidMount() {
    this.props.fetchJob();
  }
  /*state = {
    jobs: []
  };
  componentDidMount() {
    axios
      .get("http://5e397cb4aad22200149629c5.mockapi.io/api/jobs/jobs")
      .then(res => {
        this.setState({ jobs: res.data });
      })
      .catch(err => {
        console.log(err);
      });
  }*/
  // handleChangePage = value => {
  //   this.setState({ page: value });
  // };
  handleSubmitfield = event => {
    event.preventDefault();
    this.props.onfilterfield(this.state.field);
  };
  handleSubmitcountry = event => {
    event.preventDefault();
    this.props.onfiltercountry(this.state.country);
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
    const pagination = [];
    for (
      let i = 0;
      i < Math.ceil(this.props.jobs.length / this.state.page_size);
      i++
    ) {
      pagination.push(
        <Button
          variant={this.state.page === i + 1 ? "contained" : "outlined"}
          color="primary"
          onClick={() => this.handleChangePage(i + 1)}
        >
          {i + 1}
        </Button>
      );
    }
    return (
      <Grid container direction="row" spacing={3}>
        <Grid item xs={9}>
          <Link to="/postjob" className={this.props.classes.post}>
            <AccessibilityNewIcon fontSize="large" />
            Are you hire recruitment? Post job here !!!
            <Box>
              <Button variant="contained" color="primary">
                Post job
              </Button>
            </Box>
          </Link>
          <Typography variant="h5">
            IT jobs in Vietnam for you
          </Typography>
          <Box>
            {[...this.props.listJobs]
              // .splice(
              //   (this.state.page - 1) * this.state.page_size,
              //   this.state.page_size
              // )
              .map(job => {
                console.log("j", job.contents)
                let tempDescription = job.contents ? job.contents.match(/<strong>.*?<\/strong>/g) : [];
                console.log("t", tempDescription)
                let description = tempDescription ? (tempDescription[0] ? tempDescription[0] : tempDescription[1]) : '<strong>No information</strong>';
                return (
                  <Job
                    id={job.id}
                    title={job.name}
                    levels={job.levels}
                    field={job.categories}
                    company={job.company.name}
                    // logo={job.logo}
                    description={description}
                  ></Job>
                );
              })}
          </Box>
          <Box
            display="flex"
            style={{ marginLeft: "40%", marginBottom: "1rem" }}
          >
            {pagination}
          </Box>
        </Grid>
        <Grid item xs={3} className={this.props.classes.item}>
          <Typography variant="h5">
            Sort
          </Typography>
          <List
            component="nav"
            className={this.props.classes.list}
            aria-label="contacts"
          >
            <form
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmitfield}
            >
              <ListItem button>
                <ListItemIcon>
                  <BorderColorIcon />
                </ListItemIcon>
                <TextField
                  id="standard-basic"
                  label="By field"
                  name="field"
                  onChange={this.handleChange}
                />
              </ListItem>
            </form>
            <form
              noValidate
              autoComplete="off"
              onSubmit={this.handleSubmitcountry}
            >
              <ListItem button>
                <ListItemIcon>
                  <HomeIcon />
                </ListItemIcon>
                <TextField
                  id="standard-basic"
                  label="By country"
                  name="country"
                  onChange={this.handleChange}
                />
              </ListItem>
            </form>
          </List>
          <Button
            variant="contained"
            color="primary"
            type="submit"
          >
            <Link to="/jobs">Reset</Link>
          </Button>
        </Grid>
      </Grid>
    );
  }
}
const mapStateToProps = state => {
  return {
    listJobs: state.job.listJobs,
    jobs: state.jobs,
    error: state.error,
    loading: state.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    onfiltercountry: country => dispatch(actions.filtercountry(country)),
    onfilterfield: field => dispatch(actions.filterfield(field)),
    fetchJob: () => dispatch(fetchJob())
  };
};

export default compose(
  withStyles(styles, { name: "Jobs" }),
  connect(mapStateToProps, mapDispatchToProps)
)(Jobs);

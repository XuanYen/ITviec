import React from "react";
import { Grid, Typography, withStyles, Box } from "@material-ui/core";
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
import Button from '@mui/material/Button';
import fetchJob from '../../actions/fetchJob';
import Pagination from '@mui/material/Pagination';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
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
    page: 1
  };
  componentDidMount() {
    this.props.fetchJob(this.state.page);
  }
  handleChange = (e, value) => {
    this.setState({ page: value }, () => this.props.fetchJob(this.state.page));
  }
  render() {
    const { listJobs, loading } = this.props;
    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    }));
    return (
      <Box mx="auto">
        {
          loading ? (
            <Box sx={{
              display: 'flex', justifyContent: 'center', alignItems: 'center',
              height: '100vh'
            }}>
              <CircularProgress color="success" />
            </Box>
          ) : (
            <Box>
              <Div>{" You can explore the best paying jobs and other more specific career rankings."}</Div>
              <Box>
                {listJobs ? listJobs.map(job => {
                  let tempDescription = job.contents ? (job.contents.match(/<strong>.*?<strong>/g)) || (job.contents.match(/<span>.*?<span>/g)) : [];
                  let description = tempDescription ? (tempDescription[0] ? tempDescription[0] : tempDescription[1]) : '<span>We are looking for people who take pride in their work to join our team. You help shape our member entire shopping experience by giving them a positive first and last impression.</span>';
                  return (
                    <Job
                      key={job.id}
                      id={job.id}
                      title={job.name}
                      levels={job.levels}
                      locations={job.locations}
                      field={job.categories}
                      company={job.company.name}
                      // logo={job.logo}
                      description={description}
                    ></Job>
                  );
                }) : null}
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'center' }} mb={5}>
                <Pagination count={10} page={this.state.page} onChange={this.handleChange} showFirstButton showLastButton />
              </Box>
            </Box>
          )
        }
      </Box>
    );
  }
}
const mapStateToProps = state => {
  return {
    listJobs: state.job.listJobs.results,
    error: state.job.error,
    loading: state.job.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchJob: (page) => dispatch(fetchJob(page))
  };
};

export default compose(
  withStyles(styles, { name: "Jobs" }),
  connect(mapStateToProps, mapDispatchToProps)
)(Jobs);

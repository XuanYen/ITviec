import React, { useEffect } from "react";
import axios from "axios";
import {
  CircularProgress,
  Box,
  Typography,
  Grid,
  withStyles,
  Card,
  CardActionArea,
  CardMedia,
  CardContent,
  ListItemIcon,
  ListItemText,
  ListItem,
  Button
} from "@material-ui/core";
import { connect, useSelector } from "react-redux";
import * as actions from "../../actions";
import compose from "recompose/compose";
import PeopleIcon from "@material-ui/icons/People";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import Jobdetail from "../Jobdetail";
import fetchJobDetail from '../../actions/fetchJobDetail';
const styles = {
  box: {
    margin: "5rem 5rem"
  },
  root: {
    maxWidth: 400,
    "& img": {
      objectFit: "none"
    }
  },
  apply: {
    width: "100%"
  }
};
class Jobdetails extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    this.props.fetchJobDetail(id)
  }
  /*state = {
    job: {},
    loading: true
  };
  componentDidMount() {
    axios
      .get(
        `http://5e397cb4aad22200149629c5.mockapi.io/api/jobs/jobs/${this.props.match.params.idjob}`
      )
      .then(res => {
        this.setState({ job: res.data, loading: false });
      })
      .catch(err => {
        console.log(err);
      });
  }*/
  render() {
    let job = this.props.jobDetail;
    return (
      <div>
        {Object.keys(job).length > 0 ? (
          <Jobdetail
            id={job.id}
            title={job.name}
            levels={job.levels}
            categories={job.categories}
            company={job.company}
            address={job.locations}
            description={job.contents}
            date={job.publication_date}
          ></Jobdetail>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    jobDetail: state.job.jobDetail,
    error: state.job.error,
    loading: state.job.loading
  };
};
const mapDispatchToProps = dispatch => {
  return {
    fetchJobDetail: id => dispatch(fetchJobDetail(id))
  };
};
export default compose(
  withStyles(styles, { name: "Jobdetail" }),
  connect(mapStateToProps, mapDispatchToProps)
)(Jobdetails);

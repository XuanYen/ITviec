import React from "react";
import {
  withStyles,
} from "@material-ui/core";
import { connect } from "react-redux";
import compose from "recompose/compose";
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

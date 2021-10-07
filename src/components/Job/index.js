import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as actions from "../../actions";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(1)
  },
  box: {
    margin: "1rem 3rem",
    padding: "1rem",
    textTransform: "none",
    textAlign: "left",
    "& img": {
      maxWidth: "100%",
      objectFit: "contain"
    },
    "& div": {
      margin: 0
    }
  },
  link: {
    margin: "0.5rem",
    "& a": {
      textDecoration: "none",
      color: "white"
    },
    "& svg": {
      fontSize: "1rem"
    }
  }
}));
function Job(props) {
  const classes = useStyles();
  const { id, title, field, company, description } = props;
  console.log(props);
  return (
    <Box display="flex" className={classes.box} boxShadow={3}>
      {/* <Box width="30%">
        <img alt="No logo :)" />
      </Box> */}
      <Box className={classes.box} width="70%">
        <Typography variant="h6">
          #{id} {title}
        </Typography>
        <Typography variant="h6">{company}</Typography>
        <Button
          onClick={() => props.onjobdetail(id)}
          className={classes.link}
          startIcon={<ArrowForwardIosIcon />}
          variant="contained"
          color="primary"
        >
          <Link to={`job/${id}`}>See into view</Link>
        </Button>
        <Box>
          <Typography variant="p">
            <FormatQuoteIcon />
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
          <Box>
            {field.length > 0 ? field.map(f => (
              <Button
                variant="outlined"
                size="small"
                color="primary"
                className={classes.margin}
              >
                {f.name}
              </Button>
            )) : null}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
const mapDispatchToProps = dispatch => {
  return {
    onjobdetail: id => dispatch(actions.jobdetail(id))
  };
};

export default connect(null, mapDispatchToProps)(Job);

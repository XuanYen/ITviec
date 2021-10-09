import React from "react";
import { Box, Typography, Button } from "@material-ui/core";
import ButtonGroup from '@mui/material/ButtonGroup';
import { makeStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

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
const Job = (props) => {
  const classes = useStyles();
  const { id, title, field, company, description, levels, locations } = props;
  return (
    <Box display="flex" className={classes.box} boxShadow={3}>
      {/* <Box width="30%">
        <img alt="No logo :)" />
      </Box> */}
      <Box className={classes.box} width="70%">
        <Typography variant="h6">
          #{id} {title}
        </Typography>
        <div>
          <Typography variant="p">Company: {company}</Typography>
        </div>
        <Box>
          <Typography variant="p">
            <FormatQuoteIcon />
            <span dangerouslySetInnerHTML={{ __html: description }} />
          </Typography>
          <Box>
            <Typography variant="span">Categories: </Typography>
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
          <ButtonGroup variant="contained" aria-label="outlined primary button group">
            {levels.length > 0 ? <Button>{levels[0].name}</Button> : null}
            {locations.length > 0 ? <Button>{locations[0].name}</Button> : null}
          </ButtonGroup>
          <Button
            className={classes.link}
            startIcon={<ArrowForwardIosIcon />}
            variant="outlined"
            color="primary"
            href={`job/${id}`}
          >
            See into view
          </Button>
        </Box>
      </Box>
    </Box>
  );
}


export default Job;

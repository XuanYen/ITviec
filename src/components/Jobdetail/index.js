import React from "react";
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
import { connect } from "react-redux";
import compose from "recompose/compose";
import PeopleIcon from "@material-ui/icons/People";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DateRangeIcon from "@material-ui/icons/DateRange";
import MonetizationOnRoundedIcon from "@material-ui/icons/MonetizationOnRounded";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
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
class Jobdetail extends React.Component {
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
    const {
      id,
      title,
      levels,
      categories,
      company,
      address,
      description,
      date
    } = this.props;
    return (
      <div>
        {/* {this.props.jobs.length == 0 ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            width="100vw"
          >
            <CircularProgress size={40} />
          </Box>
        ) : ( */}
        <Box mx="auto" width="80vw" className={this.props.classes.box}>
          <Grid
            spacing={3}
            container
            direction="row"
            alignItems="flex-start"
          >
            <Grid item xs={4}>
              <Card mb={5}>
                <CardContent>
                  <Typography gutterBottom variant="h6">
                    {company.name}
                  </Typography>
                  <Box>
                    <ListItem>
                      <ListItemIcon>
                        <PeopleIcon />
                      </ListItemIcon>
                      <ListItemText>{date}</ListItemText>
                    </ListItem>
                    {
                      address.length > 0 ? (
                        <ListItem>
                          <ListItemIcon>
                            <EditLocationIcon />
                          </ListItemIcon>
                          <ListItemText>{address[0].name}</ListItemText>
                        </ListItem>
                      ) : null
                    }
                    {
                      categories.length > 0 ? (
                        <ListItem>
                          <ListItemIcon>
                            <DateRangeIcon />
                          </ListItemIcon>
                          <ListItemText>{categories[0].name}</ListItemText>
                        </ListItem>
                      ) : null
                    }
                    {
                      levels.length > 0 ? (
                        <ListItem>
                          <ListItemIcon>
                            <ScheduleIcon />
                          </ListItemIcon>
                          <ListItemText>{levels[0].name}</ListItemText>
                        </ListItem>
                      ) : null
                    }
                  </Box>
                </CardContent>
              </Card>
              <img src='../../hiring.png' alt='Nothing' width="300px" />
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography variant="h5">{title}</Typography>
                {/* <Box>
                  {field.map(f => {
                    return <Button variant="outlined">{f}</Button>;
                  })}
                </Box>
                <ListItem>
                  <ListItemIcon>
                    <MonetizationOnRoundedIcon />
                  </ListItemIcon>
                  <ListItemText>Sign in to view salary</ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <LocationOnRoundedIcon />
                  </ListItemIcon>
                  <ListItemText>{address}</ListItemText>
                </ListItem> */}
                <Button
                  variant="contained"
                  color="secondary"
                  className={this.props.classes.apply}
                >
                  Apply Now
                </Button>
              </Box>
              <Box textAlign='left'>
                <Typography variant="h5">The Job description</Typography>
                <Box>
                  <div dangerouslySetInnerHTML={{ __html: description }} />
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        )
      </div>
    );
  }
}
export default compose(
  withStyles(styles, { name: "Jobdetail" }),
  connect(null, null)
)(Jobdetail);

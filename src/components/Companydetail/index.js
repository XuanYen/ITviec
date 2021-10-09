import React from "react";
import compose from 'recompose/compose';
import { connect } from 'react-redux';
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import PeopleIcon from "@material-ui/icons/People";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DateRangeIcon from "@material-ui/icons/DateRange";
import LocationOnRoundedIcon from "@material-ui/icons/LocationOnRounded";
import ChevronRightRoundedIcon from "@material-ui/icons/ChevronRightRounded";
import {
  CircularProgress,
  Box,
  CardMedia,
  CardContent,
  withStyles,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  ButtonGroup
} from "@material-ui/core";
import fetchCompanyDetail from '../../actions/fetchCompanyDetail';
import { Carousel } from 'react-responsive-carousel';
import { Description } from "@material-ui/icons";
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
const styles = {
  root: {
    maxWidth: 200,
    marginLeft: 0,
    marginRight: "7rem",
    outline: "solid thin grey",
    "& img": {
      objectFit: "cover"
    }
  },
  header: {
    textAlign: "left",
    fontSize: "0.7rem",
    display: "flex",
    margin: "2rem",
    "& li": {
      paddingTop: 0,
      paddingBottom: 0
    }
  },
  button: {
    margin: "0.5rem"
  }
};

class Companydetail extends React.Component {
  constructor(props) {
    super(props);
    let id = this.props.match.params.id;
    this.props.fetchCompanyDetail(id);
  }
  render() {
    let {
      id, size, name, locations, industries, refs, description
    } = this.props.companyDetail;
    return (
      <div>
        {this.props.loading === true ? (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="80vh"
            width="100vw"
          >
            <CircularProgress size={40} />
          </Box>
        ) : (
          <div>
            {Object.keys(this.props.companyDetail).length > 0 ? (
              <Box>
                <Box mx="auto" width="80vw">
                  <Box className={this.props.classes.header}>
                    <Box>
                      <Typography variant="h6">{name}</Typography>
                      {
                        refs ? (
                          Object.keys(refs).length > 0 ? (
                            <CardContent
                              className={this.props.classes.root}
                              style={{ padding: "10px" }}
                            >
                              <CardMedia
                                component="img"
                                alt="Contemplative Reptile"
                                width="500"
                                image={refs.logo_image}
                                title="Contemplative Reptile"
                              />
                            </CardContent>
                          ) : null
                        ) : null
                      }
                    </Box>
                    <Box>
                      {
                        locations.length > 0 ? (
                          <ListItem>
                            <ListItemIcon>
                              <LocationOnRoundedIcon />
                            </ListItemIcon>
                            <ListItemText>{locations[0].name}</ListItemText>
                          </ListItem>
                        ) : null
                      }
                      <ListItem>
                        <ListItemIcon>
                          <PeopleIcon />
                        </ListItemIcon>
                        <ListItemText>{size.name}</ListItemText>
                      </ListItem>
                      <ListItem>
                        {
                          industries.length > 0 ? (
                            <ButtonGroup variant="text" aria-label="text button group">
                              {
                                industries.map((ele, index) => <Button key={index}>{ele.name}</Button>)
                              }
                            </ButtonGroup>
                          ) : null
                        }
                      </ListItem>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon />}
                          aria-controls="panel1a-content"
                          id="panel1a-header"
                        >
                          <Typography>About Company</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                          <Typography>
                            {description}
                          </Typography>
                        </AccordionDetails>
                      </Accordion>
                    </Box>
                  </Box>
                </Box>
                <Box width="80vw" mx="auto">
                  {
                    Object.keys(refs).length > 0 ? (
                      <Carousel>
                        <img src={refs.f1_image} alt="Banner 1" />
                        <img src={refs.f2_image} alt="Banner 2" />
                        <img src={refs.f3_image} alt="Banner 3" />
                      </Carousel>
                    ) : null
                  }
                </Box>
              </Box>
            ) : null}
          </div>
        )}
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    loading: state.company.loading,
    error: state.company.error,
    companyDetail: state.company.companyDetail
  };
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCompanyDetail: id => dispatch(fetchCompanyDetail(id))
  }
}
export default compose(
  withStyles(styles),
  connect(mapStateToProps, mapDispatchToProps)
)(Companydetail);

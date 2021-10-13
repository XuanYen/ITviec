import React from "react";
import { connect } from 'react-redux';
import {
  CircularProgress,
  Box,
  CardMedia,
  CardContent,
  ListItem,
  ListItemIcon,
  ListItemText,
  Typography,
  Button,
  ButtonGroup,
  Accordion, AccordionSummary, AccordionDetails
} from "@mui/material";
import fetchCompanyDetail from '../../actions/fetchCompanyDetail';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { ExpandMore, People, LocationOnRounded, Code } from '@mui/icons-material';
const styles = {
  root: {
    maxWidth: 200,
    marginLeft: 0,
    marginRight: "7rem",
    outline: "solid thin grey",
    "& img": {
      objectFit: "cover"
    },
    padding: '10px'
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
    let { size, name, locations, industries, refs, description } = Object.keys(this.props.companyDetail).length > 0 ? this.props.companyDetail : { id: '', size: '', name: '', locations: [], industries: [], refs: [], description: '' };
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
                  <Box style={styles.header}>
                    <Box>
                      <Typography variant="h6">{name}</Typography>
                      {
                        refs ? (
                          Object.keys(refs).length > 0 ? (
                            <CardContent
                              style={styles.root}
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
                              <LocationOnRounded />
                            </ListItemIcon>
                            <ListItemText>{locations[0].name}</ListItemText>
                          </ListItem>
                        ) : null
                      }
                      <ListItem>
                        <ListItemIcon>
                          <People />
                        </ListItemIcon>
                        <ListItemText>{size.name}</ListItemText>
                      </ListItem>
                      <ListItem>
                        {
                          industries.length > 0 ? (
                            <ButtonGroup variant="text" aria-label="text button group">
                              <Code />
                              {
                                industries.map((ele, index) => <Button key={index}>{ele.name}</Button>)
                              }
                            </ButtonGroup>
                          ) : null
                        }
                      </ListItem>
                      <Accordion>
                        <AccordionSummary
                          expandIcon={<ExpandMore />}
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
export default connect(mapStateToProps, mapDispatchToProps)(Companydetail);

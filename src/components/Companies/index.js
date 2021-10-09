import React from "react";
import { Box } from "@material-ui/core";
import Company from "../Company";
import { connect } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import fetchCompany from '../../actions/fetchCompany';
import CircularProgress from '@mui/material/CircularProgress';

class Companies extends React.Component {
  state = {
    page: 1
  };
  componentDidMount() {
    this.props.fetchCompany(this.state.page);
  }
  handleChange = (e, value) => {
    this.setState({ page: value }, () => this.props.fetchCompany(this.state.page));
  }
  render() {
    const { loading, listCompanies } = this.props;
    return (
      <Box>
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
              <Box mb={5}>
                {listCompanies ? listCompanies.map(company => {
                  const { id, name, locations, industries, description, refs } = company;
                  return (
                    <Company
                      key={id}
                      id={id}
                      name={name}
                      locations={locations}
                      industries={industries}
                      description={description}
                      logo_image={refs.logo_image}
                    ></Company>
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
    listCompanies: state.company.listCompanies.results,
    error: state.company.error,
    loading: state.company.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCompany: (page) => dispatch(fetchCompany(page))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Companies);

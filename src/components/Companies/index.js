import React from "react";
import { Box } from "@material-ui/core";
import Company from "../Company";
import { connect } from 'react-redux';
import Pagination from '@mui/material/Pagination';
import fetchCompany from '../../actions/fetchCompany';
import CircularProgress from '@mui/material/CircularProgress';
import { styled } from '@mui/material/styles';
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
    const Div = styled('div')(({ theme }) => ({
      ...theme.typography.button,
      backgroundColor: theme.palette.background.paper,
      padding: theme.spacing(1),
    }));
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
              <Div>{"Top Companies Hiring for Recruiter Jobs."}</Div>
              <Box my={5}>
                {listCompanies ? listCompanies.map((company, index) => {
                  const { id, name, locations, industries, description, refs } = company;
                  return (
                    <Company
                      key={id}
                      index={index + 1}
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
    listCompanies: state.companies.listCompanies.results,
    error: state.companies.error,
    loading: state.companies.loading
  }
}
const mapDispatchToProps = dispatch => {
  return {
    fetchCompany: (page) => dispatch(fetchCompany(page))
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Companies);

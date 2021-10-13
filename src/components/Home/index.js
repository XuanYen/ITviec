import React, { useState } from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { useSelector, useDispatch } from 'react-redux';
import fetchJobSearch from '../../actions/fetchJobSearch';
import Job from '../Job';
import { styled } from '@mui/material/styles';
const Home = () => {
  const dispatch = useDispatch();
  const [level, setLevel] = useState('');
  const [company, setCompany] = useState('');
  const listSearchJobs = useSelector((state) => state.job.listSearchJobs.results);
  let loading = useSelector((state) => state.job.loading)
  const [show, setShow] = useState(false);
  console.log('loading', loading)
  const handleSubmit = (e) => {
    e.preventDefault();
    let searchQuery = level ? (company ? `&level=${level}&company=${company}` : `&level=${level}`) : (company ? `&company=${company}` : '');
    dispatch(fetchJobSearch(searchQuery));
    setShow(true)
  }
  const Div = styled('div')(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));
  return (
    <Box>
      <Box sx={{ backgroundImage: `url('./homepage.png')`, height: '100vh', minHeight: '700px', backgroundSize: 'cover', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div>
          <Typography variant='h3' sx={{ color: 'white', textTransform: 'capitalize', fontSize: '40px', width: '100%' }}>The easiest way to get your new job</Typography>
          <Box component="form"
            sx={{
              '& .MuiTextField-root': { m: 5 },
              backgroundColor: 'white',
              border: '1px solid #e6e6e6',
              borderRadius: '60px',
              padding: '15px 50px',
              display: 'flex',
              justifyContent: 'space-around',
              marginTop: '20px'
            }}
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
          >
            <FormControl variant="standard" sx={{ borderRight: '1px solid #e6e6e6', width: '200px' }}>
              <InputLabel id="level-label">Levels</InputLabel>
              <Select
                labelId="level-label"
                id="level"
                value={level}
                label="Levels"
                onChange={(e) => setLevel(e.target.value)}
              >
                <MenuItem value={`Entry%20Level`}>Entry Level</MenuItem>
                <MenuItem value={`Mid%20Level`}>Mid Level</MenuItem>
                <MenuItem value={`Senior%20Level`}>Senior Level</MenuItem>
              </Select>
            </FormControl>
            <FormControl variant="standard" sx={{ width: '200px' }}>
              <InputLabel id="company-label">Company</InputLabel>
              <Select
                labelId="company-label"
                id="company"
                value={company}
                label="Company"
                onChange={(e) => setCompany(e.target.value)}
              >
                <MenuItem value={`Amazon`}>Amazon</MenuItem>
                <MenuItem value={`Walmart`}>Walmart</MenuItem>
                <MenuItem vale={'Signify'}>Signify</MenuItem>
              </Select>
            </FormControl>
            <Button type="submit" sx={{ color: 'white', backgroundColor: '#f8ab01' }}>Search</Button>
          </Box>
        </div>
      </Box>
      {show && <Box mx="auto">
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
              <Div>{" Results for searching."}</Div>
              {
                listSearchJobs.length > 0 ? (
                  <>
                    <Box>
                      {listSearchJobs ? listSearchJobs.map(job => {
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
                            description={description}
                          ></Job>
                        );
                      }) : null}
                    </Box>
                  </>
                ) : <Typography variant='h6'>No information</Typography>
              }
            </Box>
          )
        }
      </Box>}
    </Box>
  );
}
export default Home;

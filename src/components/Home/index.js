import React, { useState } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
const Home = () => {
  const [level, setLevel] = useState('');
  const [company, setCompany] = useState('');
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(level, company)
  }
  return (
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
            </Select>
          </FormControl>
          <Button type="submit" sx={{ color: 'white', backgroundColor: '#f8ab01' }}>Search</Button>
        </Box>
      </div>
    </Box>
  );
}
export default Home;

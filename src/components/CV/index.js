import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextareaAutosize from '@mui/material/TextareaAutosize';
import Icon from '@mui/material/Icon';
import Button from '@mui/material/Button';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import useDebounce from './useDebounce';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SaveIcon from '@mui/icons-material/Save';
import LoadingButton from '@mui/lab/LoadingButton';
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { PdfDocument } from "./CVInfo";
import { styled } from '@mui/material/styles';
function CV() {
    const [info, setInfo] = useState({});
    const [show, setHide] = useState(false);
    const [numChildrenEducation, setNumChildrenEducation] = useState(1);
    const [numChildrenExperience, setNumChildrenExperience] = useState(1);
    const [name, setName] = useState('XUAN YEN');
    const [address, setAddress] = useState('KTX Bach Khoa 497 Hoa Hao Q10 TP HCM');
    const [phone, setPhone] = useState('0787898565');
    const [email, setEmail] = useState('0787898565');
    const [website, setWebsite] = useState('xyen.github.com');
    const [education, setEducation] = useState([{
        id: 0,
        school: '',
        major: '',
        timeStart: '',
        timeEnd: ''
    }]);
    const [experience, setExperience] = useState([{
        id: 0,
        company: '',
        position: '',
        timeJobStart: '',
        timeJobEnd: ''
    }])
    const handleAddEducation = (e) => {
        e.preventDefault();
        setNumChildrenEducation(numChildrenEducation + 1);
    }
    const handleAddExperience = (e) => {
        e.preventDefault();
        setNumChildrenExperience(numChildrenExperience + 1);
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        let info = { name, address, phone, email, website, education, experience };
        setInfo(info);
        setHide(true);
    }
    const educationChildren = [], experienceChildren = [];
    for (var i = 0; i < numChildrenEducation; i += 1) {
        educationChildren.push(<EducationSection useDebounce={useDebounce} education={education} setEducation={setEducation} key={i} number={i} />);
    };
    for (var i = 0; i < numChildrenExperience; i += 1) {
        experienceChildren.push(<ExperienceSection useDebounce={useDebounce} experience={experience} setExperience={setExperience} key={i} number={i} />);
    };
    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));
    return (
        <Box>
            <Div>{"Build Your New Resume! Make a perfect resume in 2021 and get your dream job using the free resume."}</Div>
            <Box textAlign='left' sx={{ display: 'flex', justifyContent: 'center' }}>
                <Box component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1, width: '33%' },
                    }}
                    noValidate
                    autoComplete="off"
                    onSubmit={handleSubmit}
                >
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Part 1: General Information</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <TextField id="name" value={name} onInput={e => setName(e.target.value)} label="Name" variant="filled" />
                                <TextField id="address" label="Address" variant="filled" value={address} onInput={e => setAddress(e.target.value)} />
                                <TextField id="phone" label="Phone" variant="filled" value={phone} onInput={e => setPhone(e.target.value)} />
                                <TextField id="email" label="Email" variant="filled" value={email} onInput={e => setEmail(e.target.value)} />
                                <TextField id="website" label="Website" variant="filled" value={website} onInput={e => setWebsite(e.target.value)} />
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Part 2: Education</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Box id="educationSections">
                                    {educationChildren}
                                </Box>
                                <Box onClick={handleAddEducation} variant='span'>
                                    <Icon color="primary">add_circle</Icon>
                                    <Typography variant='span'>Add extra</Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3a-content"
                            id="panel3a-header"
                        >
                            <Typography>Part 3: Experience</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Box>
                                <Box id="experienceSections">
                                    {experienceChildren}
                                </Box>
                                <Box onClick={handleAddExperience} variant='span'>
                                    <Icon color="primary">add_circle</Icon>
                                    <Typography variant='span'>Add extra</Typography>
                                </Box>
                            </Box>
                        </AccordionDetails>
                    </Accordion>
                    <Button type="submit" sx={{ m: 2 }}>Submit</Button>
                </Box>
            </Box>
            {show && (
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: '20px' }}>
                    <img width='300px' src='./candidate.png' />
                    <PDFViewer width='50%'>
                        <PdfDocument data={info} />
                    </PDFViewer>
                    <PDFDownloadLink
                        document={<PdfDocument data={info} />}
                        fileName="cv.pdf"
                        style={{
                            textDecoration: 'none',
                            marginLeft: '20px'
                        }}
                    >
                        {({ blob, url, loading, error }) =>
                            <LoadingButton
                                color="secondary"
                                loading={loading}
                                loadingPosition="start"
                                startIcon={<SaveIcon />}
                                variant="contained"
                            >
                                Download CV
                            </LoadingButton>
                        }
                    </PDFDownloadLink>
                </Box>
            )}
        </Box>

    )
}
const EducationSection = props => {
    const [school, setSchool] = useState('HoChiMinh University of Technology');
    const [major, setMajor] = useState('Computer Science');
    const [timeStart, setTimeStart] = useState('05/08/2017');
    const [timeEnd, setTimeEnd] = useState('20/11/2021');
    const { education, number, setEducation } = props;
    const debouncedSchool = useDebounce(school, 2000);
    const debouncedMajor = useDebounce(major, 2000);
    const debouncedTimeStart = useDebounce(timeStart, 2000);
    const debouncedTimeEnd = useDebounce(timeEnd, 2000);
    useEffect(() => {
        addSchool(debouncedSchool, debouncedMajor, debouncedTimeStart, debouncedTimeEnd)
    }, [debouncedSchool, debouncedMajor, debouncedTimeStart, debouncedTimeEnd]);
    const addSchool = (school, major, timeStart, timeEnd) => {
        let updateEducation = {
            id: number,
            school,
            major,
            timeStart: moment(timeStart).format("DD/MM/YYYY"),
            timeEnd: moment(timeEnd).format("DD/MM/YYYY")
        }
        let newEducation = [...education];
        let found = newEducation.findIndex(ele => ele.id == number);
        console.log(newEducation, number, found)
        if (found !== -1) {
            newEducation[found] = updateEducation;
        } else {
            newEducation.push(updateEducation)
        }
        setEducation(newEducation)
    }
    return (
        <Box id={`education${props.number}`} key={number}>
            <Typography variant="h6">School {number + 1}</Typography>
            <TextField value={school} onInput={(e) => setSchool(e.target.value)} label="School" variant="filled" />
            <TextField value={major} onInput={(e) => setMajor(e.target.value)} label="Major" variant="filled" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={timeStart}
                    format="dd/MM/yyyy"
                    onChange={(newValue) => {
                        setTimeStart(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    value={timeEnd}
                    format="dd/MM/yyyy"
                    onChange={(newValue) => {
                        setTimeEnd(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>

        </Box>
    )
};
const ExperienceSection = props => {
    const [company, setCompany] = useState('HCMUT');
    const [position, setPosition] = useState('Intern');
    const [timeJobStart, setTimeJobStart] = useState('03/08/2020');
    const [timeJobEnd, setTimeJobEnd] = useState('03/10/2021');
    const [description, setDescription] = useState('I am responsible for developing new product in almost stages. I have worked as BA, Developer and Tester. Additionally, I also learned more soft skills such as problem solving and critical thinking.')
    const { experience, number, setExperience } = props;
    const debouncedCompany = useDebounce(company, 2000);
    const debouncedPosition = useDebounce(position, 2000);
    const debouncedTimeJobStart = useDebounce(timeJobStart, 2000);
    const debouncedTimeJobEnd = useDebounce(timeJobEnd, 2000);
    const debouncedDescription = useDebounce(description, 2000);
    useEffect(() => {
        addExperience(debouncedCompany, debouncedPosition, debouncedTimeJobStart, debouncedTimeJobEnd, debouncedDescription);
    }, [debouncedCompany, debouncedPosition, debouncedTimeJobStart, debouncedTimeJobEnd, debouncedDescription])
    const addExperience = (company, position, timeJobStart, timeJobEnd, description) => {
        let updateExperience = {
            id: number,
            company,
            position,
            timeJobStart,
            timeJobEnd,
            description
        };
        let newExperience = [...experience];
        let found = newExperience.findIndex(ele => ele.id === number);
        if (found !== -1) {
            newExperience[found] = updateExperience;
        } else {
            newExperience.push(updateExperience);
        }
        setExperience(newExperience)
    }
    return (
        <Box id={`experience${props.number}`} key={props.number}>
            <Typography variant="h6">Experience {props.number + 1}</Typography>
            <TextField value={company} onInput={(e) => setCompany(e.target.value)} label="Company" variant="filled" />
            <TextField value={position} onInput={(e) => setPosition(e.target.value)} label="Position" variant="filled" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    value={timeJobStart}
                    format="dd/MM/yyyy"
                    onChange={(newValue) => {
                        setTimeJobStart(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    value={timeJobEnd}
                    format="dd/MM/yyyy"
                    onChange={(newValue) => {
                        setTimeJobEnd(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Box sx={{ m: 1 }}>
                <TextField value={description} onInput={(e) => setDescription(e.target.value)} style={{ width: '66%' }} multiline rows={5} rowsMax={5} label="Description" variant="filled" />
            </Box>
        </Box>
    )
};
export default CV;
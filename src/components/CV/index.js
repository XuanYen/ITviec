import React, { useState, useEffect } from 'react';
import { TextField, Box, Typography, Icon, Button, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';
import moment from 'moment';
import useDebounce from './useDebounce';
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
    const [email, setEmail] = useState('xy@gmail.com');
    const [website, setWebsite] = useState('xyen.github.com');
    const [errorText, setErrorText] = useState({})
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
    const Div = styled('div')(({ theme }) => ({
        ...theme.typography.button,
        backgroundColor: theme.palette.background.paper,
        padding: theme.spacing(1),
    }));
    const validateEmail = (email) => {
        var re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    const handleValidate = (e, attribute, setAttribute) => {
        let { value } = e.target;
        let newErrorText = { ...errorText }
        if (!value) {
            newErrorText[attribute] = `${attribute} is require`
        } else if (attribute === 'email' && !validateEmail(value)) {
            newErrorText[attribute] = `Email is invalid`
        } else if (attribute === 'phone' && value.length > 11) {
            newErrorText[attribute] = `Phone is invalid. Minimum 11 numbers.`
        }
        else {
            newErrorText[attribute] = '';
            setAttribute(value);
        }
        setErrorText(newErrorText)
    }

    const educationChildren = [], experienceChildren = [];
    for (let i = 0; i < numChildrenEducation; i += 1) {
        educationChildren.push(<EducationSection useDebounce={useDebounce} errorText={errorText} handleValidate={handleValidate} education={education} setEducation={setEducation} key={i} number={i} />);
    };
    for (let i = 0; i < numChildrenExperience; i += 1) {
        experienceChildren.push(<ExperienceSection useDebounce={useDebounce} errorText={errorText} handleValidate={handleValidate} experience={experience} setExperience={setExperience} key={i} number={i} />);
    };
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
                                <TextField id="name" error={errorText.name ? true : false} helperText={errorText.name} value={name} required onInput={e => handleValidate(e, 'name', setName)} label="Name" variant="filled" />
                                <TextField id="address" error={errorText.addres ? true : false} helperText={errorText.address} label="Address" required variant="filled" value={address} onInput={e => handleValidate(e, 'address', setAddress)} />
                                <TextField id="phone" error={errorText.phone ? true : false} helperText={errorText.phone} label="Phone" required type='phone' variant="filled" value={phone} onInput={e => handleValidate(e, 'phone', setPhone)} />
                                <TextField id="email" error={errorText.email ? true : false} helperText={errorText.email} label="Email" type='email' variant="filled" required value={email} onInput={e => handleValidate(e, 'email', setEmail)} />
                                <TextField id="website" error={errorText.website ? true : false} helperText={errorText.website} label="Website" required variant="filled" value={website} onInput={e => handleValidate(e, 'website', setWebsite)} />
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
                    <img width='300px' style={{ marginRight: '20px' }} src='./candidate.png' alt='job' />
                    <div>
                        <PDFViewer width="800" height="600" >
                            <PdfDocument data={info} />
                        </PDFViewer>
                    </div>
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
    const [timeEnd, setTimeEnd] = useState('05/11/2021');
    const { education, number, setEducation, handleValidate, errorText } = props;
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
        let found = newEducation.findIndex(ele => ele.id === number);
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
            <TextField value={school} error={errorText[`school${number}`] ? true : false} helperText={errorText[`school${number}`]} required onInput={e => handleValidate(e, `school${number}`, setSchool)} label="School" variant="filled" />
            <TextField value={major} error={errorText[`major${number}`] ? true : false} helperText={errorText[`major${number}`]} required onInput={e => handleValidate(e, `major${number}`, setMajor)} label="Major" variant="filled" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label='Start'
                    value={timeStart}
                    views={['day', 'month', 'year']}
                    onChange={(newValue) => {
                        setTimeStart(newValue);
                    }}
                    format="DD/MM/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label='End'
                    value={timeEnd}
                    views={['day', 'month', 'year']}
                    onChange={(newValue) => {
                        setTimeEnd(newValue);
                    }}
                    format="DD/MM/YYYY"
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
    const { experience, number, setExperience, errorText, handleValidate } = props;
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
            <TextField value={company} error={errorText[`company${number}`] ? true : false} helperText={errorText[`company${number}`]} required onInput={e => handleValidate(e, `company${number}`, setCompany)} label="Company" variant="filled" />
            <TextField value={position} error={errorText[`position${number}`] ? true : false} helperText={errorText[`position${number}`]} required onInput={e => handleValidate(e, `position${number}`, setPosition)} label="Position" variant="filled" />
            <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label='Start'
                    value={timeJobStart}
                    views={['day', 'month', 'year']}
                    format="DD/MM/YYYY"
                    onChange={(newValue) => {
                        setTimeJobStart(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                <DatePicker
                    label='End'
                    value={timeJobEnd}
                    views={['day', 'month', 'year']}
                    onChange={(newValue) => {
                        setTimeJobEnd(newValue);
                    }}
                    format="DD/MM/YYYY"
                    renderInput={(params) => <TextField {...params} />}
                />
            </LocalizationProvider>
            <Box sx={{ m: 1 }}>
                <TextField value={description} onInput={(e) => setDescription(e.target.value)} style={{ width: '66%' }} multiline rows={5} label="Description" variant="filled" />
            </Box>
        </Box>
    )
};
export default CV;
import React from "react";
import {
  Box,
  Typography,
  Grid,
  withStyles,
  Card,
  CardContent,
  ListItemIcon,
  ListItemText,
  ListItem,
  Button
} from "@material-ui/core";
import PeopleIcon from "@material-ui/icons/People";
import EditLocationIcon from "@material-ui/icons/EditLocation";
import ScheduleIcon from "@material-ui/icons/Schedule";
import DateRangeIcon from "@material-ui/icons/DateRange";
import Backdrop from '@mui/material/Backdrop';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import { Link } from "react-router-dom";
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
const styleLink = {
  textDecoration: "none"
};
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};
const Jobdetail = (props) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    id,
    title,
    levels,
    categories,
    company,
    address,
    description,
    date
  } = props
  return (
    <div>
      <Box mx="auto" width="80vw" className={props.classes.box}>
        <Grid
          spacing={3}
          container
          direction="row"
          alignItems="flex-start"
        >
          <Grid item xs={4}>
            <img src='../../hiring.png' alt='Nothing' width="300px" />
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

          </Grid>
          <Grid item xs={8}>
            <Box>
              <Typography variant="h5">{title}</Typography>
              <Button
                variant="contained"
                color="secondary"
                className={props.classes.apply}
                onClick={handleOpen}
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
        </Grid><Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          onClose={handleClose}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Do you have CV?
              </Typography>
              <Typography id="transition-modal-description" sx={{ mt: 2 }}>
                <Link style={styleLink} to="/cv">
                  Click here to create personal CV!
                </Link>
                <p>If you are ready, please send email to apply this job <a href="mailto:xuanyenbentre@gmail.com" target="_top">Send mail</a></p>
              </Typography>
            </Box>
          </Fade>
        </Modal>
      </Box>
      )
    </div>
  );
}
export default withStyles(styles, { name: "Jobdetail" })(Jobdetail);

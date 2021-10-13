import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  CardMedia,
  CardActionArea,
  Typography,
  CardContent,
  Grid,
  Box,
  Rating
} from "@mui/material";
import { Link } from "react-router-dom";
import FormatQuoteIcon from "@material-ui/icons/FormatQuote";
const useStyles = makeStyles({
  root: {
    padding: "2rem"
  },
  media: {
    "& img": {
      objectFit: "contain"
    }
  },
  text: {
    textAlign: "left",
    "& a": {
      color: "black",
      textDecoration: "unset"
    }
  },
  rating: {
    textAlign: 'center'
  },
});

export default function Company(props) {
  const classes = useStyles();
  const { id, name, logo_image, description } = props;
  return (
    <Box width="60vw" mx="auto" boxShadow={3}>
      <Grid container spacing={3} className={classes.root}>
        <Grid item xs={4}>
          <Typography gutterBottom variant="h5" className={classes.text}>
            <Link to={`company/${id}`}>
              #{id} {name}
            </Link>
          </Typography>
          <CardActionArea className={classes.media}>
            <CardMedia
              component="img"
              alt="Contemplative Reptile"
              image={logo_image}
              title="Contemplative Reptile"
              height="140"
            />
          </CardActionArea>
        </Grid>
        <Grid item xs={8}>
          <CardContent>
            <div className={classes.rating}>
              <Rating
                name="half-rating-read"
                defaultValue={5}
                precision={1}
                readOnly
              />
            </div>
            <Typography variant="body2" color="textSecondary" component="p">
              <FormatQuoteIcon />
              {description}
            </Typography>
          </CardContent>
        </Grid>
      </Grid>
    </Box>
  );
}

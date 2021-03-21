import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import { Link as RouterLink } from "react-router-dom";

const EYES_IMG =
  "https://gateway.pinata.cloud/ipfs/QmVjcvBkiVzJpfWpiqzfjeepZPKQv8v5VbXjU7Cz8HkjCW";

const useStyles = makeStyles((theme) => ({
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,.3)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
function Hero() {
  const classes = useStyles();

  return (
    <Container style={{ height: "50vh" }}>
      <Paper
        className={classes.mainFeaturedPost}
        style={{
          backgroundImage: `url(${EYES_IMG}`,
        }}
      >
        {/* Increase the priority of the hero background image */}
        {<img style={{ display: "none" }} src={EYES_IMG} alt={"Monet"} />}
        <div className={classes.overlay} />
        <Grid container>
          <Grid item md={6}>
            <div className={classes.mainFeaturedPostContent}>
              <Typography
                component="h1"
                variant="h3"
                color="inherit"
                gutterBottom
              >
                {"You are art."}
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                {"Turn your photo into a unique NFT"}
              </Typography>
              <Button
                component={RouterLink}
                to={"/canvas"}
                color="primary"
                variant="contained"
                size="medium"
                className={classes.link}
              >
                Show Me
              </Button>
            </div>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}

export default Hero;

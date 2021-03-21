import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Hero from "../../components/Hero";
import Header from "../../components/Header";
import { Grid, Container, Typography } from "@material-ui/core";
import img1 from "./../../static/child-with-ball.jpg";
import img2 from "./../../static/child-with-ball-art.jpeg";

const useStyles = makeStyles((theme) => ({
  mainTitle: {
    margin: "48px 0 24px",
  },
  mainText: {
    margin: "12px 0",
  },
  container: {
    margin: "30px 0",
  },
  img: {
    maxHeight: "300px",
    maxwidth: "100%",
  },
  stepDescription: {
    height: "70px",
    margin: "24px 0",
    display: "flex",
    alignItems: "center",
    justifyContent: "end",
  },
  stepIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    height: "70px",
    margin: "24px 0",
    padding: "0 12px",
  },
}));

function About() {
  const classes = useStyles();

  return (
    <>
      <Header
        title={"About"}
        text1={`NFT & Me 🎨  allows users to create artistic NFTs from their personal photos.`}
      />
      <Container>
        <Grid container className={classes.container}>
          <Grid item md={6} className={classes.mainTitle}>
            <Typography variant="h3">
              Just for existing, you are art.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item md={8}>
            <Typography>
              Users upload their photo and press a button. It is as simple as
              that. Behind the scenes the program uses machine algorithm to
              style the picture, save it in a decentralized storage system such
              as IPFS and create an NFT for it.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item>
            <img className={classes.img} src={img1} alt="Unstyle" />
          </Grid>
          <Grid item>
            <img className={classes.img} src={img2} alt="Unstyle" />
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item md={8}>
            <Typography>
              From it, one is able to show it to friends and family, give it as
              present, save it in their wallet for future purposes, in short,
              whatever the user feels like.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item md={8}>
            <Typography>
              The end goal here is to put a smile on people's faces. They are
              art and as living pieces of art they too are entitled to be an NFT
              and be immortalized in the annals of blockchain technology. This
              is a fun project and serves entertainment purposes.
            </Typography>
          </Grid>
        </Grid>
        <Grid container className={classes.container} justify="center">
          <Grid item md={8}>
            <Typography>
              I hope you like it as much as it was enjoyable for me to build it.
            </Typography>
          </Grid>
        </Grid>
        <Container justify="center">
          <Grid container className={classes.container}></Grid>
        </Container>
      </Container>
      <Hero />
    </>
  );
}

export default About;

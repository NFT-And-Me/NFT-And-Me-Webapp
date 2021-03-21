import React from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { Container, Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import CarouselShowcase from "../../components/Carousel";

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
  carousel: {
    height: "500px",
    width: "70vw",
    img: {
      maxheight: "300px",
      maxWidth: "500px",
    },
  },
}));
function Showcase() {
  const classes = useStyles();
  return (
    <>
      <Header
        title={"Exhibit"}
        text1={"Some examples of photos that have stylized and become and NFT."}
      />
      <Container>
        <Grid container className={classes.container}>
          <Grid item md={6}>
            <Typography variant={"h3"} className={classes.mainTitle}>
              Users' NFTs
            </Typography>
            <Typography variant={"body1"} className={classes.mainTitle}>
              Scroll sideways to see some amazing stylized pics that became
              NFTs.
            </Typography>
          </Grid>
        </Grid>
        <Container justify="center">
          <CarouselShowcase />
        </Container>
        <Container justify="center">
          <Grid container className={classes.container}></Grid>
        </Container>
      </Container>
      <Hero />
    </>
  );
}

export default Showcase;

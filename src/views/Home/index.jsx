import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Hero from "../../components/Hero";
import { CssBaseline } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";

import photo1 from "../../static/styledPhoto1.jpeg";
import photo2 from "../../static/styledPhoto2.jpeg";
import photo3 from "../../static/styledPhoto3.jpeg";

const useStyles = makeStyles((theme) => ({
  howItWorks: {
    background: "#bbdefb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100vw",
    height: "200px",
  },
  h3: {
    marginTop: theme.spacing(3),
  },
  card: {
    margin: theme.spacing(2),
  },
  media: {
    height: 180,
    cursor: "auto",
  },
}));
function Home() {
  const classes = useStyles();
  return (
    <>
      <Hero />
      <CssBaseline />
      <Container maxWidth="lg">
        <Grid container alignItems="center" justify="center">
          <Grid item xs={12}>
            <Typography variant={"h3"} className={classes.h3}>
              How it works
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={photo1}
                  title="Photo 1"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    1.Add your wallet address
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    Add an Ethereum address or connect it via Metamask.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={"/showcase"}
                >
                  Showcase
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={photo2}
                  title="Photo 2"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    2. Upload your picture
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    We take your photo and add some artistic styles to it.
                  </Typography>
                </CardContent>
              </CardActionArea>
              <CardActions>
                {/* <Button
                  size="small"
                  color="primary"
                  component={Link}
                  to={"/about"}
                >
                  About
                </Button> */}
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={4}>
            <Card className={classes.card}>
              <CardActionArea>
                <CardMedia
                  className={classes.media}
                  image={photo3}
                  title="Photo 3"
                />
                <CardContent>
                  <Typography gutterBottom variant="h5" component="h2">
                    3. Receive an NFT!
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    component="p"
                  >
                    It may take a couple of minutes but your NFT goes directly
                    to your ETH address.
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
          <Button size="small" color="primary" component={Link} to={"/canvas"}>
            TRY NOW
          </Button>
        </Grid>
      </Container>
    </>
  );
}

export default Home;

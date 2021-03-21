import React, { useState, useEffect } from "react";
import PickAddress from "./PickAddress";
import UploadPhoto from "./UploadPhoto";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Stepper from "@material-ui/core/Stepper";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/StepLabel";
import Button from "@material-ui/core/Button";
import StyledPhoto from "./StyledPhoto";
import ProgressBar from "./ProgressBar";
import { ethers } from "ethers";

import {
  TwitterShareButton,
  FacebookShareButton,
  TwitterIcon,
  FacebookIcon,
} from "react-share";

import api from "./apiWs";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  backButton: {
    marginRight: theme.spacing(1),
  },
  instructions: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    margin: "12px 0",
    padding: "12px",
    minHeight: "200px",
  },
  warningMessage: {
    color: "red",
  },
  shareImage: {
    maxWidth: "100%",
    maxHeight: "400px",
  },
}));

// These are the steps to be shown in the stepper
function getSteps() {
  return ["Pick a style to apply", "Upload your image", "Become an artist"];
}

function Canvas() {
  // Styles Hook
  const classes = useStyles();
  // Local State
  const [userAddress, setUserAddress] = useState("");
  const [picture, setPicture] = useState(null);
  const [styledPicture, setStyledPicture] = useState({
    id: undefined,
    img: null,
    targetImg: null,
  });

  const [message, setMessage] = useState("");
  const [etherScanUrl, setEtherScanUrl] = useState("");
  const [completed, setCompleted] = useState(0);
  const [activeStep, setActiveStep] = React.useState(0);

  useEffect(() => {
    const onProgress = (data) => {
      if (!data) return;
      const {
        progress = "0",
        decentralizeStorageUrl,
        originalPhotoUrl,
        _id,
        etherscanTxUrl,
      } = data;

      console.log(`Image Uploading: ${progress}%`);
      setCompleted(Number(progress));

      if (etherscanTxUrl) {
        setEtherScanUrl(etherscanTxUrl);
      }

      if (progress === "100" && decentralizeStorageUrl) {
        setStyledPicture({
          id: _id,
          img: decentralizeStorageUrl,
          targetImg: originalPhotoUrl,
        });
      }
    };

    api.on("created", onProgress);

    const onUnmountHandler = async () => {
      api.removeListener("created", onProgress);
      window.removeEventListener("beforeunload", this);
    };
    window.addEventListener("beforeunload", onUnmountHandler);
    return () => onUnmountHandler.bind(onUnmountHandler)();
  });

  // OnChange Controllers for Local State
  const handleUserAddressChange = (event) => {
    const value = event.target.value;

    if (ethers.utils.isAddress(value)) {
      setUserAddress(value);
      setMessage("");
    } else {
      setMessage(
        "Incorrect Ethereum address. Please press the back button and input a correct one"
      );
    }
  };

  const onDrop = (pictureFile) => {
    const reader = new FileReader();
    const file = pictureFile[0];

    const getFileExtension = (file) => {
      const splitName = file.name.split(".");
      return splitName[splitName.length - 1]; // last element should be file extension
    };

    reader.onloadend = async () => {
      setPicture({ uri: reader.result, fileExtension: getFileExtension(file) });
    };
    file && reader.readAsDataURL(file);
  };

  // Send Photo to back
  const submitPhoto = async (userAddress, picture) => {
    setMessage("");
    try {
      api.timeout = 300000; // 5 min
      await api.create({
        userAddress,
        uri: picture.uri,
        fileExtension: picture.fileExtension,
      });
    } catch (e) {
      if (e.message === "request entity too large") {
        setMessage("Unable to upload. Image is too large");
      } else {
        setMessage(e.message);
      }
      setActiveStep(activeStep); // continue on current step
      console.log(e.message);
    }
  };

  // Stepper Component
  // This is the content on each step
  function getStepContent(stepIndex) {
    switch (stepIndex) {
      case 0:
        return (
          <>
            {" "}
            <PickAddress
              style={classes}
              userAddress={userAddress}
              handleUserAddressChange={handleUserAddressChange}
              setUserAddress={setUserAddress}
              setMessage={setMessage}
            />
          </>
        );
      case 1:
        return (
          <>
            {" "}
            <Grid
              container
              className={classes.warningMessage}
              item
              xs={12}
              alignItems={"center"}
            >
              <Typography variant={"h6"} align="center">
                {message}
              </Typography>
            </Grid>
            <UploadPhoto onDrop={onDrop} />
          </>
        );
      case 2:
        return (
          <>
            <ProgressBar completed={completed} />
            {etherScanUrl && (
              <Typography variant={"h6"}>
                Your NFT is about to be minted! You may follow the transaction
                here:{" "}
                <a href={etherScanUrl} rel="noreferrer" target="_blank">
                  {etherScanUrl}
                </a>
              </Typography>
            )}
            <StyledPhoto styledPicture={styledPicture} />
          </>
        );
      default:
        return "Unknown stepIndex";
    }
  }

  const steps = getSteps();
  const handleNext = () => {
    setActiveStep((prevActiveStep) => {
      if (prevActiveStep + 1 === 2) {
        // console.log("step 2 to step 3");
        submitPhoto(userAddress, picture);
      }
      return prevActiveStep + 1;
    });
  };
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  const handleReset = () => {
    setPicture(null);
    setStyledPicture({
      id: undefined,
      img: null,
      targetImg: null,
    });
    setActiveStep(0);
  };

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          <Grid item md={12}>
            <div className={classes.root}>
              <Paper>
                <Stepper activeStep={activeStep} alternativeLabel>
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Paper>
              <div>
                {activeStep === steps.length ? (
                  <Paper className={classes.paper}>
                    <Grid item xs={6} style={{ textAlign: "center" }}>
                      {etherScanUrl && (
                        <Typography variant={"h6"} align="center">
                          Blockchain transaction:{" "}
                          <a
                            href={etherScanUrl}
                            rel="noreferrer"
                            target="_blank"
                          >
                            {etherScanUrl}
                          </a>
                        </Typography>
                      )}
                    </Grid>

                    <Grid item xs={6} style={{ textAlign: "center" }}>
                      <img
                        className={classes.shareImage}
                        src={styledPicture.img ? styledPicture.img : null}
                        alt="Styled shot"
                      />
                    </Grid>
                    <Grid item xs={6}>
                      <TwitterShareButton
                        title={`NFT & Me 🎨. A piece by me turned NFT. Go to https://nftand.me/`}
                        via="NFT & Me"
                        hashtags="NFT"
                        url={styledPicture.img}
                      >
                        <TwitterIcon size={32} round />
                      </TwitterShareButton>
                      <FacebookShareButton
                        url={styledPicture.img}
                        quote={`NFT & Me 🎨. A piece by me turned NFT. Go to https://nftand.me/`}
                      >
                        {" "}
                        <FacebookIcon size={32} round />
                      </FacebookShareButton>
                      <Typography className={classes.instructions}>
                        Don't forget to share!
                      </Typography>
                      <Button variant={"outlined"} onClick={handleReset}>
                        Try again
                      </Button>
                    </Grid>
                  </Paper>
                ) : (
                  <Grid
                    container
                    style={{ height: "100%", textAlign: "center" }}
                  >
                    {getStepContent(activeStep)}
                    <Grid
                      item
                      xs={12}
                      style={{ height: "100%", textAlign: "center" }}
                    >
                      <Button
                        disabled={activeStep === 0}
                        onClick={handleBack}
                        className={classes.backButton}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={handleNext}
                      >
                        {activeStep === steps.length - 1
                          ? "Almost There"
                          : "Next"}
                      </Button>
                    </Grid>
                  </Grid>
                )}
              </div>
            </div>
          </Grid>
        </Grid>

        <Grid container spacing={3}></Grid>
      </Container>
    </>
  );
}

export default Canvas;

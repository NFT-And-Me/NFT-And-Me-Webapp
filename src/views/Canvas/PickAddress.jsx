import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import TextField from "@material-ui/core/TextField";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";

import {
  NoEthereumProviderError,
  UserRejectedRequestError as UserRejectedRequestErrorInjected,
} from "@web3-react/injected-connector";
import { useWeb3React, UnsupportedChainIdError } from "@web3-react/core";

import { useEagerConnect, useInactiveListener, injected } from "./hooks";
import { Spinner } from "./Spinner";

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
    minWidth: 100,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  paperContainer: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  paper: {
    minHeight: "100px",
    padding: theme.spacing(5),
  },
  media: {
    height: 180,
  },
  card: {
    margin: "12px",
  },
}));

const chosenConnector = { Injected: injected };

function getErrorMessage(error) {
  if (error instanceof NoEthereumProviderError) {
    return "No Ethereum browser extension detected, install MetaMask on desktop or visit from a dApp browser on mobile.";
  } else if (error instanceof UnsupportedChainIdError) {
    return "You're connected to an unsupported network. Please go to Rinkeby network";
  } else if (error instanceof UserRejectedRequestErrorInjected) {
    return "Please authorize this website to access your Ethereum account.";
  } else {
    console.error(error);
    return "An unknown error occurred. Check the console for more details.";
  }
}

function PickAddress({
  userAddress,
  handleUserAddressChange,
  setUserAddress,
  setMessage,
}) {
  const classes = useStyles();

  const [tried, setTried] = useState(false);

  const context = useWeb3React();
  const { connector, account, activate, active, error } = context;

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState();
  React.useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);

  useEffect(() => {
    injected.isAuthorized().then((isAuthorized) => {
      if (isAuthorized) {
        activate(injected, undefined, true).catch(() => {
          setTried(true);
        });
      } else {
        setTried(true);
      }
    });
  }, []); // intentionally only running on mount (make sure it's only mounted once :))

  // if the connection worked, wait until we get confirmation of that to flip the flag
  useEffect(() => {
    if (!tried && active) {
      setTried(true);
    }

    if (account) {
      setUserAddress(account);
      setMessage("");
    }
  }, [tried, active, account, setUserAddress, userAddress]);

  const currentConnector = chosenConnector;
  const activating = currentConnector === activatingConnector;
  const connected = currentConnector === connector;
  const disabled = !triedEager || !!activatingConnector || connected || !!error;

  return (
    <>
      <Grid item xs={12} className={classes.paperContainer}>
        <Paper className={classes.paper}>
          <FormControl className={classes.formControl}>
            <TextField
              label="Add ETH Address"
              id="userAddress-input"
              value={userAddress}
              onChange={handleUserAddressChange}
            ></TextField>
          </FormControl>
        </Paper>
      </Grid>
      <Grid item xs={12} className={classes.paperContainer}>
        <Typography variant={"h6"} gutterBottom>
          <span style={{ margin: "1rem" }}>Or</span>
          <Button
            variant="contained"
            size="medium"
            color="primary"
            disabled={disabled}
            onClick={() => {
              setActivatingConnector(connector);
              activate(injected);
            }}
          >
            {activating && (
              <Spinner
                color={"black"}
                style={{ height: "25%", marginLeft: "-1rem" }}
              />
            )}
            {connected && (
              <span role="img" aria-label="check">
                ✅
              </span>
            )}
            Connect
          </Button>
        </Typography>

        {!!error && (
          <h4 style={{ marginTop: "1rem", marginBottom: "0" }}>
            {getErrorMessage(error)}
          </h4>
        )}
      </Grid>

      <Grid item xs={12}>
        <Typography variant={"h6"} gutterBottom>
          {userAddress}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant={"h6"} gutterBottom>
          This address will receive your artistic photo turned into NFT
        </Typography>
      </Grid>
    </>
  );
}

export default PickAddress;

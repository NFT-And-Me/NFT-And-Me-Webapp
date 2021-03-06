import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Home from "./views/Home";
import Canvas from "./views/Canvas";
import Showcase from "./views/Showcase";
import About from "./views/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import { Web3ReactProvider } from '@web3-react/core'
import { Web3Provider } from '@ethersproject/providers'

function getLibrary(provider) {
  const library = new Web3Provider(provider)
  library.pollingInterval = 12000
  return library
}

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/canvas">
          <Web3ReactProvider getLibrary={getLibrary}>
          <Canvas />
          </Web3ReactProvider>
        </Route>
        <Route path="/showcase">
          <Showcase />
        </Route>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="*">
          <h1>Not found</h1>
        </Route>
      </Switch>
      <Footer />
    </Router>
  );
}

export default App;

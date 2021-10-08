import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, HashRouter, Switch, Route } from 'react-router-dom';
import store from './store';
import MainRoute from './route/MainRoute';
import {makeStyles} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  }
}));



const App = () => {
  const classes = useStyles();
  return (
    <Provider store={store}>
      <div className={classes.root}>
        <Router>
        <MainRoute />
        </Router>
      </div>
    </Provider>
  );
}

export default App;

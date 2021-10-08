import React from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, HashRouter, Switch, Route, useRouteMatch, Redirect } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';
import ProductPage from '../components/pages/ProductPage'

const AppRoute = () => {

  const { autorizado } = useSelector(state => state.LoginReducer);
  const isAuth = autorizado;


  return (
    <>
      <Switch>
        <ProtectedRoute path='/App/Common/Productos' component={ProductPage} isAuth={isAuth} />
      </Switch>
    </>
  )
}

export default AppRoute;
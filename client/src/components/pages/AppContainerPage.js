import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {logout} from '../../actions/LoginActions';
import { Drawer, AppBar, Toolbar, List, ListItemIcon, Grid, Divider, CssBaseline, ListItem, ListItemText, Button } from '@material-ui/core'
// eslint-disable-next-line no-unused-vars
import { BrowserRouter as Router, useRouteMatch, Switch, Route, Link, Redirect, useHistory, useLocation } from 'react-router-dom';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import AppRoute from '../../route/AppRoute';
import AccountBoxIcon from '@material-ui/icons/AccountBox';
import '../../themes/Nav.css';


const AppContainerPage = () => {
    const { usuario } = useSelector((state) => state.LoginReducer);

    const histories = useHistory();
    const dispatch = useDispatch();

    let { url } = useRouteMatch();

    
    const logOut = () => {
        sessionStorage.removeItem('USER_COMERCE');
        dispatch(logout());
        histories.push("/Login");
      }


    return (
        <div className="root">
            <CssBaseline />
            <AppBar >
                <Toolbar className='NavBarTransaccion'>
                    <Grid justify="space-between" container>
                        <Grid item>
                           
                        </Grid>
                        <Grid item>
                            <Button
                                startIcon={<AccountBoxIcon />}
                                onClick={logOut}
                            >
                                 {`Hola ${usuario.user.name}`}
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            <Drawer variant="permanent" className='drawer'>
                <Grid container className='rootNav'>
                    <Grid item xs={12} md={12}>
                        <h4 className='titleSistema'>
                            Challenge
                         </h4>
                    </Grid>
                    <Grid item xs={12} md={12}>
                        <List>
                            <ListItem button component={Link} to={`${url}/Productos`} >
                                <ListItemIcon ><AccountBalanceIcon className='icono' /></ListItemIcon>
                                <ListItemText className='titleLink' primary="Productos" />
                            </ListItem>
                        </List>
                    </Grid>
                    <Divider className='divider' />
                    <Grid item xs={12} md={12}>
                        <List>
                            <label className='label'>COMPRA/VENTA</label>
                            <ListItem button component={Link} to={'/compras'}  >
                                <ListItemIcon ><AttachMoneyIcon className='icono' /></ListItemIcon>
                                <ListItemText className='titleLink' primary="Compras" />
                            </ListItem>
                        </List>
                    </Grid>
                </Grid>
            </Drawer>
            <main className='content'>
                <div className="toolbar" />
                <Grid container>
                    <AppRoute />
                </Grid>
            </main>

        </div>
    );
}

export default AppContainerPage;
import * as React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {editSelectProducto,deleteProducto} from '../../../actions/ProductAction';
import MUIDataTable from "mui-datatables";
import { Grid} from '@material-ui/core';
import CustomToolBar from './CustomToolbar';
import CustomEdit from './CustomEdit';
import CustomDelete from './CustomDelete';



const TablaChequeVenta = () => {
    const dispatch = useDispatch();
    const { productos } = useSelector((state) => state.ProductsReducer);

    const options = {
        selectableRows: 'none',
        download: false,
        search: true,
        print: false,
        filter: true,
        confirmFilters: false,
        viewColumns: false,
        pagination: false,
        enableNestedDataAccess: '.',
        customToolbar: () => {
            return (
                <CustomToolBar />
            );
        },
    };


    const columns = [
        {
            name: "name",
            label: "Nombre",
            options: {
                filter: true,
                sort: true,

            }
        },
        {
            name: "price",
            label: "Precio",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            label: "Stock",
            name: 'stock',
            options: {
                filter: false,
                sort: true,
                customBodyRender: (value) => (value) ? value : "-",
            }
        },
       
        {
            name: "_id",
            label:' ',
            options: {
                filter: false,
                sort: false,
                display: true,
                viewColumns: true,
                customBodyRender: (value) => <CustomEdit accion={()=>{dispatch(editSelectProducto(value))}} />,
            }
        },
        {
            name: "_id",
            label:' ',
            options: {
                filter: false,
                sort: false,
                display: true,
                viewColumns: true,
                customBodyRender: (value) => <CustomDelete accion={()=>{dispatch(deleteProducto(value))}} />,
            }
        },


    ];



    return (
        <Grid container>
            <Grid item xs={12}>
                <MUIDataTable
                    data={productos}
                    columns={columns}
                    options={options}
                    title={"Productos"}
                />
            </Grid>
        </Grid>
    );
}

export default TablaChequeVenta;

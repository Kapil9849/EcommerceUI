import React from 'react';
import './Admin.css';
import { Button } from 'primereact/button';
import ManageUsers from './ManageUsers';
import { Outlet, useNavigate } from 'react-router-dom';
        
export default function Admin() {
    const navigate = useNavigate();
    return (
        <div className="container mt-5 AdminComponent">
            <div className="box">

            <h1 className="text-center">Welcome to Admin Dashboard</h1>
            <p className="text-center">Manage your store efficiently!</p>
            </div>
            <div className="row mt-5">
                <div className="col-md-3 col-sm-3">
                    <Button label='View Users' onClick={()=>{navigate("/admin/users")}}></Button>
                </div>
                <div className="col-md-3">
                    <Button label='View Products'></Button>

                </div>
                <div className="col-md-3">
                    <Button label='View Sellers'></Button>

                </div>
                <div className="col-md-3">
                    <Button label='View Orders'></Button>

                </div>
            </div>
            <div className="row mt-5">
                <Outlet></Outlet>
            </div>

        </div>
    );
}
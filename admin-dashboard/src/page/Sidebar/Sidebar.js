import { NavLink } from 'react-router-dom';

import config from '../../configRoute';
import Button from '../../component/Button/Button';
import './Sidebar.css';
import { useState } from 'react';
const Siderbar = () => {
    const handleCLick = () => {
        // alert('okok');
    };
    return (
        <div className="containerSidbar">
            <NavLink to={config.routes.user} style={{ textDecoration: 'none' }}>
                <Button title="User" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.category} style={{ textDecoration: 'none' }}>
                <Button title="Category" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.product} style={{ textDecoration: 'none' }}>
                <Button title="Product" onClick={handleCLick} />
            </NavLink>

            <NavLink to={config.routes.cart} style={{ textDecoration: 'none' }}>
                <Button title="Cart" onClick={handleCLick} />
            </NavLink>
            <NavLink to={config.routes.listorder} style={{ textDecoration: 'none' }}>
                <Button title="Order" onClick={handleCLick} />
            </NavLink>
        </div>
    );
};

export default Siderbar;

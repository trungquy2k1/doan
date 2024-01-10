import { NavLink } from 'react-router-dom';
import React, { useState, useEffect } from 'react';

// import config from '../../../../configRoute';
import '../../page/admin/style/style.css';

// const TopContainer = (props) => {
const TopContainer = (props) => {
    return (
        <div className="adminhead">
            <h2>Product</h2>
            <div style={{ display: 'flex' }}>
                <input placeholder="Search" value={props.value} onChange={props.onChange} />
                <button className="btnsearch" onClick={props.onClick}>
                    Search
                </button>
            </div>
            <NavLink to={props.to}>
                <button className="btnsearch">Thêm</button>
            </NavLink>
        </div>
    );
};
export default TopContainer;

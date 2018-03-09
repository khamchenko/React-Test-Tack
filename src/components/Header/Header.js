import React, { Component } from 'react';
import './Header.scss';
import LogoStackoverflow from '../picture/Stack_Overflow_logo.png'

const Header = () => (
    <header className="header">
        <img className="logo" src={LogoStackoverflow} alt=''/>
        <div className="title">React Posts</div>
    </header>
);

export default Header;

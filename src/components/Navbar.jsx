import React from 'react';
import { Link } from 'react-router-dom';
import logo from '/public/vite.svg';

const Navbar = () => {
    return (
        <nav className="bg-white p-4 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center space-x-2">
                    <img src={logo} alt="MindScribe" className="h-8 w-8" />
                    <span className="text-xl font-bold text-gray-800">MindScribe</span>
                </Link>
                <div className="text-gray-800">
                    <span>Hi, User</span>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
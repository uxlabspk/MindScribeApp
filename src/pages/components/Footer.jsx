import React from 'react';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="bg-gray-600 text-white p-4 mt-auto">
            <div className="container mx-auto text-center">
                <p>© {currentYear} MindScribe, Inc</p>
            </div>
        </footer>
    );
};

export default Footer;
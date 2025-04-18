import { Link } from 'react-router-dom';
import logo from '/logo.png';

const Navbar = () => {
    return (
        <nav className="bg-white py-4 shadow-sm">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="flex items-center justify-between space-x-2">
                    <img src={logo} alt="MindScribe" className="h-12 w-10" />
                    <span className="text-2xl mb-1 text-gray-800">MindScribe</span>
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
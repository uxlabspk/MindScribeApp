import {Link} from "react-router-dom";


function PrimaryButton({ text, to }) {
    return (
        <Link
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center"
            to={to}
        >
            {text}
        </Link>
    )
}


export default PrimaryButton;
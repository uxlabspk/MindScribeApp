import React from 'react';

const JournalCard = ({ id, title, description, image, onDelete }) => {
    return (
        <div className="mx-5 bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <img
                    src={image}
                    alt={title}
                    className="w-16 h-16 rounded-md object-cover"
                />
                <div className="flex-grow">
                    <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                    <p className="text-gray-600">{description}</p>
                </div>
                <div className="flex space-x-2">
                    <button className="text-gray-500 hover:text-blue-500 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>
                    <button
                        className="text-gray-500 hover:text-red-500 p-2"
                        onClick={() => onDelete(id)}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalCard;
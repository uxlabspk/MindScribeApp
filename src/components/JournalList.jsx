import React, { useState } from 'react';
import JournalCard from './JournalCard.jsx';
import placeholderImage from '/public/vite.svg';

const JournalList = () => {
    const [journals, setJournals] = useState([
        { id: 1, title: 'Title', description: 'Description', image: placeholderImage },
        { id: 2, title: 'Title', description: 'Description', image: placeholderImage },
        { id: 3, title: 'Title', description: 'Description', image: placeholderImage },
        { id: 4, title: 'Title', description: 'Description', image: placeholderImage },
    ]);

    const handleDelete = (id) => {
        setJournals(journals.filter(journal => journal.id !== id));
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">All Journal's</h1>
                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-md flex items-center">
                    <span className="mr-2">✏️</span>
                    Write
                </button>
            </div>

            <div className="space-y-4">
                {journals.map(journal => (
                    <JournalCard
                        key={journal.id}
                        id={journal.id}
                        title={journal.title}
                        description={journal.description}
                        image={journal.image}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
        </div>
    );
};

export default JournalList;
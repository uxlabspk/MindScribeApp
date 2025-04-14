import React, { useState, useEffect } from 'react';
import JournalCard from './components/JournalCard.jsx';
import notFoundImage from '/public/ic_not_found.png';
import PrimaryButton from "./components/PrimaryButton.jsx";

const JournalList = () => {
    const [journals, setJournals] = useState([]);

    // Load journals from localStorage on component mount
    useEffect(() => {
        const storedJournals = localStorage.getItem('journals');
        if (storedJournals) {
            try {
                setJournals(JSON.parse(storedJournals));
            } catch (error) {
                console.error('Error parsing journals from localStorage:', error);
                setJournals([]);
            }
        }
    }, []);

    const handleDelete = (id) => {
        // Filter out the journal to be deleted
        const updatedJournals = journals.filter(journal => journal.id !== id);

        // Update state
        setJournals(updatedJournals);

        // Update localStorage
        localStorage.setItem('journals', JSON.stringify(updatedJournals));
    };

    return (
        <div>
            <div className={'flex align-center justify-between py-6'}>
                <h1 className="text-2xl mb-1 text-gray-800">
                    All Journal's
                </h1>
                <PrimaryButton
                    text={
                        <div className={'flex align-center justify-center gap-1'}>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M9.55742 21.5574H4.75741C3.43193 21.5574 2.35741 20.4828 2.35742 19.1574L2.35751 4.75741C2.35752 3.43193 3.43204 2.35742 4.75751 2.35742H15.5578C16.8833 2.35742 17.9578 3.43194 17.9578 4.75742V9.55742M13.1576 18.2484L18.2488 13.1573L21.6429 16.5514L16.5517 21.6426H13.1576V18.2484Z"
                                    stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Write
                        </div>
                    }
                    to={'/add-journal'}
                />
            </div>


            {journals.length === 0 ? (
                <div className="text-center py-16 flex flex-col items-center gap-5">
                    <img src={notFoundImage} alt="Placeholder image" width={300} />
                    <p className="text-gray-500 mb-4">You don't have any journals yet</p>
                </div>
            ) : (
                <div>
                    {journals.map(journal => (<JournalCard
                        key={journal.id}
                        id={journal.id}
                        title={journal.title}
                        description={journal.description}
                        image={journal.image}
                        onDelete={handleDelete}
                    />))}
                </div>
            )}
        </div>
    );
};

export default JournalList;
import React, {useState} from 'react';
import JournalCard from './JournalCard.jsx';
import placeholderImage from '/public/placeholder_img.png';
import PrimaryButton from "./PrimaryButton.jsx";

const JournalList = () => {

    const [journals, setJournals] = useState([{
        id: 1,
        title: 'Title',
        description: 'Description',
        image: placeholderImage
    }, {id: 2, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 3,
        title: 'Title',
        description: 'Description',
        image: placeholderImage
    }, {id: 4, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 5,
        title: 'Title',
        description: 'Description',
        image: placeholderImage
    }, {
        id: 6, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 7, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 8, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 9, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 10, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 11, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 12, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 13, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 14, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 15, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 16, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 17, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 18, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 19, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 20, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 21, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 22, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 23, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 24, title: 'Title', description: 'Description', image: placeholderImage
    }, {id: 25, title: 'Title', description: 'Description', image: placeholderImage}, {
        id: 26, title: 'Title', description: 'Description', image: placeholderImage
    },]);

    const handleDelete = (id) => {
        setJournals(journals.filter(journal => journal.id !== id));
    };

    return (<div>
        <div className={'flex align-center justify-between py-6'}>
            <h1 className="text-2xl mb-1 text-gray-800">
                All Journal's
            </h1>
            <PrimaryButton text={
                <div className={'flex align-center justify-center gap-1'}>

                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M9.55742 21.5574H4.75741C3.43193 21.5574 2.35741 20.4828 2.35742 19.1574L2.35751 4.75741C2.35752 3.43193 3.43204 2.35742 4.75751 2.35742H15.5578C16.8833 2.35742 17.9578 3.43194 17.9578 4.75742V9.55742M13.1576 18.2484L18.2488 13.1573L21.6429 16.5514L16.5517 21.6426H13.1576V18.2484Z"
                                stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>

                    Write
                </div>
            } to={'/add-journal'} />
        </div>

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
    </div>);
};

export default JournalList;
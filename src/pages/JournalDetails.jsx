import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const JournalDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const loadJournal = () => {
            try {
                const journalId = parseInt(id); // Convert string param to number
                // Get journals from localStorage
                const journals = JSON.parse(localStorage.getItem("journals") || "[]");
                // Find the journal with the matching ID
                const journalById = journals.find(j => j.id === journalId);
                
                if (!journalById) {
                    throw new Error("Journal not found");
                }
                
                // Set form data
                setTitle(journalById.title);
                setNotes(journalById.description); // Using description as notes
                
                // If journal has an image, set it
                if (journalById.image) {
                    setImage(journalById.image);
                }
            } catch (error) {
                console.error("Error loading journal:", error);
                setError(error.message);
            }
        };
        
        loadJournal();
    }, [id]);

    const goBackHandler = () => {
        navigate("/");
    }

    if (error) {
        return (
            <div className="py-8 text-center">
                <p className="text-red-500">{error}</p>
                <button
                    onClick={() => navigate("/")}
                    className="mt-4 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Back to Journals
                </button>
            </div>
        );
    }

    return (
        <div className="py-8">
            <div className={'w-full mb-6'}>
                <button onClick={goBackHandler} className={'flex items-center justify-start gap-2'}>
                    <svg width="30px" height="30px" viewBox="0 0 1024 1024" fill="#000000" className="icon"
                         version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="M669.6 849.6c8.8 8 22.4 7.2 30.4-1.6s7.2-22.4-1.6-30.4l-309.6-280c-8-7.2-8-17.6 0-24.8l309.6-270.4c8.8-8 9.6-21.6 2.4-30.4-8-8.8-21.6-9.6-30.4-2.4L360.8 480.8c-27.2 24-28 64-0.8 88.8l309.6 280z"
                            fill=""/>
                    </svg>
                    <h2 className="text-xl">Back</h2>
                </button>
            </div>

            <div className="bg-white p-8 rounded shadow">
                {image && (
                    <div className="">
                        <img
                            src={image}
                            alt="Journal"
                            className="w-[50%] rounded-xl"
                        />
                        <h1 className={'py-5 mt-2 text-3xl'}>{title}</h1>
                        <p>{notes}</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JournalDetails;

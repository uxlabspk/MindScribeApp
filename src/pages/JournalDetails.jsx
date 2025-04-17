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
            <h2 className="text-xl font-bold mb-4">Journal Details</h2>
            <div className="bg-white p-6 rounded-lg shadow-md">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <p className="mb-4 whitespace-pre-wrap">{notes}</p>
                {image && (
                    <div className="mt-4">
                        <img 
                            src={image} 
                            alt="Journal" 
                            className="max-w-full h-auto rounded"
                        />
                    </div>
                )}
                <button
                    onClick={() => navigate("/")}
                    className="mt-6 bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded"
                >
                    Back to Journals
                </button>
            </div>
        </div>
    );
};

export default JournalDetails;

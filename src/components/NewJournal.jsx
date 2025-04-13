import React, { useState } from "react";

const NewJournal = () => {
    // State to manage form inputs
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");

    // Function to handle form submission (Save)
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Journal Saved:", { title, notes });
        // You can add logic here to save the journal entry (e.g., API call)
        setTitle(""); // Clear title input
        setNotes(""); // Clear notes input
    };

    // Function to discard changes
    const handleDiscard = () => {
        setTitle(""); // Clear title input
        setNotes(""); // Clear notes input
    };

    return (
        <div className="py-8">
            {/* Form Header */}
            <h2 className="text-xl mb-4">Add new Journal</h2>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
                {/* Title Input */}
                <div className="mb-4">
                    <label
                        htmlFor="title"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Title
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Title ..."
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-yellow-500"
                    />
                </div>

                {/* Notes Text Area */}
                <div className="mb-4">
                    <label
                        htmlFor="notes"
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Add some notes ...
                    </label>
                    <textarea
                        id="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        placeholder="Add some notes ..."
                        rows="10"
                        className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:border-yellow-500"
                    ></textarea>
                </div>

                {/* Buttons */}
                <div className="flex justify-end">
                    {/* Save Button */}
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2 flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" />
                        </svg>
                        Save
                    </button>

                    {/* Discard Button */}
                    <button
                        onClick={handleDiscard}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center"
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path d="M6.28 5.22a.75.75 0 00-.998 1.105L7.48 8H4.5a.75.75 0 000 1.5h3c0 .694.56 1.25 1.21 1.293l-1.78 1.105a1 1 0 00-.364 1.105H1.5a.75.75 0 000 1.5h5.368a1 1 0 00.364-1.105l-1.78-1.105a1.75 1.75 0 01-.447-.894H4.5a.75.75 0 000-1.5h3.28a1.75 1.75 0 01.447.894l-1.78 1.105a1 1 0 00.364 1.105H15a.75.75 0 000-1.5h-3c0-.694-.56-1.25-1.21-1.293L10.52 8H7.54a.75.75 0 000 1.5h3.28a1 1 0 00.364-1.105l-1.78-1.105a1.75 1.75 0 01-.447-.894H15a.75.75 0 000-1.5h-5.368a1 1 0 00-.364 1.105l1.78 1.105a.75.75 0 00.998-1.105l-1.78-1.105z" />
                        </svg>
                        Discard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewJournal;
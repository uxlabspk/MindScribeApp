import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NewJournal = () => {
    // State to manage form inputs
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    // Function to handle image selection
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            // Create a preview URL for the selected image
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    // Function to trigger file input click
    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    // Function to remove selected image
    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        // Reset the file input
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    // Function to convert image file to base64 for storage
    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    // Function to handle form submission (Save)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Generate a unique ID for the journal entry
            const id = Date.now();

            // Create journal object
            const journalEntry = {
                id,
                title,
                description: notes, // Map notes to description for consistency with JournalList
                image: null
            };

            // If there's an image, convert it to base64 and store it
            if (image) {
                const base64Image = await convertToBase64(image);
                journalEntry.image = base64Image;
            }

            // Get existing journals from localStorage or initialize empty array
            const existingJournals = JSON.parse(localStorage.getItem("journals") || "[]");

            // Add new journal to the array
            const updatedJournals = [journalEntry, ...existingJournals];

            // Save updated array back to localStorage
            localStorage.setItem("journals", JSON.stringify(updatedJournals));

            console.log("Journal Saved:", journalEntry);

            // Clear form after submission
            setTitle("");
            setNotes("");
            setImage(null);
            setImagePreview(null);

            // Navigate back to journal list
            navigate("/");

        } catch (error) {
            console.error("Error saving journal:", error);
            alert("Failed to save journal. Please try again.");
        }
    };

    // Function to discard changes
    const handleDiscard = () => {
        setTitle("");
        setNotes("");
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
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
                        required
                    />
                </div>

                {/* Image Upload Section */}
                <div className="mb-4">
                    <label
                        className="block text-gray-700 font-medium mb-2"
                    >
                        Add Image
                    </label>

                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImageChange}
                        accept="image/*"
                        className="hidden"
                    />

                    {!imagePreview ? (
                        <div
                            onClick={handleImageClick}
                            className="border-2 border-dashed border-gray-300 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer hover:border-yellow-500"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-12 w-12 text-gray-400"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                            </svg>
                            <p className="mt-2 text-sm text-gray-500">Click to upload an image</p>
                        </div>
                    ) : (
                        <div className="relative">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-64 object-contain border rounded-lg"
                            />
                            <button
                                type="button"
                                onClick={handleRemoveImage}
                                className="absolute top-2 right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    viewBox="0 0 20 20"
                                    fill="currentColor"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            </button>
                        </div>
                    )}
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
                        required
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
                        type="button"
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
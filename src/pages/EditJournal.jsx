import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditJournal = () => {
    // State to manage form inputs
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams(); // Get the journal ID from URL params

    // Load journal data on component mount
    useEffect(() => {
        const loadJournal = () => {
            try {
                setLoading(true);

                // Get journals from localStorage
                const journals = JSON.parse(localStorage.getItem("journals") || "[]");

                // Find the journal with the matching ID
                const journalId = parseInt(id); // Convert string param to number
                const journal = journals.find(j => j.id === journalId);

                if (!journal) {
                    throw new Error("Journal not found");
                }

                // Set form data
                setTitle(journal.title);
                setNotes(journal.description); // Using description as notes

                // If journal has an image, set it as preview
                if (journal.image) {
                    setImagePreview(journal.image);
                }

                setLoading(false);
            } catch (error) {
                console.error("Error loading journal:", error);
                setError(error.message);
                setLoading(false);
            }
        };

        loadJournal();
    }, [id]);

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

    // Function to handle form submission (Update)
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Get existing journals from localStorage
            const journals = JSON.parse(localStorage.getItem("journals") || "[]");

            // Find the index of the journal to update
            const journalId = parseInt(id);
            const journalIndex = journals.findIndex(j => j.id === journalId);

            if (journalIndex === -1) {
                throw new Error("Journal not found");
            }

            // Create updated journal object
            const updatedJournal = {
                ...journals[journalIndex], // Keep existing properties
                title,
                description: notes, // Map notes to description for consistency
            };

            // If there's a new image, convert it to base64 and store it
            if (image) {
                const base64Image = await convertToBase64(image);
                updatedJournal.image = base64Image;
            }

            // Update the journal in the array
            journals[journalIndex] = updatedJournal;

            // Save updated array back to localStorage
            localStorage.setItem("journals", JSON.stringify(journals));

            console.log("Journal Updated:", updatedJournal);

            // Navigate back to journal list
            navigate("/");

        } catch (error) {
            console.error("Error updating journal:", error);
            alert("Failed to update journal. Please try again.");
        }
    };

    // Function to cancel editing
    const handleCancel = () => {
        // Navigate back to journal list
        navigate("/");
    };

    // Show loading state
    if (loading) {
        return <div className="py-8 text-center">Loading...</div>;
    }

    // Show error state
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
            {/* Form Header */}
            <h2 className="text-xl mb-4">Edit Journal</h2>

            {/* Form Container */}
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
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
                    {/* Update Button */}
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2 flex items-center gap-2"
                    >
                        <svg width="18" height="18" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 2L9.42857 21L2 13.4" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Update
                    </button>

                    {/* Cancel Button */}
                    <button
                        type="button"
                        onClick={handleCancel}
                        className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditJournal;
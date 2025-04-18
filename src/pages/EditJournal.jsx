import React, { useState, useRef, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditJournal = () => {
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fileInputRef = useRef(null);
    const navigate = useNavigate();
    const { id } = useParams();

    useEffect(() => {
        const loadJournal = () => {
            try {
                setLoading(true);

                const journals = JSON.parse(localStorage.getItem("journals") || "[]");

                const journalId = parseInt(id);
                const journal = journals.find(j => j.id === journalId);

                if (!journal) {
                    throw new Error("Journal not found");
                }

                setTitle(journal.title)
                setNotes(journal.description)

                if (journal.image) {
                    setImagePreview(journal.image)
                }

                setLoading(false)
            } catch (error) {
                console.error("Error loading journal:", error)
                setError(error.message)
                setLoading(false)
            }
        }

        loadJournal()
    }, [id])

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (file) {
            setImage(file)
            const previewUrl = URL.createObjectURL(file)
            setImagePreview(previewUrl)
        }
    }

    const handleImageClick = () => {
        fileInputRef.current.click()
    }

    const handleRemoveImage = () => {
        setImage(null)
        setImagePreview(null)
        if (fileInputRef.current) {
            fileInputRef.current.value = ""
        }
    }

    const convertToBase64 = (file) => {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result);
            reader.onerror = (error) => reject(error);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const journals = JSON.parse(localStorage.getItem("journals") || "[]");

            const journalId = parseInt(id);
            const journalIndex = journals.findIndex(j => j.id === journalId);

            if (journalIndex === -1) {
                throw new Error("Journal not found");
            }

            const updatedJournal = {
                ...journals[journalIndex],
                title,
                description: notes,
            };

            if (image) {
                const base64Image = await convertToBase64(image);
                updatedJournal.image = base64Image;
            }

            journals[journalIndex] = updatedJournal;

            localStorage.setItem("journals", JSON.stringify(journals));

            console.log("Journal Updated:", updatedJournal);

            navigate("/");

        } catch (error) {
            console.error("Error updating journal:", error);
            alert("Failed to update journal. Please try again.");
        }
    };

    const handleCancel = () => {
        navigate("/");
    };

    if (loading) {
        return <div className="py-8 text-center">Loading...</div>;
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
            <h2 className="text-xl mb-4">Edit Journal</h2>
            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow">
                <div className="mb-4">
                    <label className="block text-gray-700 font-medium mb-2">Add Image</label>
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

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded mr-2 flex items-center gap-2"
                    >
                        <svg width="18" height="18" viewBox="0 0 30 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28 2L9.42857 21L2 13.4" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        Update
                    </button>

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
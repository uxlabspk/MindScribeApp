import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const NewJournal = () => {
    const [title, setTitle] = useState("");
    const [notes, setNotes] = useState("");
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const fileInputRef = useRef(null);
    const navigate = useNavigate();

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current.click();
    };

    const handleRemoveImage = () => {
        setImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

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
            const id = Date.now();

            const journalEntry = {
                id,
                title,
                description: notes,
                image: null
            };

            if (image) {
                const base64Image = await convertToBase64(image);
                journalEntry.image = base64Image;
            }

            const existingJournals = JSON.parse(localStorage.getItem("journals") || "[]");

            const updatedJournals = [journalEntry, ...existingJournals];

            localStorage.setItem("journals", JSON.stringify(updatedJournals));

            console.log("Journal Saved:", journalEntry);

            setTitle("");
            setNotes("");
            setImage(null);
            setImagePreview(null);

            navigate("/app/");

        } catch (error) {
            console.error("Error saving journal:", error);
            alert("Failed to save journal. Please try again.");
        }
    };

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
            <h2 className="text-xl mb-4">Add new Journal</h2>
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
                    <label htmlFor="title" className="block text-gray-700 font-medium mb-2">Title</label>
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
                            <path d="M28 2L9.42857 21L2 13.4" stroke="white" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        Save
                    </button>

                    <button
                        type="button"
                        onClick={handleDiscard}
                        className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded flex items-center gap-2"
                    >
                        <svg width="18" height="18" viewBox="0 0 22 29" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.4717 10.3587L20.0097 24.4961C19.9703 25.7069 19.4657 26.8545 18.603 27.6954C17.7403 28.5363 16.5874 29.0043 15.389 29H6.60982C5.41218 29.0043 4.25994 28.537 3.39737 27.6971C2.53481 26.8572 2.02972 25.7108 1.98918 24.5008L1.52712 10.3587C1.51701 10.049 1.62902 9.74796 1.8385 9.52175C2.04799 9.29553 2.33779 9.1627 2.64416 9.15248C2.95053 9.14226 3.24836 9.25549 3.47214 9.46725C3.69593 9.67901 3.82733 9.97196 3.83744 10.2817L4.2995 24.4226C4.32251 25.0262 4.57604 25.5974 5.00684 26.0161C5.43764 26.4348 6.01219 26.6685 6.60982 26.6681H15.389C15.9874 26.6685 16.5626 26.4342 16.9936 26.0144C17.4245 25.5947 17.6775 25.0224 17.6993 24.4179L18.1614 10.2817C18.1715 9.97196 18.3029 9.67901 18.5267 9.46725C18.7505 9.25549 19.0483 9.14226 19.3547 9.15248C19.6611 9.1627 19.9509 9.29553 20.1603 9.52175C20.3698 9.74796 20.4818 10.049 20.4717 10.3587ZM22 5.65404C22 5.96373 21.8783 6.26075 21.6617 6.47973C21.445 6.69872 21.1512 6.82174 20.8448 6.82174H1.15516C0.848792 6.82174 0.554972 6.69872 0.338338 6.47973C0.121704 6.26075 0 5.96373 0 5.65404C0 5.34435 0.121704 5.04734 0.338338 4.82835C0.554972 4.60936 0.848792 4.48634 1.15516 4.48634H4.73615C5.10216 4.48733 5.45544 4.35064 5.72725 4.10286C5.99906 3.85507 6.16995 3.51393 6.20667 3.14581C6.29191 2.28227 6.69214 1.48175 7.32936 0.900204C7.96659 0.31866 8.79517 -0.00224586 9.65366 1.18322e-05H12.3452C13.2037 -0.00224586 14.0323 0.31866 14.6695 0.900204C15.3067 1.48175 15.7069 2.28227 15.7922 3.14581C15.8289 3.51393 15.9998 3.85507 16.2716 4.10286C16.5434 4.35064 16.8967 4.48733 17.2627 4.48634H20.8437C21.1501 4.48634 21.4439 4.60936 21.6605 4.82835C21.8771 5.04734 21.9988 5.34435 21.9988 5.65404H22ZM8.21202 4.48634H13.7891C13.6373 4.13572 13.5381 3.76421 13.4946 3.38402C13.4659 3.09619 13.3327 2.82935 13.1205 2.63519C12.9084 2.44102 12.6325 2.33337 12.3463 2.33309H9.65482C9.36865 2.33337 9.09277 2.44102 8.88063 2.63519C8.6685 2.82935 8.53521 3.09619 8.50659 3.38402C8.46273 3.76427 8.36422 4.13579 8.21202 4.48634ZM9.37527 22.1782V12.2352C9.37527 11.9255 9.25356 11.6285 9.03693 11.4095C8.8203 11.1905 8.52648 11.0675 8.22011 11.0675C7.91374 11.0675 7.61992 11.1905 7.40329 11.4095C7.18666 11.6285 7.06495 11.9255 7.06495 12.2352V22.1829C7.06495 22.4926 7.18666 22.7896 7.40329 23.0086C7.61992 23.2276 7.91374 23.3506 8.22011 23.3506C8.52648 23.3506 8.8203 23.2276 9.03693 23.0086C9.25356 22.7896 9.37527 22.4926 9.37527 22.1829V22.1782ZM14.9362 22.1782V12.2352C14.9362 11.9255 14.8145 11.6285 14.5979 11.4095C14.3812 11.1905 14.0874 11.0675 13.781 11.0675C13.4747 11.0675 13.1809 11.1905 12.9642 11.4095C12.7476 11.6285 12.6259 11.9255 12.6259 12.2352V22.1829C12.6259 22.4926 12.7476 22.7896 12.9642 23.0086C13.1809 23.2276 13.4747 23.3506 13.781 23.3506C14.0874 23.3506 14.3812 23.2276 14.5979 23.0086C14.8145 22.7896 14.9362 22.4926 14.9362 22.1829V22.1782Z" fill="#ffffff"/>
                        </svg>
                        Discard
                    </button>
                </div>
            </form>
        </div>
    );
};

export default NewJournal;
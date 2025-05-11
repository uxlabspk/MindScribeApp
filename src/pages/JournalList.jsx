import React, { useState, useEffect } from "react";
import JournalCard from "./components/JournalCard.jsx";
import notFoundImage from "/ic_not_found.png";
import PrimaryButton from "./components/PrimaryButton.jsx";
import { useNavigate } from "react-router-dom";

const JournalList = () => {
  const [journals, setJournals] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const storedJournals = localStorage.getItem("journals");
    if (storedJournals) {
      try {
        setJournals(JSON.parse(storedJournals));
      } catch (error) {
        console.error("Error parsing journals from localStorage:", error);
        setJournals([]);
      }
    }
  }, []);

  const handleDeleteClick = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const confirmDelete = () => {
    const updatedJournals = journals.filter(
      (journal) => journal.id !== deleteId
    );

    setJournals(updatedJournals);

    localStorage.setItem("journals", JSON.stringify(updatedJournals));

    setShowConfirm(false);
    setDeleteId(null);
  };

  const cancelDelete = () => {
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleEdit = (id) => {
    console.log(id);
    navigate(`/app/edit-journal/${id}`);
  };

  const handleViewDetails = (id) => {
    console.log(id);
    navigate(`/app/journal/${id}`);
  };

  return (
    <div>
      <div className={"flex align-center justify-between py-6"}>
        <h1 className="text-2xl mb-1 text-gray-800">All Journal's</h1>
        <PrimaryButton
          text={
            <div className={"flex align-center justify-center gap-1"}>
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9.55742 21.5574H4.75741C3.43193 21.5574 2.35741 20.4828 2.35742 19.1574L2.35751 4.75741C2.35752 3.43193 3.43204 2.35742 4.75751 2.35742H15.5578C16.8833 2.35742 17.9578 3.43194 17.9578 4.75742V9.55742M13.1576 18.2484L18.2488 13.1573L21.6429 16.5514L16.5517 21.6426H13.1576V18.2484Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Write
            </div>
          }
          to={"/app/add-journal"}
        />
      </div>

      {journals.length === 0 ? (
        <div className="text-center py-16 flex flex-col items-center gap-5">
          <img src={notFoundImage} alt="Placeholder image" width={300} />
          <p className="text-gray-500 mb-4">You don't have any journals yet</p>
        </div>
      ) : (
        <div>
          {journals.map((journal) => (
            <JournalCard
              key={journal.id}
              id={journal.id}
              title={journal.title}
              description={journal.description}
              image={journal.image}
              onDelete={handleDeleteClick}
              onEdit={handleEdit}
              onViewDetails={handleViewDetails}
            />
          ))}
        </div>
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md sm:max-w-sm text-center">
            <h3 className="text-xl sm:text-2xl font-medium text-black mb-4">
              Confirm
            </h3>
            <p className="text-sm sm:text-base text-gray-800 mb-6">
              This action can't be reverted. Are you sure you want to proceed?
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button
                className="w-full sm:w-auto px-6 py-3 bg-yellow-500 text-white rounded-md hover:bg-yellow-600 transition-colors flex items-center justify-center"
                onClick={confirmDelete}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M5 12L10 17L20 7"
                    stroke="white"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Yes
              </button>
              <button
                className="w-full sm:w-auto px-6 py-3 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200 transition-colors flex items-center justify-center"
                onClick={cancelDelete}
              >
                <svg
                  className="w-5 h-5 mr-2"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M18 6L6 18M6 6L18 18"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JournalList;

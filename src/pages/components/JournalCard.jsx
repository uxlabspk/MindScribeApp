import React from "react";

const JournalCard = ({
  id,
  title,
  description,
  image,
  onDelete,
  onEdit,
  onViewDetails,
}) => {
  description = description.substring(0, 100);
  description += "...";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 my-4 hover:shadow-lg transition-all duration-300 border border-gray-100">
      <div className="flex flex-col md:flex-row md:space-x-5">
        {/* Image container with better aspect ratio control */}
        <div className="md:w-48 w-full h-48 md:h-auto md:flex-shrink-0 mb-4 md:mb-0 overflow-hidden rounded-lg">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Content container with flex-grow to use available space */}
        <div className="flex flex-col flex-grow justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2">{title}</h3>
            <p className="text-gray-600 text-sm md:text-base line-clamp-3 md:line-clamp-none">
              {description}
            </p>
          </div>

          <button
            onClick={() => onViewDetails(id)}
            className="mt-4 text-blue-600 font-medium text-sm inline-flex items-center group"
            aria-label={`Read more about ${title}`}
          >
            READ MORE
            <svg
              className="ml-1 w-4 h-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              ></path>
            </svg>
          </button>
        </div>

        {/* Action buttons with improved accessibility and tooltips */}
        <div className="flex md:flex-col justify-end items-center space-x-2 md:space-x-0 md:space-y-2 mt-4 md:mt-0">
          <button
            className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={() => onEdit(id)}
            aria-label={`Edit ${title}`}
            title="Edit"
          >
            <svg
              className="w-5 h-5 text-gray-600"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M18.5 2.50001C18.8978 2.10219 19.4374 1.87869 20 1.87869C20.5626 1.87869 21.1022 2.10219 21.5 2.50001C21.8978 2.89784 22.1213 3.4374 22.1213 4.00001C22.1213 4.56262 21.8978 5.10219 21.5 5.50001L12 15L8 16L9 12L18.5 2.50001Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            className="p-2 hover:bg-red-50 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500"
            onClick={() => onDelete(id)}
            aria-label={`Delete ${title}`}
            title="Delete"
          >
            <svg
              className="w-5 h-5 text-red-500"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 6H5H21"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M8 6V4C8 3.46957 8.21071 2.96086 8.58579 2.58579C8.96086 2.21071 9.46957 2 10 2H14C14.5304 2 15.0391 2.21071 15.4142 2.58579C15.7893 2.96086 16 3.46957 16 4V6M19 6V20C19 20.5304 18.7893 21.0391 18.4142 21.4142C18.0391 21.7893 17.5304 22 17 22H7C6.46957 22 5.96086 21.7893 5.58579 21.4142C5.21071 21.0391 5 20.5304 5 20V6H19Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default JournalCard;

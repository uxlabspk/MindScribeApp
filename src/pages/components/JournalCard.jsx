import React from 'react';

const JournalCard = ({ id, title, description, image, onDelete, onEdit, onViewDetails }) => {

    description = description.substring(0, 100);
    description += '...'

    return (
        <div className="bg-gray-100 rounded-lg shadow-sm p-4 my-4 hover:shadow-md transition-shadow">
            <div className="flex items-center space-x-4">
                <img
                    src={image}
                    alt={title}
                    className="w-40 rounded-md object-cover"
                />
                <div className="flex-grow">
                    <h3 className="text-xl text-gray-800">{title}</h3>
                    <p className="text-gray-600 mt-2">{description}</p>
                    <p className="text-blue-600 text-[12px] underline cursor-pointer mt-5"  onClick={ () => onViewDetails(id) } >READ MORE</p>
                </div>
                <div className="flex space-x-2">
                    <button
                        className="p-2"
                        onClick={ () => onEdit(id) }
                    >
                        <svg width="16" height="18" viewBox="0 0 29 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M4.61364 31H24.3864C25.6119 30.9964 26.7859 30.49 27.6509 29.5918C28.5159 28.6937 29.0011 27.4773 29 26.2095V15.9318C29 15.5702 28.8611 15.2233 28.6139 14.9676C28.3667 14.7119 28.0314 14.5682 27.6818 14.5682C27.3322 14.5682 26.9969 14.7119 26.7497 14.9676C26.5025 15.2233 26.3636 15.5702 26.3636 15.9318V26.2095C26.3654 26.7542 26.1582 27.2774 25.7875 27.6642C25.4168 28.051 24.9129 28.2698 24.3864 28.2727H4.61364C4.08712 28.2698 3.58322 28.051 3.21252 27.6642C2.84182 27.2774 2.63461 26.7542 2.63637 26.2095V5.79045C2.63461 5.24578 2.84182 4.72263 3.21252 4.33583C3.58322 3.94902 4.08712 3.73016 4.61364 3.72727H14.5C14.8496 3.72727 15.1849 3.5836 15.4321 3.32787C15.6793 3.07214 15.8182 2.7253 15.8182 2.36364C15.8182 2.00198 15.6793 1.65513 15.4321 1.3994C15.1849 1.14367 14.8496 1 14.5 1H4.61364C3.38813 1.00361 2.21407 1.51004 1.3491 2.40815C0.484144 3.30626 -0.00105071 4.52268 1.70851e-06 5.79045V26.2095C-0.00105071 27.4773 0.484144 28.6937 1.3491 29.5918C2.21407 30.49 3.38813 30.9964 4.61364 31Z" fill="black"/>
                            <path d="M11.9548 12.321L11.027 16.5757C10.985 16.7687 10.9921 16.9692 11.0478 17.1587C11.1035 17.3482 11.2059 17.5206 11.3456 17.66C11.4873 17.796 11.6595 17.8958 11.8479 17.9509C12.0362 18.006 12.235 18.0149 12.4275 17.9767L16.668 17.0455C16.8882 16.9971 17.0898 16.8863 17.2489 16.7264L27.9665 5.99655C28.2942 5.66857 28.5541 5.27919 28.7314 4.85064C28.9087 4.4221 29 3.96277 29 3.49891C29 3.03504 28.9087 2.57572 28.7314 2.14717C28.5541 1.71862 28.2942 1.32925 27.9665 1.00127C27.2948 0.358627 26.4014 0 25.4723 0C24.5432 0 23.6499 0.358627 22.9781 1.00127L12.277 11.7418C12.1164 11.8999 12.0045 12.101 11.9548 12.321ZM24.6409 2.66715C24.8646 2.45257 25.1625 2.33279 25.4723 2.33279C25.7821 2.33279 26.08 2.45257 26.3037 2.66715C26.5213 2.88922 26.6431 3.18786 26.6431 3.49891C26.6431 3.80996 26.5213 4.1086 26.3037 4.33067L25.4723 5.16302L23.8095 3.49832L24.6409 2.66715ZM14.175 13.1616L22.1409 5.16655L23.7872 6.82301L15.8178 14.8204L13.7069 15.2842L14.175 13.1616Z" fill="black"/>
                        </svg>
                    </button>
                    <button
                        className="p-2"
                        onClick={() => onDelete(id)}>
                        <svg width="18" height="18" viewBox="0 0 27 36" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M25.1244 12.8591L24.5573 30.409C24.509 31.912 23.8898 33.3367 22.831 34.3805C21.7722 35.4244 20.3573 36.0053 18.8865 36H8.11205C6.64222 36.0053 5.22811 35.4252 4.1695 34.3826C3.1109 33.34 2.49102 31.9168 2.44127 30.4148L1.87419 12.8591C1.86178 12.4747 1.99925 12.1009 2.25635 11.8201C2.51344 11.5393 2.86911 11.3744 3.2451 11.3617C3.6211 11.349 3.98662 11.4896 4.26127 11.7524C4.53591 12.0153 4.69717 12.379 4.70958 12.7634L5.27666 30.3177C5.3049 31.0671 5.61605 31.7761 6.14475 32.2959C6.67346 32.8157 7.37859 33.1057 8.11205 33.1052H18.8865C19.6209 33.1057 20.3269 32.8148 20.8557 32.2938C21.3846 31.7728 21.6951 31.0623 21.7219 30.3119L22.289 12.7634C22.3014 12.379 22.4627 12.0153 22.7373 11.7524C23.012 11.4896 23.3775 11.349 23.7535 11.3617C24.1295 11.3744 24.4851 11.5393 24.7422 11.8201C24.9993 12.1009 25.1368 12.4747 25.1244 12.8591ZM27 7.01881C27 7.40326 26.8506 7.77196 26.5848 8.04381C26.3189 8.31565 25.9583 8.46837 25.5823 8.46837H1.41769C1.0417 8.46837 0.681102 8.31565 0.415233 8.04381C0.149363 7.77196 0 7.40326 0 7.01881C0 6.63436 0.149363 6.26566 0.415233 5.99381C0.681102 5.72197 1.0417 5.56924 1.41769 5.56924H5.81255C6.26174 5.57048 6.69532 5.40079 7.0289 5.0932C7.36249 4.78561 7.57222 4.36212 7.61727 3.90514C7.72189 2.83317 8.21308 1.83941 8.99512 1.1175C9.77717 0.395578 10.7941 -0.00278796 11.8477 1.46883e-05H15.1509C16.2045 -0.00278796 17.2214 0.395578 18.0035 1.1175C18.7855 1.83941 19.2767 2.83317 19.3813 3.90514C19.4264 4.36212 19.6361 4.78561 19.9697 5.0932C20.3033 5.40079 20.7368 5.57048 21.186 5.56924H25.5809C25.9569 5.56924 26.3175 5.72197 26.5833 5.99381C26.8492 6.26566 26.9986 6.63436 26.9986 7.01881H27ZM10.0784 5.56924H16.923C16.7367 5.134 16.6149 4.67281 16.5615 4.20085C16.5264 3.84355 16.3628 3.51229 16.1025 3.27126C15.8421 3.03024 15.5035 2.8966 15.1523 2.89625H11.8491C11.4979 2.8966 11.1593 3.03024 10.899 3.27126C10.6386 3.51229 10.475 3.84355 10.4399 4.20085C10.3861 4.67288 10.2652 5.13408 10.0784 5.56924ZM11.506 27.5316V15.1886C11.506 14.8041 11.3566 14.4354 11.0908 14.1636C10.8249 13.8917 10.4643 13.739 10.0883 13.739C9.71232 13.739 9.35172 13.8917 9.08586 14.1636C8.81999 14.4354 8.67062 14.8041 8.67062 15.1886V27.5374C8.67062 27.9219 8.81999 28.2906 9.08586 28.5624C9.35172 28.8342 9.71232 28.987 10.0883 28.987C10.4643 28.987 10.8249 28.8342 11.0908 28.5624C11.3566 28.2906 11.506 27.9219 11.506 27.5374V27.5316ZM18.3308 27.5316V15.1886C18.3308 14.8041 18.1814 14.4354 17.9156 14.1636C17.6497 13.8917 17.2891 13.739 16.9131 13.739C16.5371 13.739 16.1765 13.8917 15.9106 14.1636C15.6448 14.4354 15.4954 14.8041 15.4954 15.1886V27.5374C15.4954 27.9219 15.6448 28.2906 15.9106 28.5624C16.1765 28.8342 16.5371 28.987 16.9131 28.987C17.2891 28.987 17.6497 28.8342 17.9156 28.5624C18.1814 28.2906 18.3308 27.9219 18.3308 27.5374V27.5316Z" fill="black"/>
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default JournalCard;

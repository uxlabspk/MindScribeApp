import React, { useState, useEffect } from "react";

const InstallPrompt = () => {
  const [installPrompt, setInstallPrompt] = useState(null);
  const [installed, setInstalled] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    window.addEventListener("beforeinstallprompt", (e) => {
      e.preventDefault();
      setInstallPrompt(e);
    });

    window.addEventListener("appinstalled", () => {
      setInstalled(true);
    });
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Optionally store in localStorage to prevent showing again
    localStorage.setItem("installPromptDismissed", "true");
  };

  if (!isVisible) return null;

  const handleInstallClick = () => {
    if (!installPrompt) return;

    installPrompt.prompt();
    installPrompt.userChoice.then((choiceResult) => {
      if (choiceResult.outcome === "accepted") {
        console.log("User accepted the install prompt");
      }
      setInstallPrompt(null);
    });
  };

  if (installed || !installPrompt) return null;

  return (
    <div className="fixed bottom-4 right-4 max-w-xs w-full sm:w-auto z-50 animate-fade-in">
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-5 rounded-xl shadow-xl border border-blue-500">
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center">
            <svg
              className="w-5 h-5 mr-2 text-blue-200"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <h3 className="font-bold text-lg">Install MindScribe</h3>
          </div>
          <button
            onClick={handleClose}
            className="text-blue-200 hover:text-white transition-colors p-1 rounded-full hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300"
            aria-label="Close install prompt"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <p className="text-blue-100 mb-4 text-sm">
          Install MindScribe for offline use and a better experience on your
          device!
        </p>

        <div className="flex space-x-2">
          <button
            onClick={handleInstallClick}
            className="flex-1 bg-white text-blue-700 px-4 py-2 rounded-lg font-medium hover:bg-blue-50 transition-colors shadow-sm flex items-center justify-center"
            aria-label="Install MindScribe"
          >
            <svg
              className="w-4 h-4 mr-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            Install Now
          </button>

          <button
            onClick={handleClose}
            className="px-4 py-2 rounded-lg border border-blue-400 text-blue-100 hover:bg-blue-500 transition-colors"
            aria-label="Remind me later"
          >
            Later
          </button>
        </div>
      </div>
    </div>
  );
};

export default InstallPrompt;

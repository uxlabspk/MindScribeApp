import React, { useState, useEffect } from 'react';

const InstallPrompt = () => {
    const [installPrompt, setInstallPrompt] = useState(null);
    const [installed, setInstalled] = useState(false);

    useEffect(() => {
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            setInstallPrompt(e);
        });

        window.addEventListener('appinstalled', () => {
            setInstalled(true);
        });
    }, []);

    const handleInstallClick = () => {
        if (!installPrompt) return;

        installPrompt.prompt();
        installPrompt.userChoice.then((choiceResult) => {
            if (choiceResult.outcome === 'accepted') {
                console.log('User accepted the install prompt');
            }
            setInstallPrompt(null);
        });
    };

    if (installed || !installPrompt) return null;

    return (
        <div className="fixed bottom-4 right-4 bg-blue-600 text-white p-4 rounded-lg shadow-lg">
            <p>Install MindScribe for offline use!</p>
            <button
                onClick={handleInstallClick}
                className="mt-2 bg-white text-blue-600 px-4 py-2 rounded"
            >
                Install
            </button>
        </div>
    );
};

export default InstallPrompt;
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './pages/components/Navbar.jsx';
import JournalList from './pages/JournalList.jsx';
import Footer from './pages/components/Footer.jsx';
import './index.css';
import NewJournal from "./pages/NewJournal.jsx";
import NotFound from "./pages/NotFound.jsx";
import EditJournal from "./pages/EditJournal.jsx";
import JournalDetails from "./pages/JournalDetails.jsx";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="container flex-grow">
                    <Routes>
                        <Route path="/" element={<JournalList />} />
                        <Route path="/add-journal" element={<NewJournal />} />
                        <Route path={'/edit-journal/:id'} element={<EditJournal />} />
                        <Route path={'/journal/:id'} element={<JournalDetails />} />

                        <Route path="/*" element={<NotFound />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
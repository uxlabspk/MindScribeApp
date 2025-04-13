import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import JournalList from './components/JournalList.jsx';
import Footer from './components/Footer.jsx';
import './index.css';
import NewJournal from "./components/NewJournal.jsx";

function App() {
    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Navbar />
                <main className="container flex-grow">
                    <Routes>
                        <Route path="/" element={<JournalList />} />
                        <Route path="/add-journal" element={<NewJournal />} />
                    </Routes>
                </main>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
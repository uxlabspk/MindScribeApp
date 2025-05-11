import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./pages/components/Navbar.jsx";
import JournalList from "./pages/JournalList.jsx";
import Footer from "./pages/components/Footer.jsx";
import "./index.css";
import NewJournal from "./pages/NewJournal.jsx";
import NotFound from "./pages/NotFound.jsx";
import EditJournal from "./pages/EditJournal.jsx";
import JournalDetails from "./pages/JournalDetails.jsx";
import InstallPrompt from "./pages/components/InstallPrompt.jsx";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="container flex-grow">
          <Routes>
            <Route path="/app/" element={<JournalList />} />
            <Route path="/app/add-journal" element={<NewJournal />} />
            <Route path={"/app/edit-journal/:id"} element={<EditJournal />} />
            <Route path={"/app/journal/:id"} element={<JournalDetails />} />

            <Route path="/app/*" element={<NotFound />} />
          </Routes>
        </main>
        <Footer />
        <InstallPrompt />
      </div>
    </Router>
  );
}

export default App;

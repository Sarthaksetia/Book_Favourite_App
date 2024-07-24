import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "@pages/Home";
import BookDetailPage from "@pages/BookDetailPage";
import { BookProvider } from "@contexts/BookContext";

import "./App.scss";

const App: React.FC = () => {
  return (
    <BookProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
        </Routes>
      </Router>
    </BookProvider>
  );
};

export default App;

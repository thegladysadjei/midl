import { Outlet } from "react-router-dom";
import { LoginPage } from './login.page'
import { SearchPage } from './search.page'
import { ResultsPage } from './results.page'
import { DetailPage } from './details.page'
import { Routes, Route } from "react-router-dom";
import React from "react";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="results" element={<Outlet />}>
        <Route index element={<ResultsPage />} />
        <Route path="detail" element={<DetailPage />} />
      </Route>
    </Routes>
  );
}

export default App;

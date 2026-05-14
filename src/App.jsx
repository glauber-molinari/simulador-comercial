import { Routes, Route } from "react-router-dom";
import Simulator from "./Simulator.jsx";
import UsoPage from "./pages/UsoPage.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Simulator />} />
      <Route path="/uso" element={<UsoPage />} />
    </Routes>
  );
}

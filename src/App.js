import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./MainPage/Home";
import KNN from "./KNN/Knn";
import Encoder from "./AutoEncoder/Autoencoder";
import Qae from "./QuantumAutoEncoder/Qae";



function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/knn" element={<KNN />} />
        <Route path="/encoder" element={<Encoder />} />
        <Route path="/Qae" element={<Qae/>}/>
      </Routes>
    </Router>
  );
}

export default App;

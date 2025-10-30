import { Link } from "react-router-dom";
import "./Home.css"; // optional for styling

function Home() {
  return (
    <div className="home-container">
      <h1 style={{color: "#f0f0f0", marginRight: "600px"}}>Welcome to AI Model Dashboard</h1>
      <p style={{color: "#f0f0f0", marginRight: "600px"}}>Select a model to test:</p>

      <div className="button-container">
        <Link to="/knn" className="nav-button">KNN Classifier</Link>
        <Link to="/encoder" className="nav-button">Autoencoder</Link>
        <Link to="/Qae" className="nav-button">QuantumAutoEncoder</Link>
      </div>
    </div>
  );
}

export default Home;

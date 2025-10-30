import { Link } from "react-router-dom";
import "./Home.css"; // optional for styling

function Home() {
  return (
    <div className="home-container">
      <h1>Welcome to AI Model Dashboard</h1>
      <p>Select a model to test:</p>

      <div className="button-container">
        <Link to="/knn" className="nav-button">KNN Classifier</Link>
        <Link to="/encoder" className="nav-button">Autoencoder</Link>
        <Link to="/Qae" className="nav-button">QuantumAutoEncoder</Link>
      </div>
    </div>
  );
}

export default Home;

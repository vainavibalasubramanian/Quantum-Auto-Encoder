import { useState } from "react";
import "./Knn.css";

function Knn() {
  const [formData, setFormData] = useState({
    src_bytes: 0,
    dst_bytes: 0,
    logged_in: 0,
    count: 0,
    srv_count: 0,
    same_srv_rate: 0,
    diff_srv_rate: 0,
    dst_host_srv_count: 0,
    dst_host_same_srv_rate: 0,
    dst_host_diff_srv_rate: 0,
    dst_host_same_src_port_rate: 0,
    dst_host_serror_rate: 0,
    protocol_type: "tcp",
    service: "http",
    flag: "SF"
  });

  const [prediction, setPrediction] = useState(null);

  // Map field names to human-friendly labels
  const fieldLabels = {
    src_bytes: "Source Bytes",
    dst_bytes: "Destination Bytes",
    logged_in: "Logged In (0 or 1)",
    count: "Connection Count",
    srv_count: "Service Count",
    same_srv_rate: "Same Service Rate",
    diff_srv_rate: "Different Service Rate",
    dst_host_srv_count: "Destination Host Service Count",
    dst_host_same_srv_rate: "Destination Host Same Service Rate",
    dst_host_diff_srv_rate: "Destination Host Different Service Rate",
    dst_host_same_src_port_rate: "Destination Host Same Source Port Rate",
    dst_host_serror_rate: "Destination Host Serror Rate"
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };
  const handleStringChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Send data to backend
  const getPrediction = async () => {
    try {
      const response = await fetch("http://localhost:8000/knn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
      setPrediction("Error connecting to backend");
    }
  };

  return (
    <div className="container">
      <h1>AI Model Prediction</h1>

      <form className="form">
        {/* Numeric Inputs with Friendly Labels */}
        {Object.keys(fieldLabels).map((field) => (
          <div key={field} className="form-group">
            <label>{fieldLabels[field]}</label>
            <input
              type="number"
              name={field}
              value={formData[field]}
              onChange={handleChange}
              placeholder={`Enter ${fieldLabels[field]}`}
              step="any"
            />
          </div>
        ))}

        {/* Dropdowns */}
        <div className="form-group">
          <label>Protocol Type</label>
          <select name="protocol_type" value={formData.protocol_type} onChange={handleStringChange}>
            <option value="tcp">TCP</option>
            <option value="udp">UDP</option>
            <option value="icmp">ICMP</option>
          </select>
        </div>

        <div className="form-group">
          <label>Service</label>
          <select name="service" value={formData.service} onChange={handleStringChange}>
            <option value="http">HTTP</option>
            <option value="ftp_data">FTP Data</option>
            <option value="smtp">SMTP</option>
            <option value="ftp">FTP</option>
            <option value="ssh">SSH</option>
            <option value="pop_3">POP3</option>
            <option value="imap4">IMAP4</option>
            <option value="domain">Domain</option>
            <option value="http_443">HTTPS</option>
            <option value="private">Private</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Flag</label>
          <select name="flag" value={formData.flag} onChange={handleStringChange}>
            <option value="SF">SF</option>
            <option value="S0">S0</option>
            <option value="REJ">REJ</option>
            <option value="RSTR">RSTR</option>
            <option value="SH">SH</option>
            <option value="RSTO">RSTO</option>
            <option value="S1">S1</option>
            <option value="RSTOS0">RSTOS0</option>
            <option value="S3">S3</option>
            <option value="S2">S2</option>
            <option value="OTH">OTH</option>
          </select>
        </div>

        <button type="button" className="predict-btn" onClick={()=>{getPrediction()}}>
          Get Prediction
        </button>
      </form>

      {prediction && <p className="result">Result: {prediction}</p>}
    </div>
  );
}

export default Knn;

import { useState } from "react";
import "./First.css";

function First() {
  const [formData, setFormData] = useState({
    src_bytes: "",
    dst_bytes: "",
    count: "",
    srv_count: "",
    same_srv_rate: "",
    diff_srv_rate: "",
    dst_host_srv_count: "",
    dst_host_same_srv_rate: "",
    dst_host_diff_srv_rate: "",
    dst_host_same_src_port_rate: "",
    dst_host_srv_diff_host_rate: "",
    dst_host_srv_serror_rate: "",
    protocol_type: "tcp",
    service: "http",
    flag: "SF"
  });

  const [prediction, setPrediction] = useState(null);

  // Map field names to human-friendly labels
  const fieldLabels = {
    src_bytes: "Source Bytes",
    dst_bytes: "Destination Bytes",
    count: "Connection Count",
    srv_count: "Service Count",
    same_srv_rate: "Same Service Rate",
    diff_srv_rate: "Different Service Rate",
    dst_host_srv_count: "Destination Host Service Count",
    dst_host_same_srv_rate: "Destination Host Same Service Rate",
    dst_host_diff_srv_rate: "Destination Host Different Service Rate",
    dst_host_same_src_port_rate: "Destination Host Same Source Port Rate",
    dst_host_srv_diff_host_rate: "Destination Host Service Different Host Rate",
    dst_host_srv_serror_rate: "Destination Host Service Serror Rate"
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Send data to backend
  const getPrediction = async () => {
    const response = await fetch("http://localhost:5000/predict", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });
    const data = await response.json();
    setPrediction(data.prediction);
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
          <select name="protocol_type" value={formData.protocol_type} onChange={handleChange}>
            <option value="tcp">TCP</option>
            <option value="udp">UDP</option>
            <option value="icmp">ICMP</option>
          </select>
        </div>

        <div className="form-group">
          <label>Service</label>
          <select name="service" value={formData.service} onChange={handleChange}>
            <option value="http">HTTP</option>
            <option value="ftp_data">FTP Data</option>
            <option value="smtp">SMTP</option>
            <option value="ftp">FTP</option>
            <option value="ssh">SSH</option>
            <option value="pop_3">POP3</option>
            <option value="imap4">IMAP4</option>
            <option value="domain">Domain</option>
            <option value="http_443">HTTPS</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group">
          <label>Flag</label>
          <select name="flag" value={formData.flag} onChange={handleChange}>
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

        <button type="button" className="predict-btn" onClick={getPrediction}>
          Get Prediction
        </button>
      </form>

      {prediction && <p className="result">Result: {prediction}</p>}
    </div>
  );
}

export default First;

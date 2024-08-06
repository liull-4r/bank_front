import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

const UserResponse = () => {
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null;
  const [message, setMessage] = useState("");
  const location = useLocation();
  const { principalIdK } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      principal_id: principalIdK,
      user_id: user.user_id,
      message: message,
    };
    const toastId = toast.loading("Posting response. Please wait...");

    try {
      const res = await axios.post(
        "https://bank-system-back.onrender.com/detection/response/",
        data
      );
      setMessage(""); // Clear the input field after successful submission
      toast.success("Response posted successfully");
      toast.dismiss(toastId);
    } catch (err) {
      toast.error("Error posting response");
      toast.dismiss(toastId);
      //   setError(err.message);
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <label htmlFor="message" style={styles.label}>
          Message:
        </label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Submit
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f7f7f7",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: "10px",
    fontSize: "16px",
    fontWeight: "bold",
  },
  input: {
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    fontSize: "14px",
  },
  button: {
    padding: "10px",
    borderRadius: "4px",
    border: "none",
    backgroundColor: "#D02149",
    color: "#fff",
    fontSize: "16px",
    cursor: "pointer",
  },
  response: {
    marginTop: "20px",
    color: "green",
  },
  error: {
    marginTop: "20px",
    color: "red",
  },
};

export default UserResponse;

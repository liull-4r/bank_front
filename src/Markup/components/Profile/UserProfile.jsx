/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import axios from "axios";
import "./UserProfile.css"; // Import the CSS file for styling
import { toast } from "react-toastify";

function UserProfile() {
  const [, setLoading] = useState(false); // New loading state
  const [userData, setUserData] = useState({
    id: null,
    email: "",
    username: "",
    first_name: "",
    last_name: "",
  });

  useEffect(() => {
    // Fetch user data from the API
    axios
      .get("https://bank-system-back.onrender.com/auth/users/me/", {
        headers: {
          Authorization: `JWT ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        setUserData(response.data);
      })
      .catch((error) => {
        toast.error("An error has occurred. Please try again later.");
      });
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setLoading(true); // Set loading state to true when submitting

    const toastId = toast.loading("Updating Profile ...");
    axios
      .put("https://bank-system-back.onrender.com/auth/users/me/", userData, {
        headers: {
          Authorization: `JWT ${localStorage.getItem("Token")}`,
        },
      })
      .then((response) => {
        toast.success("Updated successful");
        toast.dismiss(toastId); // Reset form after successful submission
        setLoading(false);
      })
      .catch((_error) => {
        toast.error("An error has occurred. Please try again later.");
        toast.dismiss(toastId);
        setLoading(false);
      });
  };

  return (
    <div className="containerone" style={{ marginTop: "5rem" }}>
      <h2>Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            readOnly
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userData.username}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>First Name:</label>
          <input
            type="text"
            name="first_name"
            value={userData.first_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <div className="form-group">
          <label>Last Name:</label>
          <input
            type="text"
            name="last_name"
            value={userData.last_name}
            onChange={handleInputChange}
            className="form-control"
          />
        </div>

        <button
          style={{
            backgroundColor: "#D02149",
            // borderRadius: "20px",
          }}
          type="submit"
        >
          Update Profile
        </button>
      </form>
    </div>
  );
}

export default UserProfile;

import { useState, useEffect } from "react";
import axios from "axios";
import "./PrincipalList.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const ResponsePrincipalList = () => {
  const [principals, setPrincipals] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchPrincipals = async () => {
      try {
        const response = await axios.get(
          "https://bank-system-back.onrender.com/detection/customers/principals/"
        );
        setPrincipals(response.data);
        setLoading(false);
      } catch (error) {
        toast.error("an error has occured. Please try again later");
        setLoading(false);
      }
    };

    fetchPrincipals();
  }, []);

  const handlePostToPrincipal = (principalId) => {
    navigate("/userresponse", {
      state: { principalIdK: principalId },
      //   customerdataform,
    });
  };

  return (
    <div className="container" style={{ marginTop: "100px" }}>
      {/* <h2>Here is The List of Principals.</h2> */}
      {loading && <p>Loading, please wait...</p>}{" "}
      {!loading && (
        <div className="principals-container">
          {principals.map((principal) => (
            <div key={principal.id} className="principal-card">
              <img
                src={`https://bank-system-back.onrender.com${principal.image}`}
                alt={principal.first_name}
                className="doctor-image"
              />
              <div>
                <p>First Name: {principal.first_name}</p>
                <p>Last Name: {principal.last_name}</p>
                {/* <p>
                  {principal.first_name} {principal.last_name}
                </p> */}
                <p>Phone: {principal.phone}</p>
                <p>Gender: {principal.gender}</p>
              </div>
              <button
                className="appointment-button"
                onClick={() => handlePostToPrincipal(principal.user_id)}
              >
                Post Response
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ResponsePrincipalList;

import { useState, useEffect } from "react";
import { Navigate } from "react-router";
import getAuth from "../../../../util/Auth";
import { toast } from "react-toastify";

// eslint-disable-next-line react/prop-types
const PrivateAuthRoute = ({ roles, children }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [userData, setUserData] = useState(null);
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("Token");
      try {
        const response = await fetch(
          "https://bank-system-back.onrender.com/detection/customers/me/",
          {
            method: "GET",
            headers: {
              Authorization: `JWT ${token}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        toast.error("An error has occurred. Please try again later.");
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const loggedInEmployee = getAuth();
    loggedInEmployee.then((response) => {
      if (response) {
        setIsLogged(true);
        // eslint-disable-next-line react/prop-types
        if (roles && roles.length > 0 && roles.includes(userData.role)) {
          setIsAuthorized(true);
        }
      }
      setIsChecked(true);
    });
  }, [userData, roles]);

  if (isChecked) {
    if (!isLogged) {
      return <Navigate to="/login" />;
    }
    if (!isAuthorized) {
      return <Navigate to="/unauthorized" />;
    }
  }
  return children;
};

export default PrivateAuthRoute;

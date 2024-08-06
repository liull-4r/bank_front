import { useEffect, useState } from "react";
import axios from "axios";
import "./AssignPrincipal.css"; // Import the CSS file for styling
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
const AssignPrincipal = () => {
  const Token = localStorage.getItem("Token");
  const user = Token ? jwtDecode(Token) : null; // Check if Token is not null
  const [customers, setcustomers] = useState([]);
  const [principals, setPrincipals] = useState([]);
  const [formData, setFormData] = useState({
    user_id: user?.user_id,
    principal_id: "",
    customer_data_id: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axios.get(
          `https://bank-system-back.onrender.com/detection/customerdata/`
        );

        // Filter to remove duplicates based on patient_id
        const uniqueCustomers = response.data.filter(
          (customer, index, self) =>
            index === self.findIndex((p) => p.id === customer.id)
        );

        setcustomers(uniqueCustomers);
      } catch (error) {
        toast.error("Failed to fetch Customers.");
      }
    };

    fetchCustomers();
  }, []);
  useEffect(() => {
    const fetchPrincipals = async () => {
      try {
        const response = await axios.get(
          `https://bank-system-back.onrender.com/detection/customers/csos/`
        );

        // Filter to remove duplicates based on patient_id
        const uniquePrincipals = response.data.filter(
          (principals, index, self) =>
            index === self.findIndex((p) => p.user_id === principals.user_id)
        );

        setPrincipals(uniquePrincipals);
      } catch (error) {
        toast.error("Failed to fetch principals.");
      }
    };

    fetchPrincipals();
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    const toastId = toast.loading("Assigning Task. Please wait...");

    axios
      .post(
        "https://bank-system-back.onrender.com/detection/assignprincipal/",
        formData
      )
      .then(() => {
        toast.success("Task assigned successfully");
        toast.dismiss(toastId);
        // Handle success (e.g., show a success message or redirect)
      })
      .catch(() => {
        toast.error("Error assigning task");
        toast.dismiss(toastId);
        // Handle error (e.g., show an error message)
      });
  };

  return (
    <div className="assign-principal">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>CSO:</label>
          <select
            name="principal_id"
            value={formData.principal_id}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Cso</option>
            {principals.map((principal) => (
              <option key={principal.user_id} value={principal.user_id}>
                {principal.first_name} {principal.last_name}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group">
          <label>Customer:</label>
          <select
            name="customer_data_id"
            value={formData.customer_data_id}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">Select Customer</option>
            {customers.map((customer) => (
              <option key={customer.id} value={customer.id}>
                {customer.customer_name}
              </option>
            ))}
          </select>
        </div>

        <button style={{ backgroundColor: "#D02149" }} type="submit">
          Assign
        </button>
      </form>
    </div>
  );
};

export default AssignPrincipal;

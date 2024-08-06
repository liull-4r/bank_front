import { useState } from "react";
import axios from "axios";
import "./CustomerDataForm.css"; // Import the CSS file for styling
import { useLocation } from "react-router-dom";
import { toast } from "react-toastify";
const CustomerDataForm = () => {
  const location = useLocation();
  const { principalIdK } = location.state;
  const [formData, setFormData] = useState({
    user_id: 2,
    principal_id: principalIdK,
    customer_name: "",
    denomination_exchange_10_ETB: 0,
    denomination_exchange_5_ETB: 0,
    denomination_exchange_1_ETB: 0,
    total: 0,
    other: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleDenominationChange = (e) => {
    const { name, value } = e.target;
    const numericValue = parseInt(value) || 0;
    setFormData((prevState) => {
      const newFormData = {
        ...prevState,
        [name]: numericValue,
      };
      newFormData.total = calculateTotal(newFormData);
      return newFormData;
    });
  };

  const calculateTotal = (data) => {
    const total =
      (data.denomination_exchange_10_ETB || 0) * 10 +
      (data.denomination_exchange_5_ETB || 0) * 5 +
      (data.denomination_exchange_1_ETB || 0) * 1;
    return total;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const toastId = toast.loading("Posting data. Please wait...");
    try {
      const response = await axios.post(
        "https://bank-system-back.onrender.com/detection/customerdata/",
        formData
      );
      toast.success("Data posted successfully");
      toast.dismiss(toastId);
    } catch (error) {
      toast.error("Error submitting form");
      toast.dismiss(toastId);
    }
  };

  return (
    <form className="customer-data-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Customer Name:</label>
        <input
          type="text"
          name="customer_name"
          value={formData.customer_name}
          onChange={handleChange}
        />
      </div>
      <div className="form-group">
        <label>Denomination Exchange 10 ETB:</label>
        <select
          name="denomination_exchange_10_ETB"
          value={formData.denomination_exchange_10_ETB}
          onChange={handleDenominationChange}
        >
          <option value="0">0</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
          <option value="3000">3000</option>
        </select>
      </div>
      <div className="form-group">
        <label>Denomination Exchange 5 ETB:</label>
        <select
          name="denomination_exchange_5_ETB"
          value={formData.denomination_exchange_5_ETB}
          onChange={handleDenominationChange}
        >
          <option value="0">0</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
          <option value="3000">3000</option>
        </select>
      </div>
      <div className="form-group">
        <label>Denomination Exchange 1 ETB:</label>
        <select
          name="denomination_exchange_1_ETB"
          value={formData.denomination_exchange_1_ETB}
          onChange={handleDenominationChange}
        >
          <option value="0">0</option>
          <option value="1000">1000</option>
          <option value="2000">2000</option>
          <option value="3000">3000</option>
        </select>
      </div>
      <div className="form-group">
        <label>Total:</label>
        <input type="number" name="total" value={formData.total} readOnly />
      </div>
      <div className="form-group">
        <label>Other:</label>
        <input
          type="text"
          name="other"
          value={formData.other}
          onChange={handleChange}
        />
      </div>
      <button style={{ backgroundColor: "#D02149" }} type="submit">
        Submit
      </button>
    </form>
  );
};

export default CustomerDataForm;

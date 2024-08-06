import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const PrincipalDetail = () => {
  const [principaldetail, setPrincipaldetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `https://bank-system-back.onrender.com/detection/customerdata/${id}`
        );
        setPrincipaldetail(response.data);
      } catch (error) {
        toast.error("an error has occurred. Please try again later.");
      }
    };

    fetchAppointment();
  }, [id]);

  if (!principaldetail) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ marginTop: "100px", textAlign: "center" }}>
      <h2>Detail</h2>
      <table
        style={{
          margin: "auto",
          borderCollapse: "collapse",
          border: "2px solid black",
        }}
      >
        <tbody>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              First Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.cso_first_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Last Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.cso_last_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
            Phone:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.cso_phone}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Customer Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.customer_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Domination Exchange 10 ETB:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.denomination_exchange_10_ETB}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Domination Exchange 5 ETB:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.denomination_exchange_5_ETB}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Domination Exchange 1 ETB:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.denomination_exchange_1_ETB}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Total:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.total}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Other:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principaldetail.other}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrincipalDetail;

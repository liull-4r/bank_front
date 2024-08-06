import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
const PrincipalResponseDetail = () => {
  const [principalresponsedetail, setPrincipalresponsedetail] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    const fetchAppointment = async () => {
      try {
        const response = await axios.get(
          `https://bank-system-back.onrender.com/detection/response/${id}`
        );
        setPrincipalresponsedetail(response.data);
      } catch (error) {
        toast.error("an error has occurred. Please try again later.");
      }
    };

    fetchAppointment();
  }, [id]);

  if (!principalresponsedetail) {
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
              {principalresponsedetail.cso_first_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Last Name:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principalresponsedetail.cso_last_name}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Phone:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principalresponsedetail.cso_phone}
            </td>
          </tr>
          <tr>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              Message:
            </td>
            <td style={{ border: "1px solid black", padding: "8px" }}>
              {principalresponsedetail.message}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PrincipalResponseDetail;
